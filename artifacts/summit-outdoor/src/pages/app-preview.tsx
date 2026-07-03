import Layout from "@/components/layout";

export default function AppPreview() {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 px-6 border-b border-primary-foreground/10 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="w-full lg:w-1/2">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Digital Companion</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">Your Expedition in Your Pocket.</h1>
            <p className="text-xl font-light text-primary-foreground/80 mb-10 max-w-xl">
              Access topographic maps, coordinate with your guide, review gear checklists, and check live alpine weather—all offline.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-primary px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                Coming Soon
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-10 bg-accent/20 blur-3xl rounded-full"></div>
              <img 
                src="/images/app-mockup.png" 
                alt="Summit Mobile App Interface Mockup" 
                className="relative z-10 w-full max-w-md shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-primary mb-16 text-center">App Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center text-primary font-bold text-xl">1</div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Offline Maps</h3>
              <p className="text-muted-foreground">High-resolution topographic maps caching entire routes, ensuring you never lose your way even without cell service.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center text-primary font-bold text-xl">2</div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Gear Checklists</h3>
              <p className="text-muted-foreground">Interactive checklists curated by your lead guide specifically for the weather and conditions of your exact expedition.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center text-primary font-bold text-xl">3</div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Live Dispatch</h3>
              <p className="text-muted-foreground">Direct satellite messaging with basecamp and your guide team, plus automated weather push alerts.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
