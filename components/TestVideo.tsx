'use client';

export default function TestVideo() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
      {/* Test avec une vidéo simple et colorée */}
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
      
      {/* Overlay de test pour vérifier la visibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 pointer-events-none"></div>
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
        🎬 Test Vidéo de fond
      </div>
      
      {/* Test avec une couleur de fond visible */}
      <div className="absolute top-20 left-4 bg-red-500/80 text-white p-2 rounded text-xs">
        🔴 Si vous voyez ceci, la vidéo est derrière
      </div>
      
      {/* Test avec une couleur de fond visible */}
      <div className="absolute top-36 left-4 bg-green-500/80 text-white p-2 rounded text-xs">
        🟢 Test couleur verte
      </div>
    </div>
  );
}
