import Layout from "@/components/layout";

export default function About() {
  return (
    <Layout>
      <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-primary/80 z-10"></div>
        <img src="/images/hero-alpine.png" alt="Alpine peaks" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
        <div className="relative z-20 text-center text-primary-foreground max-w-4xl px-6">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Ethos</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Return Changed.</h1>
          <p className="text-xl md:text-2xl font-light text-primary-foreground/90">
            We don't do tourism. We do expeditions. 
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg prose-headings:font-serif prose-headings:text-primary prose-a:text-accent">
          <h2>The Summit Standard</h2>
          <p>
            Founded in 2010 by a group of IFMGA-certified guides who were tired of the watered-down "adventure" industry, Summit Outdoor Adventures was built on a simple premise: real wilderness demands real expertise.
          </p>
          <p>
            We operate in the space between the accessible and the extreme. Our clients aren't passengers; they are team members. When you book an expedition with Summit, you are committing to early alpine starts, unpredictable weather, physical exertion, and the profound reward of achieving something difficult.
          </p>
          <h3>Our Guides</h3>
          <p>
            Every Summit guide holds current wilderness first responder certification, avalanche level II or higher, and extensive discipline-specific certifications (AMGA/IFMGA). But beyond the paper, they possess the judgment that only comes from decades in the high alpine.
          </p>
          <ul>
            <li><strong>Safety as Religion:</strong> We push limits, but never margins of safety.</li>
            <li><strong>Environmental Stewardship:</strong> Leave no trace isn't a suggestion; it's a hard rule.</li>
            <li><strong>Education:</strong> We don't just guide; we teach. You will leave an expedition with more skills than you arrived with.</li>
          </ul>
        </div>
      </section>
      
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">Lead Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Head of Alpine Climbing", bio: "15 years leading expeditions in the Cascades, Andes, and Himalayas. IFMGA certified." },
              { name: "Marcus Thorne", role: "Backcountry Ski Director", bio: "Former ski patroller turned backcountry specialist. Focuses on steep descents and avalanche education." },
              { name: "Elena Rostova", role: "Sea Kayaking Specialist", bio: "Has paddled the entire Inside Passage. Expert in complex tidal navigation and remote coastal survival." }
            ].map(guide => (
              <div key={guide.name} className="bg-background border border-border p-6 text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center font-serif text-3xl text-primary/30">
                  {guide.name.charAt(0)}
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-1">{guide.name}</h3>
                <span className="text-accent text-sm font-bold uppercase tracking-wider block mb-4">{guide.role}</span>
                <p className="text-muted-foreground">{guide.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
