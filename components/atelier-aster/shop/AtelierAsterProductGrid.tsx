'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/atelier-aster/useCart';

export default function AtelierAsterProductGrid() {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'project-002',
      name: 'Project 002 – Timeless Blue',
      price: 2800,
      image: 'https://source.unsplash.com/1200x900/?product,watch,studio',
      collection: 'Blue DLC',
      isNew: true,
      slug: 'project-002'
    },
    {
      id: 'classic-001',
      name: 'Classic 001 – Heritage',
      price: 3200,
      image: 'https://source.unsplash.com/1200x900/?watch,classic,luxury',
      collection: 'Classic',
      isNew: false,
      slug: 'classic-001'
    },
    {
      id: 'modern-003',
      name: 'Modern 003 – Avant-garde',
      price: 3600,
      image: 'https://source.unsplash.com/1200x900/?watch,modern,design',
      collection: 'Modern',
      isNew: true,
      slug: 'modern-003'
    },
    {
      id: 'blue-dlc-004',
      name: 'Blue DLC 004 – Monochrome',
      price: 4200,
      image: 'https://source.unsplash.com/1200x900/?watch,blue,steel',
      collection: 'Blue DLC',
      isNew: false,
      slug: 'blue-dlc-004'
    },
    {
      id: 'classic-005',
      name: 'Classic 005 – Elegance',
      price: 2800,
      image: 'https://source.unsplash.com/1200x900/?watch,elegant,premium',
      collection: 'Classic',
      isNew: false,
      slug: 'classic-005'
    },
    {
      id: 'modern-006',
      name: 'Modern 006 – Innovation',
      price: 3800,
      image: 'https://source.unsplash.com/1200x900/?watch,innovation,tech',
      collection: 'Modern',
      isNew: true,
      slug: 'modern-006'
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Products Grid - 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Product Image */}
              <div className="relative mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                />
                
                {/* Product Labels */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-black text-white px-3 py-1 text-xs font-medium tracking-wide">
                      NEW
                    </span>
                  )}
                  {product.collection === 'Blue DLC' && (
                    <span className="bg-[#355C7D] text-white px-3 py-1 text-xs font-medium tracking-wide">
                      LIMITED
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-4">
                <h3 className="text-xl font-light text-black mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.collection}
                </p>
                <p className="text-2xl font-light text-black">
                  €{product.price.toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Link
                  href={`/demos/atelier-aster/product/${product.slug}`}
                  className="flex-1 text-center py-3 border border-gray-300 text-black font-medium tracking-wide hover:border-black transition-colors duration-200"
                >
                  Voir le produit
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-6 py-3 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200"
                >
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
