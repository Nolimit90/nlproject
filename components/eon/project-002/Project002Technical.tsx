export default function Project002Technical() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Technical Specifications Table */}
        <div className="max-w-4xl mx-auto">
          {/* Table Header */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              All modifications are meticulously executed in Switzerland, upholding the highest standards 
              of watchmaking and finishing.
            </p>
          </div>

          {/* Specifications Table */}
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column */}
              <div className="border-r border-gray-300">
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium">Customer's watch</span>
                  <p className="text-lg text-black font-light mt-1">326934</p>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium">Material</span>
                  <p className="text-lg text-black font-light mt-1">Steel</p>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium">Size</span>
                  <p className="text-lg text-black font-light mt-1">42 mm</p>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium">Case</span>
                  <p className="text-lg text-black font-light mt-1">Blue DLC Coating</p>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium">Bezel</span>
                  <p className="text-lg text-black font-light mt-1">Blue DLC Coating</p>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <span className="text-sm text-gray-600 font-medium">Dial</span>
                  <p className="text-lg text-black font-light mt-1">Original Blue Dial</p>
                </div>
                <div className="py-6">
                  <span className="text-sm text-gray-600 font-medium">Hands</span>
                  <p className="text-lg text-black font-light mt-1">Originals</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:border-l-0">
                <div className="py-6 border-b border-gray-300 md:border-l md:border-b-0">
                  <span className="text-sm text-gray-600 font-medium">Strap</span>
                  <p className="text-lg text-black font-light mt-1">Blue DLC Coating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
