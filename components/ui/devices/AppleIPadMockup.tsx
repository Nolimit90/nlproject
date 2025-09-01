import React from 'react';

interface AppleIPadMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppleIPadMockup({ children, className = '' }: AppleIPadMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[360px] ${className}`} aria-hidden="true">
      {/* Apple iPad - Landscape Only */}
      <div className="relative w-full bg-transparent">
        
        {/* iPad frame with aluminum appearance */}
        <div className="relative w-full bg-gradient-to-b from-gray-200 via-gray-250 to-gray-300 rounded-2xl p-1.5 shadow-lg">
          
          {/* Display area - 4:3 ratio */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-[4/3]">
            {children}
            
            {/* Front camera hint - centered on landscape top edge */}
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-800 rounded-full z-10">
              {/* Camera lens */}
              <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Soft, even shadow */}
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-64 h-1.5 bg-black/15 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}






