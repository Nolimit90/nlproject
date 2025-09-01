export default function AtelierAsterDuoImages() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Two Images Side by Side - No Borders, No Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Image - Macro Watch */}
          <div className="w-full">
            <img
              src="https://source.unsplash.com/1200x900/?watch,macro"
              alt="Macro cadran - Détail de précision"
              className="w-full h-auto object-cover"
            />
            <p className="text-sm text-gray-600 mt-4 text-center font-light">
              Détail de précision du cadran
            </p>
          </div>
          
          {/* Right Image - Steel Bracelet */}
          <div className="w-full">
            <img
              src="https://source.unsplash.com/1200x900/?watch,steel"
              alt="Bracelet acier - Finition premium"
              className="w-full h-auto object-cover"
            />
            <p className="text-sm text-gray-600 mt-4 text-center font-light">
              Finition premium du bracelet acier
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
