import Header from "@/components/Header";
import Section from "@/components/Section";
import FigmaViewer from "@/components/FigmaViewer";

export default function FigmaPage() {
  return (
    <main>
      <Header />

      <Section variant="dark" className="text-white pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-[-0.015em] mb-6">
            Figma Integration
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            View and manage your Figma design components, styles, and assets directly in your project.
          </p>
        </div>
      </Section>

      <Section variant="light">
        <FigmaViewer />
      </Section>
    </main>
  );
}



























