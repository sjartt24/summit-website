import { useListPortfolioProjects } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Loader2 } from "lucide-react";

export default function Portfolio() {
  const { data: projects, isLoading } = useListPortfolioProjects();

  return (
    <Layout>
      <section className="bg-muted py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">The Archive</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">Field Journal</h1>
          <p className="text-xl font-light text-muted-foreground max-w-2xl">
            A visual record of past expeditions, successful summits, and the landscapes that challenge us.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map(project => (
                <div key={project.id} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-6">
                    {project.imageUrl && (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-background/90 text-primary px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl font-bold text-primary">{project.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    <span>{project.location}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{new Date(project.completedAt).getFullYear()}</span>
                  </div>
                  
                  <p className="text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
