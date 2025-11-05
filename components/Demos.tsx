'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DeviceFrame from './DeviceFrame';
import { useI18n } from '@/hooks/useI18n';

export default function Demos() {
  const { t } = useI18n();



  // Définir les demos à l'intérieur du composant pour que t() fonctionne
  const demos = [
    {
      id: 'restaurant',
      title: t('demos.restaurant.title'),
      description: t('demos.restaurant.description'),
      features: t('demos.restaurant.features'),
      image: '/previews/restopre.jpg',
      caseStudyUrl: '/etude-de-cas/restaurant',
      device: 'macbook' as const
    },
    {
      id: 'hotel',
      title: t('demos.hotel.title'),
      description: t('demos.hotel.description'),
      features: t('demos.hotel.features'),
      image: '/previews/aurorabay.jpg',
      caseStudyUrl: '/etude-de-cas/hotel',
      device: 'ipad' as const
    }
  ];

  return (
    <section id="demos" className="py-20 bg-[#FAF6F1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">
            {t('demos.title')}
          </h2>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            {t('demos.subtitle')}
          </p>
        </div>

        {/* TODO: Pour chaque projet, ajouter 1-2 lignes décrivant le PROBLEME et le RESULTAT obtenu (ex: +30% de conversion). */}
        
        {/* Grille visuelle épurée et asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {demos.map((demo, index) => (
            <Link 
              key={demo.id} 
              href={demo.caseStudyUrl}
              className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform"
              style={{
                gridColumn: index === 0 ? 'span 1' : 'span 1'
              }}
            >
              {/* Grande image */}
              <div className="relative h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <DeviceFrame type={demo.device}>
                  {demo.image}
                </DeviceFrame>
              </div>
              
              {/* Contenu minimal superposé */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                {/* Tag de résultat */}
                <div className="inline-block mb-4">
                  <span className="bg-[#2D5A27] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    {demo.id === 'restaurant' ? '+42% CONVERSION' : 'AUTOMATION'}
                  </span>
                </div>
                
                {/* Nom du projet */}
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[#2D5A27] transition-colors">
                  {demo.title}
                </h3>
                
                {/* Description courte */}
                <p className="text-white/90 text-sm">
                  {demo.description}
                </p>
              </div>

              {/* Flèche d'action au hover */}
              <div className="absolute top-6 right-6 z-20 bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={24} className="text-[#2D5A27]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
