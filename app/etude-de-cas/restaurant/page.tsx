'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function CaseStudyRestaurant() {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-[#2D5A27] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider">
                {lang === 'fr' ? 'ÉTUDE DE CAS' : 'CASE STUDY'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              {lang === 'fr' 
                ? 'Système de Conversion pour : L\'Atelier du Chef'
                : 'Conversion System for: L\'Atelier du Chef'
              }
            </h1>
            <p className="text-xl text-gray-300">
              {lang === 'fr'
                ? 'Comment nous avons transformé un site vitrine en machine de réservation automatisée'
                : 'How we transformed a showcase website into an automated booking machine'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Le Défi */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-8">
              {lang === 'fr' ? 'Le Défi' : 'The Challenge'}
            </h2>
            <p className="text-2xl text-[#4A4A4A] leading-relaxed">
              {lang === 'fr'
                ? 'L\'Atelier du Chef avait un site magnifique mais un taux de réservation faible et aucune stratégie de fidélisation. Les clients potentiels visitaient le site mais abandonnaient avant de réserver.'
                : 'L\'Atelier du Chef had a beautiful website but a low booking rate and no loyalty strategy. Potential customers visited the site but left before booking.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Le Système NL Déployé */}
      <section className="py-20 bg-[#FAF6F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-12">
              {lang === 'fr' ? 'Le Système NL Déployé' : 'The NL System Deployed'}
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: lang === 'fr' 
                    ? 'Optimisation du tunnel de réservation' 
                    : 'Booking funnel optimization',
                  description: lang === 'fr'
                    ? 'Réduction de 7 étapes à 3 étapes, formulaire pré-rempli, confirmation instantanée'
                    : 'Reduced from 7 steps to 3 steps, pre-filled form, instant confirmation'
                },
                {
                  title: lang === 'fr' 
                    ? 'Création d\'un programme de fidélité automatisé' 
                    : 'Automated loyalty program creation',
                  description: lang === 'fr'
                    ? 'Système de points automatique, emails de bienvenue personnalisés, offres exclusives'
                    : 'Automatic points system, personalized welcome emails, exclusive offers'
                },
                {
                  title: lang === 'fr' 
                    ? 'Campagnes de relance par email' 
                    : 'Email follow-up campaigns',
                  description: lang === 'fr'
                    ? 'Séquences automatisées post-visite, rappels de réservation, offres saisonnières'
                    : 'Automated post-visit sequences, booking reminders, seasonal offers'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex gap-6 p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#2D5A27] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-lg text-[#4A4A4A]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Les Résultats */}
      <section className="py-20 bg-[#2D5A27] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">
              {lang === 'fr' ? 'Les Résultats' : 'The Results'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold mb-4">+42%</div>
                <div className="text-xl">
                  {lang === 'fr' 
                    ? 'de réservations en ligne' 
                    : 'online bookings'
                  }
                </div>
              </div>
              <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold mb-4">+15%</div>
                <div className="text-xl">
                  {lang === 'fr' 
                    ? 'de clients récurrents' 
                    : 'returning customers'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La Preuve Visuelle */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-12 text-center">
              {lang === 'fr' ? 'Aperçu du Système' : 'System Preview'}
            </h2>
            
            {/* Preview visuel avec image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <img 
                src="/previews/restopre.jpg" 
                alt="L'Atelier du Chef Demo" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-12">
                <Link
                  href="/demo/restaurant"
                  className="inline-flex items-center justify-center bg-[#2D5A27] text-white px-10 py-5 rounded-lg transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transform uppercase tracking-wider"
                >
                  <span className="relative z-10">
                    {lang === 'fr' 
                      ? '[ VOIR LE SYSTÈME EN ACTION ]' 
                      : '[ SEE THE SYSTEM IN ACTION ]'
                    }
                  </span>
                  <ArrowRight size={24} className="ml-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


