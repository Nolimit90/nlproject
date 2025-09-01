export default function AtelierAsterTechnical() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Technical Specifications Table */}
        <div className="max-w-4xl mx-auto">
          {/* Table Header */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              Toutes les modifications sont méticuleusement exécutées en Suisse, 
              respectant les plus hauts standards de l'horlogerie et de la finition.
            </p>
          </div>

          {/* Specifications Table - Fine Lines */}
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column */}
              <div className="border-r border-gray-300">
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Montre du client</span>
                  <p className="text-lg text-black font-light mt-1">326934</p>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Taille</span>
                  <p className="text-lg text-black font-light mt-1">42 mm</p>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Bélière</span>
                  <p className="text-lg text-black font-light mt-1">Revêtement DLC bleu</p>
                </div>
                <div className="py-6">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Cadran</span>
                  <p className="text-lg text-black font-light mt-1">Cadran bleu original</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:border-l-0">
                <div className="py-6 border-b border-gray-300 md:border-l md:border-b-0">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Matériau</span>
                  <p className="text-lg text-black font-light mt-1">Acier</p>
                </div>
                <div className="py-6 border-b border-gray-300 md:border-l md:border-b-0">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Boîtier</span>
                  <p className="text-lg text-black font-light mt-1">Revêtement DLC bleu</p>
                </div>
                <div className="py-6 border-b border-gray-300 md:border-l md:border-b-0">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Bracelet</span>
                  <p className="text-lg text-black font-light mt-1">Revêtement DLC bleu</p>
                </div>
                <div className="py-6 md:border-l">
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Aiguilles</span>
                  <p className="text-lg text-black font-light mt-1">Originales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
