import { useGetAdminSummary } from "@workspace/api-client-react";
import AdminLayout from "@/components/admin-layout";
import { Loader2, Calendar, MessageSquare, Users, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: summary, isLoading } = useGetAdminSummary();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent" size={48} />
        </div>
      </AdminLayout>
    );
  }

  if (!summary) return null;

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        <div className="bg-background border border-border p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Total Appointments</p>
              <h3 className="text-3xl font-serif font-bold text-primary mt-1">{summary.totalAppointments}</h3>
            </div>
            <div className="p-3 bg-secondary rounded-md text-primary">
              <Calendar size={20} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-accent font-bold">{summary.pendingAppointments} pending</span>
          </div>
        </div>

        <div className="bg-background border border-border p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Messages</p>
              <h3 className="text-3xl font-serif font-bold text-primary mt-1">{summary.totalContactMessages}</h3>
            </div>
            <div className="p-3 bg-secondary rounded-md text-primary">
              <MessageSquare size={20} />
            </div>
          </div>
        </div>

        <div className="bg-background border border-border p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Subscribers</p>
              <h3 className="text-3xl font-serif font-bold text-primary mt-1">{summary.totalSubscribers}</h3>
            </div>
            <div className="p-3 bg-secondary rounded-md text-primary">
              <Users size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-primary text-primary-foreground p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70 font-bold">Analytics</p>
              <h3 className="text-3xl font-serif font-bold text-white mt-1">View</h3>
            </div>
            <div className="p-3 bg-accent rounded-md text-white">
              <TrendingUp size={20} />
            </div>
          </div>
          <Link href="/admin/analytics" className="text-sm font-bold uppercase tracking-wider text-accent hover:text-white transition-colors">
            Go to Report &rarr;
          </Link>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-background border border-border shadow-sm">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="font-serif font-bold text-xl text-primary">Recent Appointments</h3>
            <Link href="/admin/appointments" className="text-xs font-bold uppercase tracking-wider text-accent hover:underline">View All</Link>
          </div>
          <div className="p-0">
            {summary.recentAppointments.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No recent appointments.</div>
            ) : (
              <ul className="divide-y divide-border">
                {summary.recentAppointments.map(app => (
                  <li key={app.id} className="p-4 flex items-center justify-between hover:bg-muted/30">
                    <div>
                      <p className="font-bold text-primary">{app.name}</p>
                      <p className="text-sm text-muted-foreground">{app.serviceName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                        app.status === 'pending' ? 'bg-accent/10 text-accent' : 
                        app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-background border border-border shadow-sm">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="font-serif font-bold text-xl text-primary">Recent Messages</h3>
            <Link href="/admin/messages" className="text-xs font-bold uppercase tracking-wider text-accent hover:underline">View All</Link>
          </div>
          <div className="p-0">
            {summary.recentContactMessages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No recent messages.</div>
            ) : (
              <ul className="divide-y divide-border">
                {summary.recentContactMessages.map(msg => (
                  <li key={msg.id} className="p-4 hover:bg-muted/30">
                    <div className="flex justify-between mb-1">
                      <p className="font-bold text-primary">{msg.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-primary line-clamp-1 mb-1 font-medium">{msg.subject}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{msg.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
