'use client';

import React from 'react';
import DeviceFrame from '@/components/DeviceFrame';
import DemoNavigation from '@/components/DemoNavigation';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

export default function RestaurantDemoPage() {
  const { t } = useI18n();
  
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <DemoNavigation currentDemo="restaurant" currentDemoTitle="Restaurant Gastronomique" />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-6">
            {t('demos.restaurant.page.title')}
          </h1>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            {t('demos.restaurant.page.subtitle')}
          </p>
        </div>

        {/* Preview Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
              {t('demos.restaurant.page.preview')}
            </h2>
            
            {/* MacBook Frame with Restaurant Demo */}
            <div className="flex justify-center">
              <DeviceFrame type="macbook">
                <img 
                  src="/previews/restopre.jpg" 
                  alt="Restaurant demo preview"
                  className="w-full h-full object-cover"
                />
              </DeviceFrame>
            </div>

                    {/* Demo Info avec valeur business intégrée */}
        <div className="mt-8 text-center">
          <p className="text-[#4A4A4A] mb-6 leading-relaxed">
            {t('demos.restaurant.page.description')}
          </p>
          
          {/* Boutons CTA en premier */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/demo/restaurant"
              className="bg-[#2D5A27] text-white px-6 py-3 rounded-lg hover:bg-[#1F3D1C] transition-colors duration-150 font-semibold"
            >
              {t('demos.restaurant.page.viewDemo')}
            </Link>
            
            <Link
              href="/contact"
              className="border border-[#2D5A27] text-[#2D5A27] px-6 py-3 rounded-lg hover:bg-[#2D5A27] hover:text-white transition-colors duration-150 font-semibold"
            >
              {t('demos.restaurant.page.contactMe')}
            </Link>
          </div>
          
          {/* Valeur ajoutée discrète */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#FAF6F1] rounded-lg p-3 border border-[#E8E0D8]">
              <div className="text-lg font-bold text-[#2D5A27]">{t('demos.restaurant.page.features.design')}</div>
              <div className="text-xs text-[#666]">{t('demos.restaurant.page.features.designDesc')}</div>
            </div>
            <div className="bg-[#FAF6F1] rounded-lg p-3 border border-[#E8E0D8]">
              <div className="text-lg font-bold text-[#2D5A27]">{t('demos.restaurant.page.features.experience')}</div>
              <div className="text-xs text-[#666]">{t('demos.restaurant.page.features.experienceDesc')}</div>
            </div>
            <div className="bg-[#FAF6F1] rounded-lg p-3 border border-[#E8E0D8]">
              <div className="text-lg font-bold text-[#2D5A27]">{t('demos.restaurant.page.features.performance')}</div>
              <div className="text-xs text-[#666]">{t('demos.restaurant.page.features.performanceDesc')}</div>
            </div>
          </div>
          
          <p className="text-sm text-[#666] italic">
            {t('demos.restaurant.page.footer')}
          </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
