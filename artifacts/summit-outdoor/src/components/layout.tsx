import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { useCreateNewsletterSubscriber } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import FloatingChatbot from "./floating-chatbot";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Expeditions" },
    { href: "/portfolio", label: "Journal" },
    { href: "/blog", label: "Stories" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent selection:text-white font-sans text-foreground">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Summit Logo" className="h-10 w-10 object-contain mix-blend-multiply" />
            <span className="font-serif text-2xl font-bold uppercase tracking-widest text-primary">Summit</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`transition-colors hover:text-accent ${location.startsWith(link.href) ? "text-accent" : "text-primary/80"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <Link href="/portal" className="text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors">
              Portal
            </Link>
            <Link href="/booking" className="bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-all transform hover:-translate-y-0.5">
              Book Now
            </Link>
          </div>

          <button className="lg:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-xl">
            <nav className="flex flex-col px-6 py-8 gap-6 text-lg font-serif">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link href="/portal" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">
                Customer Portal
              </Link>
              <Link href="/booking" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-accent font-bold">
                Book Expedition <ArrowRight size={18} />
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col relative">{children}</main>

      <Footer />
      <FloatingChatbot />
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();
  const subscribe = useCreateNewsletterSubscriber({
    mutation: {
      onSuccess: () => {
        toast({ title: "Subscribed", description: "You are now on our expedition list." });
        setSubscribed(true);
        setEmail("");
      },
      onError: () => {
        toast({ title: "Error", description: "Could not subscribe. Try again.", variant: "destructive" });
      }
    }
  });

  return (
    <footer className="bg-primary text-primary-foreground py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-6">
            <span className="font-serif text-3xl font-bold uppercase tracking-widest text-white">Summit</span>
          </Link>
          <p className="text-primary-foreground/70 font-light mb-6">
            Precision-guided expeditions in the world's most unforgiving terrain. We get you up the mountain, and safely back home.
          </p>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/60">
            <span>info@summitoutdoor.com</span>
            <span>+1 (800) 555-PEAK</span>
            <span>Boulder, Colorado</span>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg uppercase tracking-widest mb-6 border-b border-primary-foreground/20 pb-2">Expeditions</h4>
          <ul className="space-y-4 text-primary-foreground/80">
            <li><Link href="/services" className="hover:text-accent transition-colors">Alpine Climbing</Link></li>
            <li><Link href="/services" className="hover:text-accent transition-colors">Backcountry Skiing</Link></li>
            <li><Link href="/services" className="hover:text-accent transition-colors">Sea Kayaking</Link></li>
            <li><Link href="/services" className="hover:text-accent transition-colors">Wilderness Trekking</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg uppercase tracking-widest mb-6 border-b border-primary-foreground/20 pb-2">Company</h4>
          <ul className="space-y-4 text-primary-foreground/80">
            <li><Link href="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
            <li><Link href="/portfolio" className="hover:text-accent transition-colors">Journal</Link></li>
            <li><Link href="/brand-guidelines" className="hover:text-accent transition-colors">Brand Assets</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg uppercase tracking-widest mb-6 border-b border-primary-foreground/20 pb-2">Dispatch</h4>
          <p className="text-primary-foreground/70 text-sm mb-4">
            Join the expedition list for early access to new trips and gear drops.
          </p>
          {subscribed ? (
            <p className="text-accent font-bold text-sm" data-testid="newsletter-success-message">
              You're subscribed! Check your inbox for a welcome note.
            </p>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); subscribe.mutate({ data: { email } }); }}
              className="flex flex-col gap-3"
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-white placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
              />
              <button 
                type="submit" 
                disabled={subscribe.isPending}
                className="bg-accent text-white font-bold uppercase tracking-wider px-4 py-3 hover:bg-white hover:text-primary transition-colors disabled:opacity-50"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center text-primary-foreground/50 text-sm">
        <p>&copy; {new Date().getFullYear()} Summit Outdoor Adventures. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          <Link href="/app-preview" className="hover:text-white transition-colors">App</Link>
          <Link href="/promo" className="hover:text-white transition-colors">Film</Link>
          <Link href="/social-kit" className="hover:text-white transition-colors">Social</Link>
        </div>
      </div>
    </footer>
  );
}
