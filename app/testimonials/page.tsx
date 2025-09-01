import Header from "@/components/Header";
import Section from "@/components/Section";

export default function Testimonials() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.015em] mb-6">
            Testimonials
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            What our clients say about working with us
          </p>
        </div>
      </Section>

      {/* TESTIMONIALS GRID */}
      <Section variant="light">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "I recommend Rise at Seven to any forward-thinking brand that wants to disrupt their niche. Top of the league in the PR game and we have continued to work with them across other portfolio brands without doubt",
              author: "Adam & Sally Minto",
              role: "Founders of Revolution Beauty",
              company: "Revolution Beauty"
            },
            {
              quote: "We are a proud partner of Rise at Seven, they've delivered tangible organic results for JD Sports across Europe and have gone above and beyond using creativity to have holistic impact for the brand and business",
              author: "Tim Giles",
              role: "Head of SEO, JD Sports",
              company: "JD Sports"
            },
            {
              quote: "The passion and creativity are what make Rise at Seven different. Their ability to pull out a superb campaign and improve the success after they have met the KPI is what sets them apart from many other agencies",
              author: "Anna Bravington",
              role: "Head of Digital, GAME",
              company: "GAME"
            },
            {
              quote: "Rise at Seven's creative approach to SEO and digital PR is what has attracted us to them and they've already proved the value they bring to us in fuelling digital growth for the PLT brand internationally.",
              author: "Matt Holmes",
              role: "Head of Digital PLT",
              company: "PrettyLittleThing"
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white rounded-card p-6 ring-1 ring-black/10">
              <p className="text-black/80 mb-4 italic text-lg">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-nl-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-nl-accent font-semibold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-black/60 text-sm">{testimonial.role}</p>
                  <p className="text-nl-accent text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}



























