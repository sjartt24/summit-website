import Layout from "@/components/layout";

export default function SocialKit() {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 px-6 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Marketing Assets</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Social Kit</h1>
          <p className="text-xl font-light text-primary-foreground/80 max-w-2xl">
            A collection of promotional banners and templates for our upcoming season launch.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">Instagram Feed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-muted p-8 flex justify-center">
                <img src="/images/social-1.png" alt="Instagram Post" className="w-full max-w-md shadow-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">Campaign: Ascend Beyond</h3>
                <p className="text-muted-foreground mb-6">
                  Square format graphics designed for the main feed. Heavy emphasis on dramatic landscapes and bold typography to interrupt the scroll.
                </p>
                <div className="flex gap-4">
                  <button className="border border-primary text-primary px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                    Download 1080x1080
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">Instagram Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">Campaign: Book Your Expedition</h3>
                <p className="text-muted-foreground mb-6">
                  Vertical format meant for quick consumption. Clean empty space provided for native Instagram link stickers.
                </p>
                <div className="flex gap-4">
                  <button className="border border-primary text-primary px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                    Download 1080x1920
                  </button>
                </div>
              </div>
              <div className="bg-muted p-8 flex justify-center order-1 md:order-2">
                <img src="/images/social-2.png" alt="Instagram Story" className="w-full max-w-[280px] shadow-lg rounded-[2rem] border-[8px] border-black" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">Twitter / LinkedIn Header</h2>
            <div className="space-y-8">
              <div className="bg-muted p-8">
                <img src="/images/social-3.png" alt="Twitter Header" className="w-full shadow-lg" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2 uppercase tracking-wider">Brand Banner</h3>
                  <p className="text-muted-foreground max-w-2xl">
                    Ultra-wide panoramic format. Keeps the center area clear for profile pictures across different platforms.
                  </p>
                </div>
                <button className="border border-primary text-primary px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                  Download 1500x500
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
