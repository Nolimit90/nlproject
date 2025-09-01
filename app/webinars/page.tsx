import Header from "@/components/Header";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function Webinars() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.015em] mb-6">
            Webinars
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Learn from our experts on search-first content marketing strategies
          </p>
        </div>
      </Section>

      {/* UPCOMING WEBINARS */}
      <Section variant="light">
        <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-8 text-center">
          Upcoming Webinars
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "SEO Strategy for 2025",
              date: "March 15, 2025",
              time: "2:00 PM GMT",
              desc: "Learn the latest SEO strategies and tactics for 2025",
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
            },
            {
              title: "Content Marketing Masterclass",
              date: "March 22, 2025",
              time: "2:00 PM GMT",
              desc: "Master the art of creating content that ranks and converts",
              img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop"
            }
          ].map((webinar, i) => (
            <div key={i} className="bg-white rounded-card p-6 ring-1 ring-black/10">
              <div className="relative aspect-[16/9] overflow-hidden rounded-card mb-4">
                <img 
                  src={webinar.img} 
                  alt={webinar.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
              <div className="flex gap-4 text-sm text-black/60 mb-3">
                <span>{webinar.date}</span>
                <span>{webinar.time}</span>
              </div>
              <p className="text-black/70 mb-4">{webinar.desc}</p>
              <Button href="/contact" variant="primary">Register Now</Button>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="text-center text-white">
        <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
          Stay Updated
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Get notified about upcoming webinars and exclusive content marketing insights.
        </p>
        <Button href="/contact" variant="primary">Subscribe</Button>
      </Section>
    </main>
  );
}



























