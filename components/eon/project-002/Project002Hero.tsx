'use client';

import Link from 'next/link';

export default function Project002Hero() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Back Link - Left */}
        <div className="mb-16">
          <Link 
            href="/eon" 
            className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
          >
            ← Back
          </Link>
        </div>

        {/* Main Title - Centered */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-wide text-black">
            PROJECT 002
          </h1>
        </div>

        {/* Product Image - Full Width */}
        <div className="w-full">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&h=800&fit=crop&crop=center"
            alt="ÉON Chronos - Blue DLC Finish"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
