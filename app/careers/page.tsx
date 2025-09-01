import Header from "@/components/Header";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function Careers() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.015em] mb-6">
            Careers
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Join our team of search-first content marketers and creative professionals
          </p>
        </div>
      </Section>

      {/* OPEN POSITIONS */}
      <Section variant="light">
        <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-8 text-center">
          Open Positions
        </h2>
        
        <div className="space-y-6">
          {[
            {
              title: "SEO Specialist",
              location: "Remote / UK",
              type: "Full-time",
              desc: "Join our SEO team to help clients dominate search results and drive organic growth."
            },
            {
              title: "Content Creator",
              location: "Remote / UK",
              type: "Full-time",
              desc: "Create compelling content that ranks and converts across multiple channels."
            },
            {
              title: "Digital PR Manager",
              location: "Remote / UK",
              type: "Full-time",
              desc: "Lead PR campaigns that generate organic growth and brand visibility."
            }
          ].map((position, i) => (
            <div key={i} className="bg-white rounded-card p-6 ring-1 ring-black/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                  <div className="flex gap-4 text-sm text-black/60 mb-2">
                    <span>{position.location}</span>
                    <span>{position.type}</span>
                  </div>
                  <p className="text-black/70">{position.desc}</p>
                </div>
                <Button href="/contact" variant="secondary">Apply Now</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="text-center text-white">
        <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
          Don't see the right role?
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          We're always looking for talented individuals. Send us your CV and we'll get in touch.
        </p>
        <Button href="/contact" variant="primary">Send CV</Button>
      </Section>
    </main>
  );
}



























