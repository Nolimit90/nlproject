import React from 'react';

interface AppleMacBookProMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppleMacBookProMockup({ children, className = '' }: AppleMacBookProMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[420px] ${className}`} aria-hidden="true">
      {/* Apple MacBook Pro - Front View */}
      <div className="relative w-full bg-transparent">
        
        {/* Main chassis with ultra-thin bezels */}
        <div className="relative w-full bg-black rounded-xl p-1.5 shadow-xl">
          
          {/* Header band with traffic lights */}
          <div className="relative w-full h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg mb-1.5 flex items-center justify-start pl-2.5">
            {/* macOS traffic lights - Authentic Apple colors */}
            <div className="flex items-center space-x-1.5">
              {/* Red - Close */}
              <div className="w-2 h-2 bg-[#FF5F57] rounded-full shadow-inner"></div>
              {/* Yellow - Minimize */}
              <div className="w-2 h-2 bg-[#FEBC2E] rounded-full shadow-inner"></div>
              {/* Green - Maximize */}
              <div className="w-2 h-2 bg-[#28C840] rounded-full shadow-inner"></div>
            </div>
          </div>
          
          {/* Display area - 16:10 ratio */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-[16/10]">
            {children}
            
            {/* Center notch - shallow rounded rectangle */}
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-[16%] h-[7%] bg-black rounded-full z-10">
              {/* Camera lens */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Aluminum base with subtle gradient */}
        <div className="relative w-full h-4 bg-gradient-to-b from-gray-200 via-gray-250 to-gray-300 rounded-b-xl mt-1.5 shadow-lg">
          {/* Shadow gap below chin */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-400/30"></div>
        </div>
        
        {/* Floating drop shadow - soft and diffuse */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-black/15 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}
