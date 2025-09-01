export default function AtelierAsterKeyPoints() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Materials */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-serif font-light text-black mb-4">
                Matériaux
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous sélectionnons uniquement les matériaux les plus nobles et durables, 
                garantissant une qualité exceptionnelle et une longévité incomparable.
              </p>
            </div>

            {/* Finishing */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-serif font-light text-black mb-4">
                Finition
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque surface est méticuleusement polie et finie à la main, 
                créant des détails d'une précision et d'une beauté exceptionnelles.
              </p>
            </div>

            {/* Warranty */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-serif font-light text-black mb-4">
                Garantie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Toutes nos montres bénéficient d'une garantie internationale de 5 ans, 
                témoignant de notre confiance en la qualité de notre savoir-faire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
