import React from 'react';

interface AppleIMacMockupProps {
  children?: React.ReactNode;
  src?: string;
  className?: string;
}

export default function AppleIMacMockup({ children, src, className = '' }: AppleIMacMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[420px] ${className}`} aria-hidden="true">
      {/* Modern iMac 24" - Current Design */}
      <div className="relative w-full">
        
        {/* Main display - ultra-thin bezels, modern design */}
        <div className="relative w-full bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 rounded-3xl p-1 shadow-2xl">
          
          {/* Screen with visible border and traffic lights */}
          <div className="relative w-full bg-black rounded-2xl overflow-hidden aspect-[4/3] border-4 border-gray-700 shadow-inner">
            {/* Traffic lights - macOS style */}
            <div className="absolute top-2 left-3 z-10 flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            
            {src ? (
              <img 
                src={src}
                alt="iMac preview"
                className="w-full h-full object-cover scale-100"
              />
            ) : children || (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Screenshot</div>
              </div>
            )}
          </div>
          
          {/* Connection area - clearly part of the screen unit */}
          <div className="relative w-full mt-2 flex justify-center">
            {/* Apple logo in connection area */}
            <div className="w-20 h-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Modern stand - thin, elegant design */}
        <div className="relative w-full mt-2 flex justify-center">
          {/* Stand arm - thin and modern */}
          <div className="w-3 h-16 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-lg"></div>
        </div>
        
        {/* Stand base - wide, flat, modern */}
        <div className="relative w-full flex justify-center">
          <div className="w-32 h-2 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-full shadow-xl"></div>
        </div>
        
        {/* Subtle shadow for depth */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-2 bg-black/15 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}
