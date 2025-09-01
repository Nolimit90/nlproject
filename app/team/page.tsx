import Header from "@/components/Header";
import Section from "@/components/Section";

export default function Team() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.015em] mb-6">
            Meet The Team
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Our global team of search-first content marketers and creative professionals
          </p>
        </div>
      </Section>

      {/* TEAM GRID */}
      <Section variant="light">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Carrie Rose", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop" },
            { name: "Team Member", role: "Head of Strategy", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
            { name: "Team Member", role: "Creative Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" },
            { name: "Team Member", role: "SEO Specialist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
            { name: "Team Member", role: "Content Manager", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" },
            { name: "Team Member", role: "Digital PR", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" }
          ].map((member, i) => (
            <div key={i} className="text-center">
              <div className="relative aspect-square overflow-hidden rounded-card mb-4">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-black/70 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}



























