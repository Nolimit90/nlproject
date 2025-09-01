'use client';

export default function ColorfulVideo() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
      {/* Vidéo de test avec go.mp4 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      >
        <source src="/VIDEO/go.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      
      {/* Overlay coloré pour tester la visibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 pointer-events-none"></div>
      
      {/* Overlay de test avec des couleurs vives */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/30 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-500/30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/30 pointer-events-none"></div>
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
        🎬 Vidéo + Overlays colorés
      </div>
      
      {/* Test avec des couleurs de fond visibles */}
      <div className="absolute top-20 left-4 bg-red-500/80 text-white p-2 rounded text-xs">
        🔴 Zone rouge de test
      </div>
      
      <div className="absolute top-36 left-4 bg-green-500/80 text-white p-2 rounded text-xs">
        🟢 Zone verte de test
      </div>
      
      <div className="absolute top-52 left-4 bg-blue-500/80 text-white p-2 rounded text-xs">
        🔵 Zone bleue de test
      </div>
    </div>
  );
}
