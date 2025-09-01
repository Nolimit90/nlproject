'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ShopPreview() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const featuredProducts = [
    {
      id: 1,
      name: 'Chronos Classic',
      price: '€2,800',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop&crop=center',
      category: 'Classic Collection',
      description: 'Timeless elegance meets modern precision'
    },
    {
      id: 2,
      name: 'Aether Modern',
      price: '€3,200',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop&crop=center',
      category: 'Modern Collection',
      description: 'Contemporary design with minimalist appeal'
    },
    {
      id: 3,
      name: 'Nova Avant-Garde',
      price: '€2,600',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop&crop=center',
      category: 'Avant-Garde',
      description: 'Bold innovation in luxury timekeeping'
    },
    {
      id: 4,
      name: 'Zenith Elite',
      price: '€3,500',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop&crop=center',
      category: 'Elite Collection',
      description: 'Ultimate sophistication and craftsmanship'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
            Featured Pieces
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Discover our most coveted timepieces, each telling a unique story of elegance and innovation.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-white/10">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>

                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/60 transition-all duration-500 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      href={`/eon/product/${product.id}`}
                      className="px-6 py-3 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    >
                      VIEW PRODUCT
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-gold font-medium tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-light text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/70 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-white">
                      {product.price}
                    </span>
                    <button className="text-white/80 hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/eon/shop"
            className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            <span>VIEW ALL PRODUCTS</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
