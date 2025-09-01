import React from 'react';
import DeviceFrame from '@/components/DeviceFrame';
import DemoNavigation from '@/components/DemoNavigation';
import Link from 'next/link';

export default function HotelDemoPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <DemoNavigation currentDemo="hotel" currentDemoTitle="Hotel Aurora Bay" />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-6">
            Hotel Aurora Bay
          </h1>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            Site web professionnel pour hôtel de luxe avec design soigné et sections bien structurées
          </p>
        </div>

        {/* Preview Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
              Aperçu
            </h2>
            
            {/* iPad Frame with Hotel Demo */}
            <div className="flex justify-center">
              <DeviceFrame type="ipad">
                <img 
                  src="/previews/aurorabay.jpg" 
                  alt="Hotel demo preview"
                  className="w-full h-full object-cover"
                />
              </DeviceFrame>
            </div>

            {/* Demo Info avec valeur business intégrée */}
            <div className="mt-8 text-center">
              <p className="text-[#4A4A4A] mb-6 leading-relaxed">
                Cette démo présente un site web complet pour hôtel de luxe avec toutes les fonctionnalités essentielles, 
                conçu pour <strong>convertir vos visiteurs en clients</strong> et offrir une <strong>expérience utilisateur qui fidélise</strong>.
              </p>
              
              {/* Boutons CTA en premier */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/demo/hotel"
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
              
              {/* Valeur ajoutée discrète */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#FAF6F1] rounded-lg p-3 border border-[#E8E0D8]">
                  <div className="text-lg font-bold text-[#2D5A27]">Conversion</div>
                  <div className="text-xs text-[#666]">Système de réservation optimisé</div>
                </div>
                <div className="bg-[#FAF6F1] rounded-lg p-3 border border-[#E8E0D8]">
                  <div className="text-lg font-bold text-[#2D5A27]">Performance</div>
                  <div className="text-xs text-[#666]">Chargement ultra-rapide</div>
                </div>
                <div className="bg-[#FAF6F1] rounded-lg p-3 border border-[#E8E0D8]">
                  <div className="text-lg font-bold text-[#2D5A27]">Visibilité</div>
                  <div className="text-xs text-[#666]">SEO intégré et optimisé</div>
                </div>
              </div>
              
              <p className="text-sm text-[#666] italic">
                Expérience utilisateur premium • Interface intuitive • Support technique inclus • Maintenance continue
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
