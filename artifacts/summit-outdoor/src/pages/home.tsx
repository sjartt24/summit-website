import { Link } from "wouter";
import { useListServices, useListPortfolioProjects } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { ArrowRight, Mountain, Map, Compass } from "lucide-react";

export default function Home() {
  const { data: services } = useListServices();
  const { data: projects } = useListPortfolioProjects();

  const featuredServices = services?.slice(0, 3) || [];
  const featuredProjects = projects?.slice(0, 4) || [];

  return (
    <Layout>
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-primary">
        <img 
          src="/images/hero-alpine.png" 
          alt="Alpine mountain peak at sunrise" 
          className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-multiply"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
          <div className="max-w-3xl text-primary-foreground animate-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none mb-6">
              Ascend <br/> Beyond.
            </h1>
            <p className="text-xl md:text-2xl font-light text-primary-foreground/90 mb-10 max-w-2xl">
              Precision-guided expeditions in the world's most unforgiving terrain. We get you up the mountain, and safely back home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors flex items-center gap-2">
                Explore Expeditions <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="border border-primary-foreground/30 text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground/10 transition-colors">
                The Summit Ethos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Built for the Wild</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Summit Outdoor Adventures is not a sightseeing tour company. We are a team of IFMGA-certified guides, seasoned alpinists, and wilderness first responders who facilitate authentic, challenging backcountry experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're attempting your first 14er, skiing untouched backcountry powder, or navigating remote fjords, we provide the expertise, logistics, and safety net required to push your limits.
              </p>
              <Link href="/about" className="text-accent font-bold uppercase tracking-wider flex items-center gap-2 hover:underline underline-offset-4">
                Meet our guides <ArrowRight size={16} />
              </Link>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-secondary p-8 flex flex-col items-center justify-center text-center aspect-square">
                <Mountain size={48} className="text-primary mb-4 stroke-[1.5]" />
                <h3 className="font-serif font-bold text-xl text-primary">High Altitude</h3>
              </div>
              <div className="bg-primary text-primary-foreground p-8 flex flex-col items-center justify-center text-center aspect-square translate-y-8">
                <Map size={48} className="text-accent mb-4 stroke-[1.5]" />
                <h3 className="font-serif font-bold text-xl">Untracked Terrain</h3>
              </div>
              <div className="bg-primary text-primary-foreground p-8 flex flex-col items-center justify-center text-center aspect-square -translate-y-8">
                <Compass size={48} className="text-accent mb-4 stroke-[1.5]" />
                <h3 className="font-serif font-bold text-xl">Expert Navigation</h3>
              </div>
              <img src="/images/climbing.png" alt="Rock climbing" className="w-full h-full object-cover aspect-square" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Guided Expeditions</h2>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-accent transition-colors">
              View all trips <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map(service => (
              <Link key={service.id} href={`/booking?service=${service.name}`} className="group block bg-background border border-border hover:border-accent transition-colors">
                <div className="p-8">
                  <div className="text-4xl text-accent mb-6 font-serif opacity-50 group-hover:opacity-100 transition-opacity">
                    {/* Placeholder for icon */}
                    {(service.icon === 'mountain' || service.icon === 'pickaxe') ? <Mountain size={40} /> : <Compass size={40} />}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">{service.name}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between border-t border-border pt-6 mt-auto">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Duration</span>
                      <span className="font-bold text-primary">{service.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">From</span>
                      <span className="font-bold text-accent">${service.priceFrom}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 md:hidden text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-accent transition-colors">
              View all trips <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">The Dispatch</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Field Reports & Updates</h2>
              <p className="text-primary-foreground/70">Dispatches from our guides, gear reviews, and stories from the sharp end of the rope.</p>
            </div>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest hover:text-accent transition-colors shrink-0">
              Read the Journal <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map(project => (
              <Link key={project.id} href={`/portfolio`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
                  {project.imageUrl && (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-accent text-white text-xs font-bold uppercase tracking-wider px-2 py-1 mb-2 inline-block">
                      {project.location}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-accent transition-colors line-clamp-1">{project.title}</h3>
                <span className="text-sm text-primary-foreground/60">{new Date(project.completedAt).toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
