import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateContactMessage } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const createMessage = useCreateContactMessage({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "We'll get back to you shortly.",
        });
        setSubmitted(true);
        form.reset();
      },
      onError: () => {
        toast({
          title: "Submission Error",
          description: "There was a problem sending your message.",
          variant: "destructive"
        });
      }
    }
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    createMessage.mutate({ data: values });
  }

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 px-6 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Basecamp</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Contact Us</h1>
          <p className="text-xl font-light text-primary-foreground/80 max-w-2xl">
            Questions about gear, physical requirements, or custom private expeditions? Reach out to our basecamp team.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Headquarters</h2>
              <p className="text-muted-foreground mb-8">
                Our main office is located in Boulder, Colorado, where we coordinate logistics for global expeditions.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-accent mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-sm mb-1 text-primary">Address</h3>
                  <p className="text-muted-foreground">1450 Alpine Way<br/>Boulder, CO 80302<br/>United States</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-accent mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-sm mb-1 text-primary">Phone</h3>
                  <p className="text-muted-foreground">+1 (800) 555-PEAK<br/>Mon-Fri, 9am-5pm MST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="text-accent mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-sm mb-1 text-primary">Email</h3>
                  <p className="text-muted-foreground">info@summitoutdoor.com<br/>guide-ops@summitoutdoor.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className="bg-card border border-border p-8 md:p-12 shadow-sm">
              <h3 className="font-serif font-bold text-2xl text-primary mb-8">Send a Message</h3>
              {submitted && (
                <div className="mb-8 flex items-start gap-3 border border-accent/30 bg-accent/10 p-4" data-testid="contact-success-message">
                  <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-primary">Message Sent</p>
                    <p className="text-sm text-muted-foreground">We'll get back to you shortly.</p>
                  </div>
                </div>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help?" className="rounded-none border-border bg-background focus:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs text-muted-foreground">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide details about your inquiry..." 
                            className="rounded-none border-border bg-background focus:ring-accent min-h-40 resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={createMessage.isPending}
                      className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                      {createMessage.isPending ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending</>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
        </div>
      </section>
    </Layout>
  );
}
