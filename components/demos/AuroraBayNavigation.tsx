"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home } from 'lucide-react';

export default function AuroraBayNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-[#E8E0D8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et navigation */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/demos" 
              className="flex items-center text-[#2D5A27] hover:text-[#1F3D1C] transition-colors duration-150"
            >
              <Home size={20} className="mr-2" />
              <span className="font-semibold">Back to Demos</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1 text-sm text-[#666]">
              <span>/</span>
              <span className="text-[#1A1A1A] font-medium">
                AURORA BAY
              </span>
            </div>
          </div>

          {/* Logo Aurora Bay */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-[#1A1A1A]">
              feel good resort
            </h1>
            <div className="ml-3 text-2xl font-light text-[#2D5A27]">
              AURORA BAY
            </div>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E8E0D8]">
            <div className="px-4 py-6 space-y-4">
              <Link href="/demos" className="block text-[#4A4A4A] hover:text-[#1A1A1A] py-2">
                Back to Demos
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
