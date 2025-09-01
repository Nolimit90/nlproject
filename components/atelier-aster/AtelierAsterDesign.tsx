export default function AtelierAsterDesign() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Two Column Layout - 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Technical Sketch */}
          <div className="w-full">
            <img
              src="https://source.unsplash.com/1200x900/?watch,sketch,design"
              alt="Croquis technique - Project 002"
              className="w-full h-auto object-cover"
            />
            
            {/* Color Samples - Blue Steel Squares */}
            <div className="flex space-x-4 mt-6">
              <div className="w-12 h-12 bg-[#355C7D] rounded"></div>
              <div className="w-12 h-12 bg-[#2C4A63] rounded"></div>
              <div className="w-12 h-12 bg-[#1E3A4F] rounded"></div>
            </div>
          </div>

          {/* Right Column - Final Product */}
          <div className="w-full">
            <img
              src="https://source.unsplash.com/1200x900/?product,watch,studio"
              alt="Packshot - Project 002 Final"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
