'use client';

import { useEffect, useRef, useState } from 'react';

interface BackgroundVideoProps {
  videoSrc?: string;
  fallbackImage?: string;
}

export default function BackgroundVideo({ 
  videoSrc = "/go.mp4", 
  fallbackImage = "/hero-poster.jpg" 
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Define playVideo function inside useEffect to avoid dependency issues
    const playVideo = async (retryCount = 0) => {
      if (!videoRef.current) return;
      
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowFallback(false);
      } catch (error) {
        if (retryCount < 2) {
          setTimeout(() => playVideo(retryCount + 1), 500);
        } else {
          setVideoError(true);
          setShowFallback(true);
        }
      }
    };
    
    // Optimisations de performance
    video.preload = 'metadata';
    video.defaultPlaybackRate = 1.0;
    video.playbackRate = 1.0;
    video.loop = true;
    video.muted = true; // Obligatoire pour autoplay
    video.playsInline = true;
    
    const handleCanPlay = () => {
      setVideoLoaded(true);
      setShowFallback(false);
      playVideo();
    };
    
    const handleError = () => {
      setVideoError(true);
      setShowFallback(true);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
      setShowFallback(false);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }
    };
    
    video.addEventListener('canplay', handleCanPlay, { passive: true });
    video.addEventListener('error', handleError, { passive: true });
    video.addEventListener('play', handlePlay, { passive: true });
    video.addEventListener('pause', handlePause, { passive: true });
    video.addEventListener('ended', handleEnded, { passive: true });
    
    // Démarrage automatique avec délai
    const startTimer = setTimeout(() => {
      if (video.readyState >= 2) {
        playVideo();
      }
    }, 100);
    
    return () => {
      clearTimeout(startTimer);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []); // Empty dependency array since playVideo is now defined inside

  return (
    <>
      {/* Vidéo de fond go.mp4 plein écran */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="fixed inset-0 w-full h-full object-cover -z-10"
        style={{ 
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay sombre exact comme demandé pour la lisibilité */}
      <div 
        className="fixed inset-0 w-full h-full bg-black/60 -z-10"
        style={{ zIndex: 1 }}
      />
      
      {/* Overlay supplémentaire pour renforcer le contraste */}
      <div 
        className="fixed inset-0 w-full h-full bg-gradient-to-t from-black/20 via-transparent to-transparent -z-10"
        style={{ zIndex: 1 }}
      />

      {/* Fallback image si vidéo échoue */}
      {videoError && (
        <div 
          className="fixed inset-0 w-full h-full transition-opacity duration-300 ease-out opacity-100"
          style={{ zIndex: 2 }}
        >
          <img
            src={fallbackImage}
            alt="Hero background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Même overlay sombre sur l'image de fallback */}
          <div 
            className="absolute inset-0 w-full h-full bg-black/60"
            style={{ zIndex: 1 }}
          />
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/20 via-transparent to-transparent"
            style={{ zIndex: 1 }}
          />
        </div>
      )}
    </>
  );
}
