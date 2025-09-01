import React from 'react';
import DeviceFrame from '@/components/DeviceFrame';
import DemoNavigation from '@/components/DemoNavigation';
import Link from 'next/link';

export default function EcommerceDemoPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <DemoNavigation currentDemo="ecommerce" currentDemoTitle="E-commerce Nike x Patta" />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-6">
            E-commerce Nike x Patta
          </h1>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            Boutique en ligne mobile-first optimisée pour la conversion avec interface moderne et système de panier avancé
          </p>
        </div>

        {/* Preview Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
              Aperçu
            </h2>
            
            {/* iPhone Frame with E-commerce Demo */}
            <div className="flex justify-center">
              <DeviceFrame type="iphone">
                <img 
                  src="/ecommerce/hero-banner.jpg" 
                  alt="E-commerce demo preview"
                  className="w-full h-full object-cover"
                />
              </DeviceFrame>
            </div>

            {/* Demo Info */}
            <div className="mt-8 text-center">
              <p className="text-[#4A4A4A] mb-4">
                Cette démo présente une boutique en ligne complète avec toutes les fonctionnalités e-commerce essentielles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/demo/ecommerce"
                  className="bg-[#2D5A27] text-white px-6 py-3 rounded-lg hover:bg-[#1F3D1C] transition-colors duration-150 font-semibold"
                >
                  Voir la démo complète
                </Link>
                
                <Link
                  href="/contact"
                  className="border border-[#2D5A27] text-[#2D5A27] px-6 py-3 rounded-lg hover:bg-[#2D5A27] hover:text-white transition-colors duration-150 font-semibold"
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
