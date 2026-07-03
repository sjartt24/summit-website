import { Link } from "wouter";
import { useListBlogPosts } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { Loader2, ArrowRight } from "lucide-react";

export default function Blog() {
  const { data: posts, isLoading } = useListBlogPosts();

  return (
    <Layout>
      <section className="py-24 px-6 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">Dispatches</h1>
          <p className="text-xl font-light text-muted-foreground max-w-2xl">
            Stories, gear reviews, and technical guides from the Summit team.
          </p>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {posts?.map((post, i) => (
                <article key={post.id} className={`group flex flex-col ${i === 0 ? 'md:col-span-2 md:flex-row gap-8 lg:gap-12' : ''}`}>
                  <div className={`overflow-hidden bg-secondary relative ${i === 0 ? 'md:w-3/5 aspect-video' : 'aspect-[16/10] mb-6'}`}>
                    {post.imageUrl && (
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col justify-center ${i === 0 ? 'md:w-2/5' : ''}`}>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground mb-4">
                      <span>{new Date(post.publishedAt).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                    
                    <h2 className={`font-serif font-bold text-primary mb-4 ${i === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">{post.author}</span>
                      <Link href={`/blog/${post.slug}`} className="text-accent font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:underline underline-offset-4">
                        Read <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
