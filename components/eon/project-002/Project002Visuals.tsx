export default function Project002Visuals() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Two Images Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=400&fit=crop&crop=center"
              alt="Blue DLC Texture Detail"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop&crop=center"
              alt="Blue DLC Surface Finish"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Centered Description Text */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-black mb-8">
            A Chromatic Statement
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            Every line of the watch now speaks the same language: blue. The original dial's vibrant hue 
            inspired a full transformation, where the case and bracelet are treated with a custom blue DLC coating. 
            A seamless aesthetic where color becomes identity.
          </p>
        </div>
      </div>
    </section>
  );
}
