import Header from "@/components/Header";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function About() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.015em] mb-6">
            About Us
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            A global team of search-first content marketers engineering semantic relevancy & category signals for both the internet and people
          </p>
        </div>
      </Section>

      {/* STORY */}
      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-6">
              The Story
            </h2>
            <div className="space-y-4 text-black/70">
              <p>
                It was Christmas 2018, and the John Lewis advert (large UK department store) landed on our TV screens - 
                the most anticipated Christmas advert behind the Coca Cola truck. That year, it starred Elton John. 
                A tearjerker story of a young boy gifted a piano, growing up to become the global icon he is today. 
                It captured the magic of gifting.
              </p>
              <p>
                Little did they know - <strong>our CEO/Founder was live tracking search demand</strong> whilst the advert ran. 
                Tracking "John Lewis" "Christmas Gifts" but something else spiked more than anything she had expected.
              </p>
              <p>
                <strong>Searches for Pianos overnight increased 300%</strong>. Carrie went to Google to search for Pianos herself 
                to see who ranked, to see if John Lewis had outsmarted the SEO industry and drove traffic in the thousands. 
                But no, John Lewis was nowhere to be seen. Not on page 1 or 2. Instead it was a music retailer in position 1 
                called Gear 4 Music. John Lewis spent £7m and sent traffic in the thousands to a small retailer in the north 
                of England and this is happening all the time! Bad marketing is sending clicks to competitors.
              </p>
              <p>
                Our founder realised, the SEO industry lost sight of the driver - how we got someone to want something in the first place. 
                Consumer behaviour (what people want) is literally being influenced by TV adverts, celebrity endorsements, music, 
                social media, influencers - but so many campaigns aren't failing to capture it. An agency was needed to both generate 
                search demand and capture it on the other side. Which is where Rise at Seven was born.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" 
              alt="Team collaboration" 
              className="rounded-card w-full"
            />
          </div>
        </div>
      </Section>

      {/* APPROACH */}
      <Section variant="dark" className="text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
            Where we fit in the mix
          </h2>
          <h3 className="text-2xl font-semibold mb-8">
            We're organic media planners by trade chasing consumers not algorithms
          </h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-white/80">
            <p>
              Whilst everyone else is chasing algorithms whether it's learning to manipulate Google or hack TikTok, 
              we're chasing consumers. We know people better than anyone else and their needs (because they're telling 
              us in what they search).
            </p>
            <p>
              We plan our organic media content multi-channel based on where the search volume, engagement and traffic 
              opportunities are. We create content for SEO, social and the media and we do it in all forms. Our studio 
              team have done large scale production shoots both product and on location, were producing assets for organic 
              social and paid, and large scale content marketing programmes.
            </p>
            
            <div className="bg-white/10 rounded-card p-6 mt-6">
              <h4 className="font-semibold mb-3">What we create:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Content for website/SEO</li>
                <li>• Creative content marketing/production</li>
                <li>• UGC & organic social content</li>
                <li>• PR/Media stories</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-4xl font-display font-extrabold text-nl-accent mb-2">4</div>
              <p className="text-white/80 text-sm">Global Offices</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-extrabold text-nl-accent mb-2">79</div>
              <p className="text-white/80 text-sm">Awards Won</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-extrabold text-nl-accent mb-2">60</div>
              <p className="text-white/80 text-sm">Minutes to Results</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-extrabold text-nl-accent mb-2">#1</div>
              <p className="text-white/80 text-sm">Most Recommended</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button href="/work" variant="secondary">Take a look at our work</Button>
        </div>
      </Section>

      {/* VALUES */}
      <Section variant="light">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
            Our Values
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-nl-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-nl-accent text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-black/70">
              We're dedicated to creating the industry narrative that others follow 3 years from now. 
              We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-nl-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-nl-accent text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Results-Driven</h3>
            <p className="text-black/70">
              Everything we do is data-backed and performance-focused. We chase consumers, not algorithms, 
              to deliver tangible results for our clients.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-nl-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-nl-accent text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Speed</h3>
            <p className="text-black/70">
              We've created a service which takes ideas to result within 60 minutes. 
              Google is moving fast, but humans are moving faster.
            </p>
          </div>
        </div>
      </Section>

      {/* TEAM PREVIEW */}
      <Section variant="dark" className="text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
            Meet The Risers
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our global team of search-first content marketers and creative professionals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Carrie Rose", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop" },
            { name: "Team Member", role: "Head of Strategy", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
            { name: "Team Member", role: "Creative Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" }
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
              <p className="text-white/70 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button href="/team" variant="secondary">Meet the full team</Button>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="light" className="text-center">
        <h2 className="text-3xl font-display font-extrabold tracking-[-0.015em] mb-4">
          Ready to work with us?
        </h2>
        <p className="text-black/70 max-w-2xl mx-auto mb-8">
          Let's discuss how we can help you achieve your goals and become a category leader.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/contact" variant="primary">Start a project</Button>
          <Button href="/services" variant="secondary">View services</Button>
        </div>
      </Section>
    </main>
  );
}



























