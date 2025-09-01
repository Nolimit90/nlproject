'use client';

import { useState } from 'react';

export default function AtelierAsterShopHeader() {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedStrap, setSelectedStrap] = useState('all');

  return (
    <section className="pt-32 pb-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-black mb-6 tracking-wide">
            Boutique
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre collection de montres d'exception
          </p>
        </div>

        {/* Filters - Minimalist */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Collection Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Collection</label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="border-0 border-b border-gray-300 bg-transparent text-black focus:border-black focus:outline-none transition-colors duration-200"
            >
              <option value="all">Toutes</option>
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="blue-dlc">Blue DLC</option>
            </select>
          </div>

          {/* Color Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Couleur</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border-0 border-b border-gray-300 bg-transparent text-black focus:border-black focus:outline-none transition-colors duration-200"
            >
              <option value="all">Toutes</option>
              <option value="blue">Bleu</option>
              <option value="black">Noir</option>
              <option value="silver">Argent</option>
            </select>
          </div>

          {/* Strap Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Bracelet</label>
            <select
              value={selectedStrap}
              onChange={(e) => setSelectedStrap(e.target.value)}
              className="border-0 border-b border-gray-300 bg-transparent text-black focus:border-black focus:outline-none transition-colors duration-200"
            >
              <option value="all">Tous</option>
              <option value="steel">Acier</option>
              <option value="leather">Cuir</option>
              <option value="rubber">Caoutchouc</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
