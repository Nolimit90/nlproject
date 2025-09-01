'use client';

import Link from 'next/link';

export default function Project002Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Menu - Left */}
          <Link href="/eon" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors duration-200">
            MENU
          </Link>

          {/* Logo - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/eon" className="text-2xl font-serif font-light tracking-widest text-black">
              ALTER
            </Link>
          </div>

          {/* Your Project - Right */}
          <Link href="/eon/contact" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors duration-200">
            YOUR PROJECT
          </Link>
        </div>
      </div>
    </header>
  );
}
