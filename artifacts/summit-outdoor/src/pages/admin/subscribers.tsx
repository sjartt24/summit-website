import { useListNewsletterSubscribers } from "@workspace/api-client-react";
import AdminLayout from "@/components/admin-layout";
import { Loader2, Users, Download } from "lucide-react";

export default function AdminSubscribers() {
  const { data: subscribers, isLoading } = useListNewsletterSubscribers();

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-muted-foreground">Manage the Dispatch newsletter mailing list.</p>
        <button className="bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-2">
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="bg-background border border-border shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={48} />
          </div>
        ) : !subscribers || subscribers.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Users className="mb-4 opacity-50" size={48} />
            <p>No subscribers yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground font-bold border-b border-border">
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Subscribed On</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subscribers.map(sub => (
                  <tr key={sub.id} className="hover:bg-muted/20">
                    <td className="p-4 font-medium text-primary">
                      {sub.email}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm bg-green-100 text-green-700">
                        Active
                      </span>
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
