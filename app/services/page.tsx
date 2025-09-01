import Header from "@/components/Header";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function Services() {
  const services = [
    {
      title: "Search & Growth Strategy",
      desc: "Our search strategy team are your growth partners - navigating the digital landscape of today and tomorrow. And every Rise at Seven client gets one!",
      features: ["Strategy", "Search strategy", "Brand and creative strategy"],
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Onsite SEO",
      desc: "Building an onsite foundation and experience that ranks, converts and drives mentions and visibility in AI/LLMS",
      features: ["Technical SEO migrations", "Onsite content audits", "SEO consultancy"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Content Experience",
      desc: "Search experience optimisation is now everywhere, meaning we create, distribute and optimise content multi channel to drive both demand and discovery of category leaders",
      features: ["Copywriting", "Content production", "UGC content distribution"],
      img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Digital PR",
      desc: "Driving organic growth using both digital and traditional PR tactics - pushing users down the funnel to conversion. A global team of Digital PR experts covering UK, US, Germany, France, Netherlands, Italy, Spain, AUS markets",
      features: ["PR campaigns", "Data studies", "Rise Live", "Reactive PR", "Press office", "Commentary"],
      img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Social & Social Search",
      desc: "Driving demand or discovery on social through social-first campaigns, and strategies to put you IN social not just ON social and social search execution driving visibility",
      features: ["Social campaigns", "Social Search", "UGC content creation", "Social Management"],
      img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Data & Insights",
      desc: "Specialists in data reporting and performance tracking across organic channels. We use data and insight to inform everything we do",
      features: ["Data reporting", "Insights", "AI audits", "SEO insight"],
      img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <main>
      <Header />

      {/* HERO */}
      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.015em] mb-6">
            Our Services
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            We push users along the funnel through performance driven content marketing
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary">Connect with us</Button>
          </div>
        </div>
      </Section>

      {/* SERVICES GRID */}
      <Section variant="light">
        <div className="space-y-16">
          {services.map((service, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${
              i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
                  {service.title}
                </h2>
                <p className="text-black/70 mb-6 text-lg">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, j) => (
                    <span 
                      key={j} 
                      className="px-3 py-1 bg-nl-accent/10 text-nl-accent rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Button href="/contact" variant="secondary">Learn More</Button>
              </div>
              <div className={i % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* AWARDS */}
      <Section variant="dark" className="text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
            Award Winning
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. 
            We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-80">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="h-16 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white/60 text-xs">Award {i + 1}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section variant="light">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
            Recommended by category leaders
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-card p-6 ring-1 ring-black/10">
            <p className="text-black/80 mb-4 italic">
              "I recommend Rise at Seven to any forward-thinking brand that wants to disrupt their niche. 
              Top of the league in the PR game and we have continued to work with them across other portfolio brands without doubt"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-nl-accent/20 rounded-full flex items-center justify-center">
                <span className="text-nl-accent font-semibold">AM</span>
              </div>
              <div>
                <p className="font-semibold">Adam & Sally Minto</p>
                <p className="text-black/60 text-sm">Founders of Revolution Beauty</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-card p-6 ring-1 ring-black/10">
            <p className="text-black/80 mb-4 italic">
              "We are a proud partner of Rise at Seven, they've delivered tangible organic results for JD Sports 
              across Europe and have gone above and beyond using creativity to have holistic impact for the brand and business"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-nl-accent/20 rounded-full flex items-center justify-center">
                <span className="text-nl-accent font-semibold">TG</span>
              </div>
              <div>
                <p className="font-semibold">Tim Giles</p>
                <p className="text-black/60 text-sm">Head of SEO, JD Sports</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="text-center text-white">
        <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
          Ready to start? Let's build something great.
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Tell us about your project. We'll reply within 24 hours.
        </p>
        <Button href="/contact" variant="primary">Start a project</Button>
      </Section>
    </main>
  );
}



























