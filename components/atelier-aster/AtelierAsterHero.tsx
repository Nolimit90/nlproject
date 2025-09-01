'use client';

import Link from 'next/link';

export default function AtelierAsterHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image with Subtle Vignetting */}
      <div className="absolute inset-0">
        <img
          src="https://source.unsplash.com/1600x900/?watch,luxury,blue"
          alt="ATELIER ASTER - Project 002"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-[0.2em] text-white mb-6">
            ASTER
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-white/90 mb-4 tracking-wide">
            Project 002 – Timeless Blue
          </h2>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Une interprétation audacieuse de l'élégance temporelle
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/demos/atelier-aster/collections"
            className="px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            EXPLORE COLLECTION
          </Link>
          
          <Link
            href="/demos/atelier-aster/shop"
            className="px-8 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
}
