import React from 'react';

interface AppleIPadMockupProps {
  children?: React.ReactNode;
  src?: string;
  className?: string;
}

export default function AppleIPadMockup({ children, src, className = '' }: AppleIPadMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[360px] ${className}`} aria-hidden="true">
      {/* iPad Pro - LANDSCAPE ONLY */}
      <div className="relative w-full bg-gradient-to-b from-[#0B0B0B] to-[#111] rounded-2xl p-2 shadow-xl">
        {/* Screen */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-[4/3]">
          {src ? (
            <img 
              src={src}
              alt="iPad preview"
              className="w-full h-full object-cover"
            />
          ) : children || (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-gray-400 text-sm">Screenshot</div>
            </div>
          )}
          
          {/* Front camera - centered on landscape top edge */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0B0B0B] rounded-b-sm z-10 border border-gray-600">
            <div className="absolute inset-0.5 bg-black rounded-b-sm"></div>
            {/* Camera lens */}
            <div className="absolute inset-1 bg-black rounded-full"></div>
          </div>
        </div>
        
        {/* iPad Pro Body Details - uniform black border */}
        <div className="absolute inset-0 rounded-2xl border border-black pointer-events-none"></div>
        
        {/* Side buttons */}
        <div className="absolute left-0 top-1/4 w-1 h-12 bg-black rounded-r-sm shadow-inner"></div>
        <div className="absolute right-0 top-1/3 w-1 h-16 bg-black rounded-l-sm shadow-inner"></div>
        
        {/* Top button */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-black rounded-b-sm shadow-inner"></div>
        
        {/* Bottom speaker grille */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-black rounded-full"></div>
        
        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-600 rounded-full opacity-60"></div>
      </div>
      
      {/* Subtle shadow */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-56 h-1 bg-black/20 rounded-full blur-sm"></div>
    </div>
  );
}
