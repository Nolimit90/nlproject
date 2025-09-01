'use client';

import { memo } from 'react';

const BRANDS = [
  { name: "Apple", src: "/apple-logo.svg" },
  { name: "Nike", icon: "✓" },
  { name: "Chanel", icon: "C" },
  { name: "Louis Vuitton", icon: "LV" },
  { name: "Tesla", icon: "⚡" },
  { name: "Spotify", icon: "🎵" },
];

const Logo = memo(({ name, src, icon }: { name: string; src?: string; icon?: string }) => {
  if (src) {
    return (
      <div className="flex items-center justify-center px-6">
        <img
          src={src}
          alt={name}
          className="w-10 h-10 filter brightness-0 invert opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
          loading="eager"
          onError={(e: any) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'text-white/80 hover:text-white text-2xl font-semibold hover:scale-110 transition-all duration-300';
            fallback.textContent = '🍎';
            target.parentNode?.appendChild(fallback);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-6">
      <span className="text-white/80 hover:text-white text-2xl font-semibold hover:scale-110 transition-all duration-300">
        {icon}
      </span>
    </div>
  );
});

Logo.displayName = 'Logo';

export default function BrandStrip() {
  return (
    <div className="py-12 bg-black/30 backdrop-blur-sm">
      <div className="text-center mb-8">
        <p className="text-white/90 text-sm font-medium tracking-wide uppercase">
          Inspired by excellence
        </p>
      </div>
      <div className="flex items-center justify-center space-x-12 animate-scroll-left">
        {BRANDS.map((brand, index) => (
          <Logo key={index} name={brand.name} src={brand.src} icon={brand.icon} />
        ))}
        {/* Duplication pour l'effet de défilement continu */}
        {BRANDS.map((brand, index) => (
          <Logo key={`duplicate-${index}`} name={brand.name} src={brand.src} icon={brand.icon} />
        ))}
      </div>
    </div>
  );
}
