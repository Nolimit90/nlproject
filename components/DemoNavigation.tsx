import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

interface DemoNavigationProps {
  currentDemo: string;
  currentDemoTitle: string;
}

export default function DemoNavigation({ currentDemo, currentDemoTitle }: DemoNavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et navigation */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex items-center text-[#2D5A27] hover:text-[#1F3D1C] transition-colors duration-150"
            >
              <Home size={20} className="mr-2" />
              <span className="font-semibold">NL Project</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1 text-sm text-[#666]">
              <span>/</span>
              <Link 
                href="/demos" 
                className="text-[#2D5A27] hover:text-[#1F3D1C] transition-colors duration-150"
              >
                Démos
              </Link>
              <span>/</span>
              <span className="text-[#1A1A1A] font-medium">{currentDemoTitle}</span>
            </div>
          </div>

          {/* Bouton retour */}
          <Link 
            href="/demos" 
            className="inline-flex items-center text-[#2D5A27] hover:text-[#1F3D1C] transition-colors duration-150"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux démos
          </Link>
        </div>
      </div>
    </nav>
  );
}
