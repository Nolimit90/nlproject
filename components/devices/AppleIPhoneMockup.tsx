import React from 'react';

interface AppleIPhoneMockupProps {
  children?: React.ReactNode;
  src?: string;
  className?: string;
}

export default function AppleIPhoneMockup({ children, src, className = '' }: AppleIPhoneMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[220px] ${className}`} aria-hidden="true">
      {/* Realistic iPhone Mockup */}
      <div className="relative w-full">
        
        {/* iPhone body */}
        <div className="relative w-full bg-gradient-to-b from-[#0B0B0B] to-[#111] rounded-[28px] p-2 shadow-xl">
          
          {/* Screen */}
          <div className="relative bg-black rounded-[24px] overflow-hidden aspect-[390/844]">
            {src ? (
              <img 
                src={src}
                alt="iPhone preview"
                className="w-full h-full object-cover"
              />
            ) : children || (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Screenshot</div>
              </div>
            )}
            
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[6%] h-[2.5%] bg-[#0B0B0B] rounded-full z-10">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full border border-gray-600"></div>
            </div>
          </div>
          
          {/* iPhone body details */}
          <div className="absolute inset-0 rounded-[28px] border border-black pointer-events-none"></div>
          
          {/* Side buttons */}
          <div className="absolute left-0 top-1/4 w-1 h-8 bg-black rounded-r-sm shadow-inner"></div>
          <div className="absolute left-0 top-1/2 w-1 h-8 bg-black rounded-r-sm shadow-inner"></div>
          <div className="absolute right-0 top-1/3 w-1 h-12 bg-black rounded-l-sm shadow-inner"></div>
          
          {/* Bottom speaker grille */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-black rounded-full"></div>
        </div>
        
        {/* Shadow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-black/20 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}

