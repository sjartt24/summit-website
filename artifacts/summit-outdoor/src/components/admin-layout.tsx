import { Link, useLocation } from "wouter";
import { LayoutDashboard, Calendar, MessageSquare, Users, BarChart3, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/appointments", label: "Appointments", icon: Calendar, exact: false },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare, exact: false },
    { href: "/admin/subscribers", label: "Subscribers", icon: Users, exact: false },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return location === href;
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-muted/20 flex font-sans text-foreground">
      
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-primary-foreground/10">
          <span className="font-serif text-xl font-bold uppercase tracking-widest text-white">Summit Admin</span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-bold uppercase tracking-wider transition-colors ${
                  active 
                    ? "bg-accent text-white" 
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-primary-foreground/10">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors px-4 py-2">
            <ArrowLeft size={16} /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-background border-b border-border flex items-center px-8 shadow-sm z-10 shrink-0">
          <h2 className="font-serif text-2xl font-bold text-primary capitalize">
            {location === "/admin" ? "Dashboard Overview" : location.split('/').pop()?.replace('-', ' ')}
          </h2>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
