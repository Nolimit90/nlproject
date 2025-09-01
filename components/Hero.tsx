'use client';

import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

export default function Hero() {
  const { lang } = useI18n();

  return (
    <section className="pt-32 pb-24 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="heading-1 text-[clamp(48px,8vw,96px)] mb-8 text-[#1A1A1A]">
          {lang === 'fr' ? 'Développeur Web Créatif' : 'Creative Web Developer'}
        </h1>
        <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-3xl mx-auto mb-16 leading-relaxed">
          {lang === 'fr' 
            ? 'Je crée des sites web modernes et performants qui transforment votre vision en réalité digitale.'
            : 'I create modern and performant websites that transform your vision into digital reality.'
          }
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/#demos"
            className="group relative inline-flex items-center justify-center bg-[#2D5A27] text-white px-6 py-3 rounded-xl hover:rounded-2xl transition-all duration-300 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-[#FAF6F1] shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
          >
            <span className="relative z-10">
              {lang === 'fr' ? 'Voir la démo' : 'View demo'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl group-hover:rounded-2xl"></div>
          </Link>
          
          <Link
            href="/#contact"
            className="group relative inline-flex items-center justify-center bg-white/95 backdrop-blur-sm text-[#2D5A27] border border-[#2D5A27]/30 px-6 py-3 rounded-xl hover:rounded-2xl transition-all duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-[#FAF6F1] shadow-sm hover:shadow-md hover:-translate-y-0.5 transform hover:bg-[#2D5A27] hover:text-white hover:border-[#2D5A27]"
          >
            <span className="relative z-10">
              {lang === 'fr' ? 'Contact' : 'Contact'}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
