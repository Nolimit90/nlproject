'use client';

import { useEffect, useRef } from 'react';

export default function SimpleVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Force play the video
      const playVideo = async () => {
        try {
          await video.play();
          console.log('✅ Vidéo lancée avec succès');
        } catch (error) {
          console.log('❌ Erreur lancement vidéo:', error);
        }
      };

      // Try to play immediately
      playVideo();
      
      // Also try after a delay
      setTimeout(playVideo, 1000);
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
      <video
        ref={videoRef}
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
        <source src="/VIDEO/ec.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
        🎬 Vidéo de fond active
      </div>
      
      {/* Test overlay pour vérifier que la vidéo est bien en arrière-plan */}
      <div className="absolute top-20 left-4 bg-red-500/80 text-white p-2 rounded text-xs">
        🔴 Test overlay - Si vous voyez ceci, la vidéo est derrière
      </div>
    </div>
  );
}
