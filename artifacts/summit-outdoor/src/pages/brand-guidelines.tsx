import Layout from "@/components/layout";

export default function BrandGuidelines() {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 px-6 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Identity</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Brand Guidelines</h1>
          <p className="text-xl font-light text-primary-foreground/80 max-w-2xl">
            The visual and verbal foundation of Summit Outdoor Adventures. Rugged, precise, premium.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* Logo Section */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">Logo Mark</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border p-12 flex items-center justify-center h-64">
              <img src="/logo.png" alt="Summit Logo" className="h-32 object-contain mix-blend-multiply" />
            </div>
            <div className="bg-primary p-12 flex items-center justify-center h-64">
              <img src="/logo.png" alt="Summit Logo" className="h-32 object-contain brightness-0 invert" />
            </div>
          </div>
          <p className="mt-6 text-muted-foreground max-w-3xl">
            The Summit logo combines mountain peaks with subtle technical outfitter elements (carabiner/compass). It should always be used with sufficient clear space. Do not stretch, skew, or alter the colors outside of approved variations.
          </p>
        </section>

        {/* Color Palette Section */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="h-32 bg-primary mb-4 border border-border"></div>
              <h3 className="font-bold text-primary mb-1">Deep Alpine Green</h3>
              <p className="text-sm text-muted-foreground uppercase">Primary / #1B312C</p>
            </div>
            <div>
              <div className="h-32 bg-accent mb-4 border border-border"></div>
              <h3 className="font-bold text-primary mb-1">Earth Orange</h3>
              <p className="text-sm text-muted-foreground uppercase">Accent / #D96926</p>
            </div>
            <div>
              <div className="h-32 bg-background mb-4 border border-border"></div>
              <h3 className="font-bold text-primary mb-1">Bone White</h3>
              <p className="text-sm text-muted-foreground uppercase">Background / #F6F4F0</p>
            </div>
            <div>
              <div className="h-32 bg-secondary mb-4 border border-border"></div>
              <h3 className="font-bold text-primary mb-1">Weathered Wood</h3>
              <p className="text-sm text-muted-foreground uppercase">Secondary / #E6DCD1</p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Display & Headings</span>
                <h3 className="text-2xl font-serif text-primary mt-1">Playfair Display</h3>
              </div>
              <div className="font-serif text-5xl text-primary mb-4 leading-tight">
                Ascend Beyond.
              </div>
              <p className="text-muted-foreground">
                Used for all primary headings, quotes, and highly impactful statements. Conveys heritage, trust, and premium quality.
              </p>
            </div>
            <div>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Body & Interface</span>
                <h3 className="text-2xl font-sans text-primary mt-1">Outfit</h3>
              </div>
              <div className="font-sans text-xl text-primary mb-4 leading-relaxed font-light">
                Precision-guided expeditions in the world's most unforgiving terrain. We get you up the mountain, and safely back home.
              </div>
              <p className="text-muted-foreground">
                A clean, modern sans-serif used for all body copy, UI elements, and technical data. Use uppercase with wide tracking for small labels and buttons.
              </p>
            </div>
          </div>
        </section>

        {/* Voice & Tone Section */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">Voice & Tone</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Confident</h3>
              <p className="text-muted-foreground">
                We are experts. We don't use weak language, hyperbole, or exclamation points. We state facts plainly.
              </p>
            </div>
            <div className="bg-card border border-border p-8">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Rugged</h3>
              <p className="text-muted-foreground">
                Our language reflects the environments we operate in. It is unpolished, authentic, and grounded in reality.
              </p>
            </div>
            <div className="bg-card border border-border p-8">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Premium</h3>
              <p className="text-muted-foreground">
                We provide a high-end service, but we don't sound pretentious. Our premium feel comes from precision and capability.
              </p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
