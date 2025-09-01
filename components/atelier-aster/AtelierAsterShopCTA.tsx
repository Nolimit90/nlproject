import Link from 'next/link';

export default function AtelierAsterShopCTA() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-8">
            Shop the Collection
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Découvrez la collection complète ASTER et trouvez votre pièce d'exception
          </p>
          <Link
            href="/demos/atelier-aster/shop"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <span>EXPLORER LA BOUTIQUE</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
