import { useListAppointments, useUpdateAppointmentStatus, getListAppointmentsQueryKey } from "@workspace/api-client-react";
import AdminLayout from "@/components/admin-layout";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function AdminAppointments() {
  const { data: appointments, isLoading } = useListAppointments();
  const updateStatus = useUpdateAppointmentStatus();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleStatusChange = (id: number, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    updateStatus.mutate(
      { id, data: { status: newStatus } },
      {
        onSuccess: () => {
          toast({ title: "Status updated" });
          queryClient.invalidateQueries({ queryKey: getListAppointmentsQueryKey() });
        },
        onError: () => {
          toast({ title: "Error", description: "Could not update status.", variant: "destructive" });
        }
      }
    );
  };

  return (
    <AdminLayout>
      <div className="bg-background border border-border shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={48} />
          </div>
        ) : !appointments || appointments.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground font-bold border-b border-border">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appointments.map(app => (
                  <tr key={app.id} className="hover:bg-muted/20">
                    <td className="p-4">
                      <div className="font-bold text-primary">{app.name}</div>
                      <div className="text-sm text-muted-foreground">{app.email}</div>
                      <div className="text-sm text-muted-foreground">{app.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-primary">{app.serviceName}</div>
                      {app.notes && <div className="text-xs text-muted-foreground truncate max-w-[200px]" title={app.notes}>Notes: {app.notes}</div>}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div>{new Date(app.preferredDate).toLocaleDateString()}</div>
                      <div>{app.preferredTime}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                        app.status === 'pending' ? 'bg-accent/10 text-accent' : 
                        app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select 
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                        disabled={updateStatus.isPending}
                        className="bg-background border border-border text-sm p-2 focus:ring-accent focus:border-accent"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
