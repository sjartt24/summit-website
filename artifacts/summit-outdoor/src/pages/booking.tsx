import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateAppointment, useListServices } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  serviceName: z.string().min(1, "Please select an expedition"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  notes: z.string().optional()
});

export default function Booking() {
  const { data: services, isLoading: servicesLoading } = useListServices();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const [submitted, setSubmitted] = useState(false);
  
  const defaultService = searchParams.get('service') || "";

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceName: defaultService,
      preferredDate: "",
      preferredTime: "morning",
      notes: ""
    }
  });

  const createAppointment = useCreateAppointment({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Expedition Request Received",
          description: "A guide will contact you shortly to confirm details.",
        });
        setSubmitted(true);
        window.setTimeout(() => setLocation("/"), 3000);
      },
      onError: () => {
        toast({
          title: "Submission Error",
          description: "There was a problem submitting your request. Please try again.",
          variant: "destructive"
        });
      }
    }
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    createAppointment.mutate({ data: values });
  }

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 px-6 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Prepare</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Book Expedition</h1>
          <p className="text-xl font-light text-primary-foreground/80 max-w-2xl">
            Submit an expedition request. Due to the technical nature of our trips, all bookings require a brief consultation with a lead guide prior to confirmation.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-card border border-border p-8 md:p-12 shadow-sm">
            {submitted && (
              <div className="mb-8 flex items-start gap-3 border border-accent/30 bg-accent/10 p-4" data-testid="booking-success-message">
                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-primary">Expedition Request Received</p>
                  <p className="text-sm text-muted-foreground">A guide will contact you shortly to confirm details. Redirecting home...</p>
                </div>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-2xl text-primary border-b border-border pb-2">Expedition Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="serviceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Select Expedition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-border bg-background focus:ring-accent h-12">
                              <SelectValue placeholder={servicesLoading ? "Loading expeditions..." : "Select an expedition"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services?.map(s => (
                              <SelectItem key={s.id} value={s.name}>{s.name} - {s.duration}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Preferred Start Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="date" className="rounded-none border-border bg-background focus:ring-accent h-12" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Consultation Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none border-border bg-background focus:ring-accent h-12">
                                <SelectValue placeholder="Select best time to call" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                              <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-2xl text-primary border-b border-border pb-2 pt-4">Personal Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" className="rounded-none border-border bg-background focus:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@example.com" type="email" className="rounded-none border-border bg-background focus:ring-accent h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" type="tel" className="rounded-none border-border bg-background focus:ring-accent h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Experience & Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe your relevant experience or any questions..." 
                            className="rounded-none border-border bg-background focus:ring-accent min-h-32 resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={createAppointment.isPending}
                    className="w-full bg-accent text-white h-14 font-bold uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {createAppointment.isPending ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Request</>
                    ) : (
                      "Request Expedition"
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    No payment is required until consultation is complete and dates are confirmed.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
