'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

export default function Method() {
  const { lang } = useI18n();

  const steps = [
    {
      number: '01',
      title: lang === 'fr' ? 'ARCHITECTURE' : 'ARCHITECTURE',
      description: lang === 'fr' 
        ? 'Déconstruire votre business pour bâtir une stratégie de conversion.'
        : 'Deconstruct your business to build a conversion strategy.'
    },
    {
      number: '02',
      title: lang === 'fr' ? 'INGÉNIERIE' : 'ENGINEERING',
      description: lang === 'fr'
        ? 'Designer un parcours client sans friction qui inspire confiance.'
        : 'Design a frictionless customer journey that inspires trust.'
    },
    {
      number: '03',
      title: lang === 'fr' ? 'AUTOMATION' : 'AUTOMATION',
      description: lang === 'fr'
        ? 'Déployer des systèmes qui travaillent pour vous 24/7.'
        : 'Deploy systems that work for you 24/7.'
    },
    {
      number: '04',
      title: lang === 'fr' ? 'ÉCOSYSTÈME' : 'ECOSYSTEM',
      description: lang === 'fr'
        ? 'Votre système ne s\'arrête pas à votre site. Nous le prolongeons dans la poche de vos clients avec des applications natives (iOS) qui créent une expérience immersive et fidélisent à long terme.'
        : 'Your system doesn\'t stop at your website. We extend it into your customers\' pockets with native iOS applications that create an immersive experience and build long-term loyalty.'
    }
  ];

  return (
    <section id="method" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Titre de section */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
            {lang === 'fr' ? 'La Méthode NL' : 'The NL Method'}
          </h2>
        </div>

        {/* Les 4 étapes - Layout horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="method-step flex flex-col items-start text-left group"
              style={{ 
                animationDelay: `${index * 0.2}s` 
              }}
            >
              {/* Numéro géant */}
              <div className="mb-8 relative">
                <span className="text-[120px] md:text-[140px] font-bold text-[#2D5A27] opacity-10 group-hover:opacity-20 transition-opacity duration-500 leading-none block">
                  {step.number}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] absolute bottom-0 left-0 tracking-wider">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mt-4">
                {step.description}
              </p>

              {/* Ligne décorative */}
              <div className="w-16 h-1 bg-[#2D5A27] mt-8 group-hover:w-24 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .method-step {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .method-step {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

