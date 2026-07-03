import { useListFaqs, useListTestimonials } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Loader2 } from "lucide-react";

export default function FAQ() {
  const { data: faqs, isLoading: faqsLoading } = useListFaqs();
  const { data: testimonials, isLoading: testimonialsLoading } = useListTestimonials();

  // Group FAQs by category
  const faqsByCategory = faqs?.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 px-6 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Knowledge Base</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl font-light text-primary-foreground/80 max-w-2xl">
            Everything you need to know before committing to a Summit expedition.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          {faqsLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : (
            <div className="space-y-16">
              {faqsByCategory && Object.entries(faqsByCategory).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">{category}</h2>
                  <div className="space-y-6">
                    {items.map(faq => (
                      <details key={faq.id} className="group bg-card border border-border p-6 cursor-pointer">
                        <summary className="font-bold text-lg text-primary list-none flex justify-between items-center outline-none">
                          {faq.question}
                          <span className="text-accent text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                        </summary>
                        <p className="mt-4 text-muted-foreground pt-4 border-t border-border/50">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Words from the Wild</h2>
          
          {testimonialsLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials?.map(t => (
                <div key={t.id} className="bg-background border border-border p-8 relative">
                  <div className="text-accent text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
                  <div className="relative z-10">
                    <div className="flex mb-4">
                      {Array.from({length: 5}).map((_, i) => (
                        <span key={i} className={`text-lg ${i < t.rating ? 'text-accent' : 'text-border'}`}>★</span>
                      ))}
                    </div>
                    <p className="italic text-muted-foreground mb-6">"{t.quote}"</p>
                    <div className="flex items-center gap-4 border-t border-border pt-4">
                      {t.imageUrl ? (
                        <img src={t.imageUrl} alt={t.customerName} className="w-12 h-12 rounded-full object-cover grayscale" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary font-bold">{t.customerName.charAt(0)}</div>
                      )}
                      <div>
                        <span className="block font-bold text-primary">{t.customerName}</span>
                        <span className="block text-xs uppercase tracking-wider text-muted-foreground">{t.role}</span>
                      </div>
                    </div>
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
