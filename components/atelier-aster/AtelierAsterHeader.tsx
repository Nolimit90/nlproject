'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/atelier-aster/useCart';

export default function AtelierAsterHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemsCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Menu - Left */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors duration-200"
          >
            MENU
          </button>

          {/* Logo - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/demos/atelier-aster" className="text-2xl font-serif font-light tracking-widest text-black">
              ASTER
            </Link>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-6">
            <Link href="/demos/atelier-aster/contact" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors duration-200">
              YOUR PROJECT
            </Link>
            
            <button className="text-black hover:text-gray-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <Link href="/demos/atelier-aster/cart" className="relative text-black hover:text-gray-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Main Menu Flyout */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-sm">
            <nav className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4 tracking-wide">NAVIGATION</h3>
                  <ul className="space-y-3">
                    <li><Link href="/demos/atelier-aster" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">Home</Link></li>
                    <li><Link href="/demos/atelier-aster/shop" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">Shop</Link></li>
                    <li><Link href="/demos/atelier-aster/collections" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">Collections</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4 tracking-wide">CONTENT</h3>
                  <ul className="space-y-3">
                    <li><Link href="/demos/atelier-aster/journal" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">Journal</Link></li>
                    <li><Link href="/demos/atelier-aster/about" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">About</Link></li>
                    <li><Link href="/demos/atelier-aster/contact" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4 tracking-wide">PROJECTS</h3>
                  <ul className="space-y-3">
                    <li><Link href="/demos/atelier-aster/project-002" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">Project 002</Link></li>
                    <li><Link href="/demos/atelier-aster/project-003" className="text-lg text-black hover:text-gray-600 transition-colors duration-200">Project 003</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
