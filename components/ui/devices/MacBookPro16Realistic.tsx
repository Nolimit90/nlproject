import React from 'react';

interface MacBookPro16RealisticProps {
  children: React.ReactNode;
  className?: string;
}

export default function MacBookPro16Realistic({ children, className = '' }: MacBookPro16RealisticProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[420px] ${className}`} aria-hidden="true">
      {/* MacBook Pro moderne - Vue frontale */}
      <div className="relative w-full bg-transparent">
        
        {/* MacBook Pro Mockup Réel - Identique à l'image */}
        <div className="relative w-full bg-transparent">
          
          {/* Écran principal - Ratio MacBook Pro 16:10 */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-[16/10] shadow-lg">
            {children}
            
            {/* Notch - Simple et discret comme dans l'image */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-black rounded-full z-10">
              {/* Caméra - Point simple */}
              <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Base MacBook Pro - Zone clavier/trackpad sombre */}
        <div className="relative w-full h-6 bg-gray-800 rounded-b-lg mt-1 shadow-md">
          {/* Séparation subtile entre écran et base */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-700"></div>
          
          {/* Finition métallique sombre */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg"></div>
        </div>
        
        {/* Ombre douce - Identique au mockup réel */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-black/20 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}
