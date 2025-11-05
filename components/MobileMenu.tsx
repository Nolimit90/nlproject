'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import ParisTimeDisplay from './ParisTimeDisplay';
import LanguageSwitcher from './LanguageSwitcher';
import AvailabilityPill from './AvailabilityIndicator';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { lang } = useI18n();

  const navLinks = [
    { href: '/#demos', label: lang === 'fr' ? 'Systèmes' : 'Systems' },
    { href: '/#method', label: lang === 'fr' ? 'Méthode' : 'Method' }
  ];

  // Fermer le menu avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Empêcher le scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap pour l'accessibilité
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu drawer */}
      <div 
        ref={menuRef}
        className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-[#FAF6F1]/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {/* Header du menu */}
        <div className="flex items-center justify-between p-6 border-b border-[#2D5A27]/20">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#4A4A4A] hover:text-[#2D5A27] transition-colors rounded-lg hover:bg-[#2D5A27]/10"
            aria-label="Fermer le menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenu du menu */}
        <div className="flex flex-col h-full">
          {/* Section horloge et disponibilité */}
          <div className="p-6 border-b border-[#2D5A27]/20">
            <div className="flex flex-col items-center space-y-4">
              {/* Heure de Paris */}
              <div className="bg-[#2D5A27]/10 border border-[#2D5A27]/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-[#2D5A27] uppercase tracking-wide">
                  PARIS · {new Date().toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZone: 'Europe/Paris'
                  })} CET
                </span>
              </div>
              
              {/* Disponibilité */}
              <AvailabilityPill variant="mobile" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block text-lg text-[#4A4A4A] hover:text-[#2D5A27] transition-colors font-medium py-3 border-b border-[#2D5A27]/20 last:border-b-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA en bas */}
          <div className="p-6 border-t border-[#2D5A27]/20">
            <Link
              href="/#contact"
              onClick={onClose}
              className="block w-full bg-[#2D5A27] text-white px-6 py-4 rounded-lg hover:bg-[#1F3D1C] transition-colors text-lg font-semibold text-center"
            >
              {lang === 'fr' ? 'Démarrer un projet' : 'Start your project'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
