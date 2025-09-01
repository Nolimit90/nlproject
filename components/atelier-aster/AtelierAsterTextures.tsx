export default function AtelierAsterTextures() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Two Visuals Aligned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Brushed Steel */}
          <div className="w-full">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://source.unsplash.com/1200x900/?steel,texture,metal"
                alt="Acier brossé - Texture premium"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center font-light">
              Acier brossé - Texture premium
            </p>
          </div>
          
          {/* Right - Blue Water */}
          <div className="w-full">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://source.unsplash.com/1200x900/?water,blue,texture"
                alt="Eau bleutée - Inspiration chromatique"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center font-light">
              Eau bleutée - Inspiration chromatique
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
