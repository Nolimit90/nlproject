'use client';

import Link from 'next/link';

export default function LifestyleBanner() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&h=800&fit=crop&crop=center"
          alt="ÉON Lifestyle"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-wide leading-tight">
              Timeless
              <br />
              <span className="text-gold">Elegance</span>
            </h2>
          </div>

          <div className="mb-12">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              Every ÉON timepiece is more than a watch—it's a statement of refined taste, 
              a testament to craftsmanship, and a companion for life's most precious moments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/eon/story"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <span>OUR STORY</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link
              href="/eon/craftsmanship"
              className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              <span>DISCOVER CRAFTSMANSHIP</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
        <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 border border-white/10 rounded-full"></div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border border-white/10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
