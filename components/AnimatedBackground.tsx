'use client';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
      {/* Arrière-plan animé coloré au lieu de la vidéo invisible */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-pulse"></div>
      
      {/* Overlay avec animation */}
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent animate-pulse"></div>
      
      {/* Motifs animés */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/30 rounded-full animate-bounce"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 bg-red-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
        🎨 Arrière-plan animé coloré
      </div>
      
      {/* Test avec des couleurs de fond visibles */}
      <div className="absolute top-20 left-4 bg-red-500/80 text-white p-2 rounded text-xs">
        🔴 Arrière-plan visible
      </div>
      
      <div className="absolute top-36 left-4 bg-green-500/80 text-white p-2 rounded text-xs">
        🟢 Design avec couleurs
      </div>
      
      <div className="absolute top-52 left-4 bg-blue-500/80 text-white p-2 rounded text-xs">
        🔵 Plus de fond invisible !
      </div>
    </div>
  );
}
