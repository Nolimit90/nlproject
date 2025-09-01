'use client';

import { useEffect, useRef } from 'react';

export default function VideoTest() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      console.log('🎬 VideoTest: Component mounted');
      
      const handleLoadStart = () => console.log('🎬 Load start');
      const handleLoadedMetadata = () => console.log('🎬 Metadata loaded');
      const handleCanPlay = () => console.log('🎬 Can play');
      const handlePlay = () => console.log('🎬 Playing');
      const handleError = (e: any) => console.log('❌ Video error:', e);
      const handleLoad = () => console.log('🎬 Loaded');
      
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('play', handlePlay);
      video.addEventListener('error', handleError);
      video.addEventListener('load', handleLoad);
      
      // Try to play
      video.play().then(() => {
        console.log('✅ Video started successfully');
      }).catch((error) => {
        console.log('❌ Play failed:', error);
      });
      
      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
      {/* Test direct avec go.mp4 */}
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
      
      {/* Debug info simple */}
      <div className="absolute top-4 left-4 bg-black/90 text-white p-4 rounded text-xs">
        <div className="font-bold mb-2">🎬 Test Vidéo go.mp4</div>
        <div>📁 Source: /VIDEO/go.mp4</div>
        <div>🔍 Vérifiez la console pour les logs</div>
        <div className="mt-2 text-yellow-400">
          Si la vidéo est invisible, regardez la console !
        </div>
      </div>
      
      {/* Test avec une couleur de fond visible */}
      <div className="absolute top-32 left-4 bg-red-500/80 text-white p-2 rounded text-xs">
        🔴 Test couleur rouge
      </div>
    </div>
  );
}
