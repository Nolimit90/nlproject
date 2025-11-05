'use client';

import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import '../app/hero-styles.css';

export default function Hero() {
  const { lang } = useI18n();

  return (
    <section className="pt-32 pb-32 min-h-[85vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Titre H1 puissant */}
        <h1 className="heading-1 text-[clamp(42px,7vw,84px)] mb-16 text-[#1A1A1A] leading-[1.1] max-w-5xl mx-auto">
          {lang === 'fr' ? 'On ne crée plus de sites. On construit des systèmes qui vendent.' : 'We don\'t just build websites. We build systems that sell.'}
        </h1>

        {/* Logo monogramme avec animation */}
        <div className="logo-hero-container mb-20">
          <img 
            src="/hero-logo.png"
            alt="NL Project"
            width={180}
            height={180}
            className="logo-hero"
          />
        </div>
        
        {/* CTAs avec espacement luxueux */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
          <Link
            href="/#demos"
            className="group relative inline-flex items-center justify-center bg-[#2D5A27] text-white px-8 py-4 rounded-lg transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform uppercase tracking-wider"
          >
            <span className="relative z-10">
              {lang === 'fr' ? '[ VOIR NOS SYSTÈMES ]' : '[ VIEW OUR SYSTEMS ]'}
            </span>
          </Link>
          
          <Link
            href="/audit-systeme"
            className="group relative inline-flex items-center justify-center bg-white text-[#2D5A27] border-2 border-[#2D5A27] px-8 py-4 rounded-lg transition-all duration-300 text-base font-semibold shadow-md hover:shadow-lg hover:bg-[#2D5A27] hover:text-white hover:scale-105 transform uppercase tracking-wider"
          >
            <span className="relative z-10">
              {lang === 'fr' ? '[ TÉLÉCHARGER LA CHECKLIST ]' : '[ DOWNLOAD CHECKLIST ]'}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
