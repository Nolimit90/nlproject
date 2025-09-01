import Header from "@/components/Header";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function Blog() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.015em] mb-6">
            Blog
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Insights, strategies, and thoughts on search-first content marketing
          </p>
        </div>
      </Section>

      {/* BLOG POSTS */}
      <Section variant="light">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Rise at Seven moves into the content marketing space",
              author: "Mia King",
              time: "5 mins",
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
            },
            {
              title: "Rise at Seven rebrands...",
              author: "Carrie Rose",
              time: "2 mins",
              img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop"
            },
            {
              title: "Red Bull Chooses Rise at Seven as their SEO Agency",
              author: "Ray Saddiq",
              time: "1 min",
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
            }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card mb-4">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0" />
              </div>
              <div className="mb-2">
                <span className="text-sm text-black/60">News</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <div className="flex items-center gap-2 text-sm text-black/60">
                <span>{post.author}</span>
                <span>{post.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button href="/contact" variant="secondary">Subscribe to updates</Button>
        </div>
      </Section>
    </main>
  );
}



























