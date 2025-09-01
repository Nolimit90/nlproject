export default function Project002Design() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Technical Sketch */}
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop&crop=center"
              alt="Technical Sketch - Brushed Dial, Blue DLC Case"
              className="w-full h-auto object-cover"
            />
            
            {/* Color/Texture Squares */}
            <div className="flex space-x-4 mt-6">
              <div className="w-12 h-12 bg-blue-900 rounded"></div>
              <div className="w-12 h-12 bg-gray-800 rounded"></div>
              <div className="w-12 h-12 bg-blue-700 rounded"></div>
            </div>
          </div>

          {/* Right Column - Final Product */}
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop&crop=center"
              alt="ÉON Chronos - Final Blue DLC Finish"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Centered Description Below */}
        <div className="max-w-4xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-8">
            Craftsmanship at Every Stage
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            Before any surface transformation, the watch is completely disassembled in our workshops. 
            Each component is handled with the utmost care, cleaned, inspected, and prepared for modification. 
            After the blue DLC treatment is applied, our master watchmakers reassemble the watch. 
            Final adjustments and a complete quality control cycle ensure flawless performance and visual harmony.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light mt-6">
            All modifications are meticulously executed in Switzerland, upholding the highest standards 
            of watchmaking and finishing.
          </p>
        </div>
      </div>
    </section>
  );
}
