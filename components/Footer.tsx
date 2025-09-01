'use client';

import { useI18n } from '@/hooks/useI18n';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const { lang } = useI18n();
  const pathname = usePathname();

  // Ne pas afficher le footer sur les pages de démo
  if (pathname?.startsWith('/demo/')) {
    return null;
  }

  const footerLinks = [
    { href: '/#demos', label: lang === 'fr' ? 'Démos' : 'Demos' },
    { href: '/#why', label: lang === 'fr' ? 'Pourquoi moi' : 'Why me' },
    { href: '/#about', label: lang === 'fr' ? 'À propos' : 'About' },
    { href: '/#contact', label: lang === 'fr' ? 'Contact' : 'Contact' }
  ];

  return (
    <footer className="bg-[#F2EDE9] text-[#1A1A1A] py-16 border-t border-[#E8E0D8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <p className="text-lg font-semibold text-[#1A1A1A]">
              NL Project
            </p>
            <p className="text-sm text-[#4A4A4A] mt-2">
              {lang === 'fr' ? '© 2024 NL Project. Tous droits réservés.' : '© 2024 NL Project. All rights reserved.'}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <a className="text-[#4A4A4A] hover:text-[#2D5A27] transition-colors font-medium" href="/#demos">{lang === 'fr' ? 'Démos' : 'Demos'}</a>
            <a className="text-[#4A4A4A] hover:text-[#2D5A27] transition-colors font-medium" href="/#why">{lang === 'fr' ? 'Pourquoi moi' : 'Why me'}</a>
            <a className="text-[#4A4A4A] hover:text-[#2D5A27] transition-colors font-medium" href="/#about">{lang === 'fr' ? 'À propos' : 'About'}</a>
            <a className="text-[#4A4A4A] hover:text-[#2D5A27] transition-colors font-medium" href="/#contact">{lang === 'fr' ? 'Contact' : 'Contact'}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
