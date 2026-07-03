import Layout from "@/components/layout";
import { Play } from "lucide-react";

export default function Promo() {
  return (
    <Layout>
      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-black overflow-hidden">
        {/* Placeholder for actual video - using a dramatic image instead */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/climbing.png" 
            alt="Climbing promo shot" 
            className="w-full h-full object-cover opacity-60 scale-105 origin-center animate-out zoom-in duration-2000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <button className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center mb-8 group hover:bg-white hover:text-black transition-all duration-300">
            <Play className="text-white group-hover:text-black ml-2" size={32} />
          </button>
          
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-wide drop-shadow-lg">
            THE CALL OF <br/> THE VOID
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-10">
            A short film documenting the first winter ascent of the Kajaq Spire. Coming Fall 2025.
          </p>
          
          <div className="flex items-center gap-6 text-white/50 text-sm font-bold uppercase tracking-widest">
            <span>Summit Films</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>Directed by A. Thorne</span>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">About the Film</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-12">
            For three weeks in the dead of winter, a team of four Summit guides pushed beyond the boundaries of documented routes to attempt the impossible. "The Call of the Void" is an unflinching look at the physical toll, mental fortitude, and absolute trust required to survive at the edge of the world.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-primary-foreground/20 pt-12">
            <div>
              <span className="block text-accent font-bold uppercase tracking-wider text-xs mb-2">Location</span>
              <strong className="text-lg">Kajaq Spire, Patagonia</strong>
            </div>
            <div>
              <span className="block text-accent font-bold uppercase tracking-wider text-xs mb-2">Duration</span>
              <strong className="text-lg">22 Days</strong>
            </div>
            <div>
              <span className="block text-accent font-bold uppercase tracking-wider text-xs mb-2">Status</span>
              <strong className="text-lg">Unclimbed (Winter)</strong>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
