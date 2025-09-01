'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Collections() {
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null);

  const collections = [
    {
      id: 1,
      name: 'Classic',
      description: 'Timeless elegance that transcends generations',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop&crop=center',
      products: 12,
      priceRange: '€2,400 - €4,200'
    },
    {
      id: 2,
      name: 'Modern',
      description: 'Contemporary sophistication for the discerning individual',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&h=600&fit=crop&crop=center',
      products: 8,
      priceRange: '€2,800 - €5,600'
    },
    {
      id: 3,
      name: 'Avant-Garde',
      description: 'Bold innovation pushing the boundaries of luxury',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center',
      products: 6,
      priceRange: '€3,200 - €7,800'
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
            Our Collections
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Each collection represents a distinct philosophy, crafted with precision and designed for those who appreciate the art of timekeeping.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative"
              onMouseEnter={() => setHoveredCollection(collection.id)}
              onMouseLeave={() => setHoveredCollection(null)}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-lg border border-white/10">
                {/* Collection Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredCollection === collection.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 ${
                  hoveredCollection === collection.id ? 'opacity-100' : 'opacity-80'
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-4">
                      <h3 className="text-3xl font-light text-white mb-3">
                        {collection.name}
                      </h3>
                      <p className="text-white/80 leading-relaxed mb-6">
                        {collection.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-sm text-white/60">
                        <span className="block">{collection.products} pieces</span>
                        <span className="block">{collection.priceRange}</span>
                      </div>
                    </div>

                    <Link
                      href={`/eon/collection/${collection.id}`}
                      className={`inline-flex items-center space-x-2 px-6 py-3 border border-white text-white font-medium tracking-wide transition-all duration-300 ${
                        hoveredCollection === collection.id 
                          ? 'bg-white text-black' 
                          : 'hover:bg-white hover:text-black'
                      }`}
                    >
                      <span>EXPLORE</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-white mb-6">
              Discover Your Perfect Timepiece
            </h3>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              From classic elegance to avant-garde innovation, find the collection that speaks to your unique style and appreciation for craftsmanship.
            </p>
            <Link
              href="/eon/collections"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <span>VIEW ALL COLLECTIONS</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
