'use client';

import { useI18n } from '@/hooks/useI18n';

export default function About() {
  const { lang } = useI18n();

  // Social links removed for now
  const socialLinks = [];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 text-[#1A1A1A] mb-8">
            {lang === 'fr' ? 'À propos de moi' : 'About me'}
          </h2>
          
          <div className="prose prose-lg mx-auto mb-12">
            <p className="text-xl text-[#4A4A4A] leading-relaxed mb-6">
              {lang === 'fr' 
                ? 'Développeur web passionné avec une expertise en création de sites modernes et performants.'
                : 'Passionate web developer with expertise in creating modern and performant websites.'
              }
            </p>
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              {lang === 'fr'
                ? 'Je combine créativité et technique pour livrer des solutions web exceptionnelles.'
                : 'I combine creativity and technical expertise to deliver exceptional web solutions.'
              }
            </p>
          </div>

          {/* Availability Section */}
          <div className="bg-[#FAF6F1] rounded-xl p-8 border border-[#E8E0D8] mb-12">
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
              {lang === 'fr' ? 'Disponibilité' : 'Availability'}
            </h3>
            <p className="text-[#4A4A4A]">
              {lang === 'fr'
                ? 'Actuellement disponible pour de nouveaux projets. Contactez-moi pour discuter de votre vision.'
                : 'Currently available for new projects. Contact me to discuss your vision.'
              }
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A4A4A] hover:text-[#2D5A27] transition-colors p-2 rounded-lg hover:bg-[#E8E0D8]/50"
                aria-label={social.name}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
