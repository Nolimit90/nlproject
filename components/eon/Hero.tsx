'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const watches = [
    { id: 1, name: 'Chronos', price: '€2,800', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop&crop=center' },
    { id: 2, name: 'Aether', price: '€3,200', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop&crop=center' },
    { id: 3, name: 'Nova', price: '€2,600', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center' },
    { id: 4, name: 'Zenith', price: '€3,500', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center' },
    { id: 5, name: 'Eclipse', price: '€2,900', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop&crop=center' },
    { id: 6, name: 'Polaris', price: '€3,800', image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop&crop=center' },
    { id: 7, name: 'Luna', price: '€2,400', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center' },
    { id: 8, name: 'Stellar', price: '€3,100', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center' },
  ];

  return (
    <section className="relative py-24 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] text-white mb-8">
            ÉON
          </h1>
        </div>

        {/* Main Title */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-3xl font-playfair text-white/90 mb-4 tracking-wide">
            Timeless Collection
          </h2>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover the elegance of time redefined.
          </p>
        </div>

        {/* Watches Display - Arc Layout */}
        <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative mb-16">
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-8 gap-4 md:gap-6 lg:gap-8 transform -rotate-12 md:-rotate-6">
                {watches.map((watch, index) => (
                  <div
                    key={watch.id}
                    className="group relative transform hover:scale-110 transition-all duration-500 hover:z-10"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.8s ease-out forwards'
                    }}
                  >
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 shadow-2xl">
                        <img
                          src={watch.image}
                          alt={watch.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {watch.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/eon/collections"
              className="group relative px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>EXPLORE COLLECTION</span>
              </span>
            </Link>
            
            <Link
              href="/eon/project-002"
              className="group relative px-8 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>VIEW PROJECT 002</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
