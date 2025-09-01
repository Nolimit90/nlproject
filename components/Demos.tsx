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
      demoUrl: '/demos/restaurant',
      device: 'macbook' as const
    },
    {
      id: 'hotel',
      title: t('demos.hotel.title'),
      description: t('demos.hotel.description'),
      features: t('demos.hotel.features'),
      image: '/previews/aurorabay.jpg',
      demoUrl: '/demos/hotel',
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

        {/* Responsive grid with equal heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demos.map((demo) => (
            <div key={demo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              {/* Device mockup */}
              <div className="p-6 pb-4">
                <div className="min-h-[200px] flex items-start justify-center">
                  <DeviceFrame type={demo.device}>
                    {demo.image}
                  </DeviceFrame>
                </div>
              </div>
              
              {/* Content section */}
              <div className="p-6 pt-0 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                  {demo.title}
                </h3>
                <p className="text-[#4A4A4A] mb-4">
                  {demo.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {Array.isArray(demo.features) ? demo.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-[#666]">
                      <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                      {feature}
                    </li>
                  )) : (
                    <li className="text-sm text-[#666]">Features non disponibles</li>
                  )}
                </ul>
                
                {/* CTA button */}
                <div className="mt-auto">
                  <Link
                    href={demo.demoUrl}
                    className="inline-flex items-center justify-center bg-[#2D5A27] text-white px-6 py-3 rounded-lg hover:bg-[#1F3D1C] transition-colors duration-150 font-semibold hover:translate-y-0.5 transition-transform"
                    aria-label={`View ${demo.title} demo`}
                  >
                    {t('demos.viewDemo')}
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
