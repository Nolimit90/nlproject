'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

export default function FinalCTA() {
  const { lang } = useI18n();

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A] text-white relative overflow-hidden">
      {/* Effet de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2D5A27] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2D5A27] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Titre puissant */}
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {lang === 'fr' 
              ? 'Prêt à transformer votre coût en investissement ?' 
              : 'Ready to turn your cost into an investment?'
            }
          </h2>

          {/* Texte descriptif */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {lang === 'fr'
              ? 'Arrêtons de parler de "vision". Parlons de résultats. Réservez un audit stratégique et découvrons comment un système peut transformer votre business.'
              : 'Let\'s stop talking about "vision". Let\'s talk about results. Book a strategic audit and discover how a system can transform your business.'
            }
          </p>

          {/* CTA principal unique */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#2D5A27] text-white px-12 py-6 rounded-lg transition-all duration-300 text-lg font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(45,90,39,0.6)] hover:scale-105 transform uppercase tracking-wider border-2 border-[#2D5A27] hover:border-[#3a7332]"
          >
            <span className="relative z-10">
              {lang === 'fr' 
                ? '[ RÉSERVER MON AUDIT STRATÉGIQUE GRATUIT ]' 
                : '[ BOOK MY FREE STRATEGIC AUDIT ]'
              }
            </span>
          </Link>

          {/* Petite note de réassurance */}
          <p className="text-sm text-gray-400 mt-8">
            {lang === 'fr'
              ? '✓ Audit de 45 minutes • ✓ Sans engagement • ✓ Résultats concrets'
              : '✓ 45-minute audit • ✓ No commitment • ✓ Concrete results'
            }
          </p>
        </div>
      </div>
    </section>
  );
}

