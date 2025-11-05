'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function CaseStudyHotel() {
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
                ? 'Système de Conversion pour : Aurora Bay Hotel'
                : 'Conversion System for: Aurora Bay Hotel'
              }
            </h1>
            <p className="text-xl text-gray-300">
              {lang === 'fr'
                ? 'Comment nous avons augmenté les réservations directes de 38% en 3 mois'
                : 'How we increased direct bookings by 38% in 3 months'
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
                ? 'Aurora Bay dépendait trop des plateformes de réservation tierces (Booking, Expedia) qui prenaient 20% de commission. Leur site n\'inspirait pas confiance et le processus de réservation était complexe.'
                : 'Aurora Bay relied too heavily on third-party booking platforms (Booking, Expedia) which took 20% commission. Their website didn\'t inspire trust and the booking process was complex.'
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
                    ? 'Refonte complète de l\'expérience de réservation' 
                    : 'Complete booking experience overhaul',
                  description: lang === 'fr'
                    ? 'Interface visuelle immersive, calendrier en temps réel, prix dynamiques transparents'
                    : 'Immersive visual interface, real-time calendar, transparent dynamic pricing'
                },
                {
                  title: lang === 'fr' 
                    ? 'Système de confiance et de preuve sociale' 
                    : 'Trust and social proof system',
                  description: lang === 'fr'
                    ? 'Avis clients authentiques, galerie photo 360°, garantie satisfait ou remboursé'
                    : 'Authentic customer reviews, 360° photo gallery, satisfaction guarantee'
                },
                {
                  title: lang === 'fr' 
                    ? 'Automatisation du parcours client' 
                    : 'Customer journey automation',
                  description: lang === 'fr'
                    ? 'Emails de pré-arrivée, upsells automatisés, programme VIP personnalisé'
                    : 'Pre-arrival emails, automated upsells, personalized VIP program'
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold mb-4">+38%</div>
                <div className="text-xl">
                  {lang === 'fr' 
                    ? 'réservations directes' 
                    : 'direct bookings'
                  }
                </div>
              </div>
              <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold mb-4">-20%</div>
                <div className="text-xl">
                  {lang === 'fr' 
                    ? 'commissions tierces' 
                    : 'third-party commissions'
                  }
                </div>
              </div>
              <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold mb-4">+25%</div>
                <div className="text-xl">
                  {lang === 'fr' 
                    ? 'valeur moyenne séjour' 
                    : 'average stay value'
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
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <img 
                src="/previews/aurorabay.jpg" 
                alt="Aurora Bay Hotel Demo" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-12">
                <Link
                  href="/demo/hotel"
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


