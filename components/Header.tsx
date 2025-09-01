'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import AvailabilityPill from './AvailabilityIndicator';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import ParisTimeDisplay from './ParisTimeDisplay';
import { useI18n } from '@/hooks/useI18n';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { lang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/#demos', label: lang === 'fr' ? 'Démos' : 'Demos' },
    { href: '/#benefits', label: lang === 'fr' ? 'Pourquoi me choisir' : 'Why choose me' },
    { href: '/#about', label: lang === 'fr' ? 'À propos' : 'About' },
    { href: '/#contact', label: lang === 'fr' ? 'Contact' : 'Contact' }
  ];

  // Gestion du scroll pour l'ombre
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };



  // Ne pas afficher le header sur les pages de démo (APRÈS tous les Hooks)
  if (pathname?.startsWith('/demo/')) {
    return null;
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-[#FAF6F1]/95 backdrop-blur-sm border-b border-[#E8E0D8]/50 transition-all duration-200 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header (≥1024px) */}
          <div className="hidden lg:flex items-center justify-between h-16">
            {/* Zone gauche - Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-[#1A1A1A] hover:text-[#2D5A27] transition-colors duration-150"
              >
                NL Project
              </Link>
            </div>

            {/* Zone centre - Horloge Paris */}
            <div className="flex items-center justify-center">
              <ParisTimeDisplay />
            </div>

            {/* Zone droite - Navigation + CTA + Langue + Disponibilité */}
            <div className="flex items-center space-x-8">
              {/* Navigation links */}
              <nav className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[#4A4A4A] hover:text-[#2D5A27] transition-colors duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-[#FAF6F1]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <Link
                href="/#contact"
                className="bg-[#2D5A27] text-white px-4 py-2 rounded-lg hover:bg-[#1F3D1C] transition-colors duration-150 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-[#FAF6F1]"
              >
                {lang === 'fr' ? 'Démarrer un projet' : 'Start your project'}
              </Link>

              {/* Sélecteur de langue */}
              <LanguageSwitcher />

              {/* Badge de disponibilité */}
              <AvailabilityPill variant="header" />
            </div>
          </div>

          {/* Mobile Header (<1024px) */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between h-14">
              {/* Gauche - Logo */}
              <Link href="/" className="text-lg font-bold text-[#1A1A1A]">
                NL Project
              </Link>
              
              {/* Droite - Bouton de langue + Menu */}
              <div className="flex items-center space-x-3">
                <LanguageSwitcher />
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-[#4A4A4A] hover:text-[#2D5A27] transition-colors duration-150 rounded-lg hover:bg-[#E8E0D8]/50 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:ring-opacity-50"
                  aria-label="Ouvrir le menu de navigation"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
