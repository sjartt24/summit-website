import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Booking from "@/pages/booking";
import BrandGuidelines from "@/pages/brand-guidelines";
import AppPreview from "@/pages/app-preview";
import Promo from "@/pages/promo";
import SocialKit from "@/pages/social-kit";
import Portal from "@/pages/portal";

import AdminDashboard from "@/pages/admin/dashboard";
import AdminAppointments from "@/pages/admin/appointments";
import AdminMessages from "@/pages/admin/messages";
import AdminSubscribers from "@/pages/admin/subscribers";
import AdminAnalytics from "@/pages/admin/analytics";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/booking" component={Booking} />
      <Route path="/brand-guidelines" component={BrandGuidelines} />
      <Route path="/app-preview" component={AppPreview} />
      <Route path="/promo" component={Promo} />
      <Route path="/social-kit" component={SocialKit} />
      <Route path="/portal" component={Portal} />
      
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/appointments" component={AdminAppointments} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/subscribers" component={AdminSubscribers} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
