'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EonHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/eon" className="text-2xl font-light tracking-widest text-white hover:text-gold transition-colors duration-300">
            ÉON
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link href="/eon/shop" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              SHOP
            </Link>
            <Link href="/eon/collections" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              COLLECTIONS
            </Link>
            <Link href="/eon/about" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              ABOUT
            </Link>
            <Link href="/eon/contact" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              CONTACT
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button className="text-white/80 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-white/80 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="text-white/80 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link href="/eon/shop" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
                SHOP
              </Link>
              <Link href="/eon/collections" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
                COLLECTIONS
              </Link>
              <Link href="/eon/about" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
                ABOUT
              </Link>
              <Link href="/eon/contact" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
                CONTACT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
