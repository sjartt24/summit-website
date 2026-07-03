import { useListContactMessages } from "@workspace/api-client-react";
import AdminLayout from "@/components/admin-layout";
import { Loader2, Mail } from "lucide-react";

export default function AdminMessages() {
  const { data: messages, isLoading } = useListContactMessages();

  return (
    <AdminLayout>
      <div className="bg-background border border-border shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={48} />
          </div>
        ) : !messages || messages.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Mail className="mb-4 opacity-50" size={48} />
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {messages.map(msg => (
              <div key={msg.id} className="p-6 hover:bg-muted/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-primary text-lg">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-accent hover:underline">{msg.email}</a>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="bg-secondary/30 border border-border p-4 rounded-sm">
                  <h4 className="font-bold text-primary mb-2 border-b border-border/50 pb-2">{msg.subject}</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} className="text-xs font-bold uppercase tracking-wider text-primary border border-border px-4 py-2 hover:bg-secondary transition-colors inline-block">
                    Reply
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
