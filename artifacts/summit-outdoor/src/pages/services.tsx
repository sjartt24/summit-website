import { Link } from "wouter";
import { useListServices } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Mountain, Compass, ArrowRight, Loader2 } from "lucide-react";

export default function Services() {
  const { data: services, isLoading } = useListServices();

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 px-6 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Expeditions</h1>
          <p className="text-xl font-light text-primary-foreground/80 max-w-2xl">
            From technical alpine ascents to remote backcountry ski traverses, our guided trips are designed for those seeking genuine challenge and pristine wilderness.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services?.map(service => (
                <div key={service.id} className="border border-border bg-card group hover:border-accent transition-colors flex flex-col">
                  <div className="p-8 md:p-10 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-4xl text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                        {(service.icon === 'mountain' || service.icon === 'pickaxe') ? <Mountain size={48} /> : <Compass size={48} />}
                      </div>
                      <div className="text-right">
                        <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Duration</span>
                        <span className="font-bold text-primary">{service.duration}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">{service.name}</h2>
                    <p className="text-muted-foreground mb-8 text-lg">{service.description}</p>
                    
                    <div className="mb-8">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-bold">Expedition Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-10 bg-secondary/30 border-t border-border flex items-center justify-between mt-auto">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Starting From</span>
                      <span className="text-2xl font-bold text-primary">${service.priceFrom}</span>
                    </div>
                    <Link 
                      href={`/booking?service=${service.name}`} 
                      className="bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                    >
                      Book <span className="hidden sm:inline">Expedition</span> <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
