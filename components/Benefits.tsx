'use client';

import React from 'react';
import { Smartphone, Palette, TrendingUp } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function Benefits() {
  const { lang } = useI18n();

  const benefits = [
    {
      icon: Smartphone,
      title: lang === 'fr' ? 'Design Mobile-First' : 'Mobile-First Design',
      description: lang === 'fr' 
        ? 'Sites optimisés pour tous les appareils, avec une expérience utilisateur fluide sur mobile et desktop.'
        : 'Sites optimized for all devices, with smooth user experience on mobile and desktop.'
    },
    {
      icon: Palette,
      title: lang === 'fr' ? 'Design Moderne' : 'Modern Design',
      description: lang === 'fr'
        ? 'Interfaces élégantes et contemporaines qui reflètent l\'identité de votre marque.'
        : 'Elegant and contemporary interfaces that reflect your brand identity.'
    },
    {
      icon: TrendingUp,
      title: lang === 'fr' ? 'Conversion Optimisée' : 'Conversion Optimized',
      description: lang === 'fr'
        ? 'Stratégies UX/UI conçues pour maximiser l\'engagement et les conversions.'
        : 'UX/UI strategies designed to maximize engagement and conversions.'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">
            {lang === 'fr' ? 'Pourquoi me choisir ?' : 'Why choose me?'}
          </h2>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            {lang === 'fr'
              ? 'Une approche centrée sur l\'utilisateur pour des résultats exceptionnels'
              : 'A user-centered approach for exceptional results'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-8 bg-[#FAF6F1] rounded-2xl h-full"
                style={{ minHeight: '300px' }}
              >
                <div className="w-16 h-16 bg-[#2D5A27] rounded-full flex items-center justify-center mb-6">
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                  {benefit.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
