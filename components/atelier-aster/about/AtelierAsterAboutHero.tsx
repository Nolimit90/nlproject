export default function AtelierAsterAboutHero() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-black mb-6 tracking-wide">
            À propos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            L'art de la précision horlogère
          </p>
        </div>

        {/* Workshop Portrait */}
        <div className="max-w-6xl mx-auto">
          <img
            src="https://source.unsplash.com/1400x900/?workshop,metal,texture"
            alt="Atelier ASTER - Espace de création"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
