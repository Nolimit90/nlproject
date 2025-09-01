"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Vidéo de fond go.mp4 - UNIQUEMENT cette modification */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/go.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay sombre léger pour la lisibilité du texte */}
      <div className="absolute inset-0 w-full h-full bg-black/40 -z-10"></div>
      
      {/* Contenu centré verticalement et horizontalement - EXACTEMENT comme avant */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-16 md:py-24">
        {/* Titre "CHRIS HENOCK" en Michelle Gore Bold, très impactant */}
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] md:text-[clamp(4rem,12vw,10rem)] font-michelle-bold text-white mb-8 md:mb-12 leading-none tracking-tight">
          CHRIS HENOCK
        </h1>
        
        {/* Sous-titre 1 : "web developer that bring" en Michelle Gore Medium */}
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] md:text-[clamp(2rem,5vw,3rem)] font-michelle-medium text-gray-300 mb-6 md:mb-8 tracking-wide">
          web developer that bring
        </h2>
        
        {/* Sous-titre 2 : "your vision to life" en Michelle Gore Bold */}
        <h3 className="text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(3rem,7vw,5rem)] font-michelle-bold text-white mb-8 md:mb-12 tracking-tight">
          your vision to life
        </h3>
        
        {/* Baseline FR en Michelle Gore Regular avec spacing premium */}
        <p className="text-[clamp(1.125rem,3vw,1.5rem)] md:text-[clamp(1.25rem,3.5vw,1.75rem)] font-michelle-regular text-gray-400 max-w-4xl mx-auto leading-relaxed">
          Création de sites web modernes, rapides et sur-mesure pour entrepreneurs et PME.
        </p>
      </div>
    </section>
  );
}

// Composant pour les vitrines avec effet de glace - EXACTEMENT comme avant
export function ShowcaseSection() {
  const showcases = [
    {
      id: 'restaurant',
      title: 'Restaurant Gastronomique',
      description: 'Site web premium pour restaurants haut de gamme avec style luxury',
      image: '/previews/restaurant.jpg',
      href: '/demos/restaurant',
      features: ['Header transparent', 'Navigation centrée', 'Menu mobile overlay', 'Images optimisées WebP']
    },
    {
      id: 'aurora-bay',
      title: 'Aurora Bay Resort',
      description: 'Hotel & Resort, design minimal et luxury',
      image: '/previews/hotel.jpg',
      href: '/demos/aurora-bay',
      features: ['Header transparent', 'Navigation centrée', 'Menu overlay beige', 'Design ultra-minimal']
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Nike x Patta',
      description: 'Site e-commerce streetwear urbain',
      image: '/previews/ecommerce.jpg',
      href: '/demos/ecommerce',
      features: ['Design hybride Nike x Patta', 'Navigation responsive', 'Recherche fonctionnelle', 'Style streetwear']
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          {/* Titre "Portfolio" en Michelle Gore Bold */}
          <h2 className="text-5xl md:text-6xl font-michelle-bold tracking-tight mb-8 text-gray-900">
            Portfolio
          </h2>
          {/* Sous-texte sobre en taille réduite */}
          <p className="text-lg font-michelle-regular text-gray-600 max-w-3xl mx-auto">
            Découvrez mes démonstrations web premium avec un style luxury et une performance optimale
          </p>
        </div>
        
        {/* Trois cartes alignées horizontalement, centrées avec coins arrondis 2xl et shadow douce */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {showcases.map((showcase) => (
            <div key={showcase.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:scale-[1.01]">
                {/* Image en haut avec overlay léger et titre dessus */}
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={showcase.image}
                    alt={showcase.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay léger */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Titre dessus */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-michelle-bold text-white text-center px-4 drop-shadow-lg">
                      {showcase.title}
                    </h3>
                  </div>
                </div>

                {/* Description en dessous */}
                <div className="p-8">
                  <p className="text-base font-michelle-regular text-gray-600 mb-6 leading-relaxed">
                    {showcase.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {showcase.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                        <span className="text-sm font-michelle-regular text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={showcase.href} className="block w-full">
                    <div className="w-full py-3 px-6 bg-gray-900 text-white font-michelle-medium text-sm rounded-lg hover:bg-gray-800 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
                      Explorer la démo
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
