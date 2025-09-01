import React from 'react';

interface AppleIPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppleIPhoneMockup({ children, className = '' }: AppleIPhoneMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[220px] ${className}`} aria-hidden="true">
      {/* Apple iPhone - Portrait Only */}
      <div className="relative w-full bg-transparent">
        
        {/* iPhone frame with stainless edge */}
        <div className="relative w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2rem] p-1.5 shadow-lg">
          
          {/* Display area - 19.5:9 ratio */}
          <div className="relative w-full bg-black rounded-[1.5rem] overflow-hidden aspect-[19.5/9]">
            {children}
            
            {/* Dynamic Island - centered pill */}
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-[6%] h-[8%] bg-black rounded-full z-10">
              {/* Camera lens */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
          
          {/* Side buttons hint - minimal */}
          <div className="absolute left-0 top-1/4 w-0.5 h-6 bg-black rounded-r-sm shadow-inner"></div>
          <div className="absolute right-0 top-1/3 w-0.5 h-8 bg-black rounded-l-sm shadow-inner"></div>
        </div>
        
        {/* Subtle body shadow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-black/20 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}






