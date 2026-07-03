import { useState } from "react";
import { Link } from "wouter";
import { useListAppointments } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Loader2, Calendar, FileText, CheckCircle, Clock, XCircle } from "lucide-react";

export default function Portal() {
  const { data: allAppointments, isLoading } = useListAppointments();
  
  // Mock logged in user email to filter appointments client-side
  const mockUserEmail = "jane@example.com";
  
  // Only show appointments that might reasonably belong to our mock user
  // In a real app with auth, the backend would only return the user's appointments
  const myAppointments = allAppointments?.filter(a => a.email === mockUserEmail || a.name.toLowerCase().includes('jane')) || [];

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-background border-r border-border shrink-0">
          <div className="p-6 border-b border-border bg-primary text-primary-foreground">
            <h2 className="font-serif font-bold text-xl mb-1">Jane Doe</h2>
            <p className="text-sm text-primary-foreground/70">{mockUserEmail}</p>
          </div>
          <nav className="p-4 flex flex-col gap-2">
            <Link href="/portal" className="bg-secondary text-primary px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-sm">
              My Expeditions
            </Link>
            <button className="text-left px-4 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-sm">
              Profile & Medical
            </button>
            <button className="text-left px-4 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-sm">
              Payment Methods
            </button>
            <button className="text-left px-4 py-3 text-sm font-bold uppercase tracking-wider text-destructive hover:bg-destructive/10 transition-colors rounded-sm mt-8">
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">My Expeditions</h1>
            <p className="text-muted-foreground mb-8">Manage your upcoming trips and review past adventures.</p>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-accent" size={48} />
              </div>
            ) : myAppointments.length === 0 ? (
              <div className="bg-background border border-border p-12 text-center">
                <Calendar className="mx-auto text-muted-foreground mb-4" size={48} />
                <h3 className="text-xl font-serif font-bold text-primary mb-2">No expeditions scheduled</h3>
                <p className="text-muted-foreground mb-6">Your next adventure awaits.</p>
                <Link href="/services" className="bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-accent transition-colors inline-block">
                  Browse Expeditions
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {myAppointments.map(appointment => (
                  <div key={appointment.id} className="bg-background border border-border p-6 shadow-sm flex flex-col md:flex-row gap-6">
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {appointment.status === 'confirmed' && <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-green-600"><CheckCircle size={14}/> Confirmed</span>}
                        {appointment.status === 'pending' && <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent"><Clock size={14}/> Pending Review</span>}
                        {appointment.status === 'cancelled' && <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-destructive"><XCircle size={14}/> Cancelled</span>}
                      </div>
                      
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">{appointment.serviceName}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                          <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Start Date</span>
                          <span className="font-bold text-primary">{new Date(appointment.preferredDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Status</span>
                          <span className="font-bold text-primary capitalize">{appointment.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-48 flex flex-col gap-3 shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                      <button className="w-full border border-border bg-background text-primary px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                        <FileText size={14} /> Itinerary
                      </button>
                      <button className="w-full border border-border bg-background text-primary px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                        <FileText size={14} /> Gear List
                      </button>
                      <button className="w-full border border-border bg-background text-primary px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-secondary transition-colors mt-auto">
                        Message Guide
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

      </div>
    </Layout>
  );
}
