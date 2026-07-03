import { useRoute } from "wouter";
import { useGetBlogPost } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  
  const { data: post, isLoading, isError } = useGetBlogPost(slug, {
    query: { enabled: !!slug, queryKey: ['blog', slug] }
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-accent" size={48} />
        </div>
      </Layout>
    );
  }

  if (isError || !post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Dispatch Not Found</h1>
          <p className="text-muted-foreground mb-8">The story you're looking for seems to have gone off-trail.</p>
          <Link href="/blog" className="bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-wider hover:bg-accent transition-colors">
            Return to Dispatches
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="bg-background">
        <header className="relative h-[60vh] flex items-end pb-16">
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-white">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-sm uppercase tracking-widest font-bold transition-colors">
              <ArrowLeft size={16} /> Back to Dispatches
            </Link>
            
            <div className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-accent">
              <span className="bg-accent text-white px-2 py-1">{post.category}</span>
              <span className="text-white/80">{post.readTimeMinutes} min read</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span className="font-bold">{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{new Date(post.publishedAt).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-xl md:text-2xl text-primary font-serif italic mb-12 leading-relaxed border-l-4 border-accent pl-6">
            {post.excerpt}
          </p>
          
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary transition-colors prose-strong:text-primary">
            {/* Split content by newlines and map to paragraphs for simple rendering */}
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-20 pt-8 border-t border-border flex justify-between items-center">
            <div className="font-bold uppercase tracking-widest text-sm text-primary">Share Dispatch</div>
            <div className="flex gap-4">
              <button className="text-muted-foreground hover:text-accent transition-colors">Twitter</button>
              <button className="text-muted-foreground hover:text-accent transition-colors">Facebook</button>
              <button className="text-muted-foreground hover:text-accent transition-colors">Copy Link</button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
