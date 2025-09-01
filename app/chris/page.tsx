'use client';

import BackgroundVideo from "@/components/BackgroundVideo";

export default function ChrisPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BackgroundVideo
        videoSrc="/VIDEO/go.mp4"
        fallbackImage="/pexels-googledeepmind-25626428.jpg"
      />
      
      {/* Hero Section avec CHRIS HENOCK WEB DEVELOPPER */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
              CHRIS HENOCK
            </h1>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-8 opacity-90">
              WEB DEVELOPPER
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl font-light tracking-wider mb-12 opacity-80 max-w-3xl mx-auto">
            Création de sites web modernes, rapides et sur-mesure
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg">
              Voir mes projets
            </button>
            <button className="border-2 border-white text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300 text-lg">
              Me contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}










