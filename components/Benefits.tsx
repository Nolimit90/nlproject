'use client';

import React from 'react';
import { Lightbulb, Code2, Zap } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function Benefits() {
  const { t } = useI18n();

  const benefits = [
    {
      icon: Lightbulb,
      key: 'architecture'
    },
    {
      icon: Code2,
      key: 'engineering'
    },
    {
      icon: Zap,
      key: 'automation'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            {t('benefits.subtitle')}
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
                  {t(`benefits.${benefit.key}.title`)}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {t(`benefits.${benefit.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
