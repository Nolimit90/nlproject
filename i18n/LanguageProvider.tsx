'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface LanguageContextType {
  lang: 'fr' | 'en';
  setLang: (lang: 'fr' | 'en') => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}

// Dictionnaires statiques
const dictionaries = {
  en: {
    nav: {
      systems: "Systems",
      method: "Method",
      contact: "Contact",
      startProject: "Start a project"
    },
    hero: {
      title: "Websites that win customers",
      subtitle: "Modern websites. Built fast. Built to convert.",
      viewDemos: "View demos",
      contactMe: "Contact me"
    },
    demos: {
      title: "Our Systems in Action",
      subtitle: "Discover how we transform websites into conversion machines with strategy, design, and automation.",
      restaurant: {
        title: "Gastronomic Restaurant",
        description: "Elegant website for high-end restaurant",
        features: [
          "Clean and modern design",
          "Intuitive navigation",
          "Responsive layout"
        ],
        page: {
          title: "Gastronomic Restaurant",
          subtitle: "Elegant website for gastronomic restaurant with modern design and intuitive navigation",
          description: "This demo presents a complete website for gastronomic restaurant with all essential functionalities, designed to attract and convert your customers and offer a digital experience that reflects the excellence of your cuisine.",
          viewDemo: "View complete demo",
          contactMe: "Contact me",
          preview: "Preview",
          features: {
            design: "Design",
            designDesc: "Elegant and modern interface",
            experience: "Experience", 
            experienceDesc: "Intuitive mobile-first navigation",
            performance: "Performance",
            performanceDesc: "Smooth and optimized animations"
          },
          footer: "Refined gastronomic design • Performance optimized • Smooth animations • Technical support included"
        }
      },
      ecommerce: {
        title: "Premium E-commerce",
        description: "Online store with creative design",
        features: [
          "Modern user interface",
          "Advanced cart system",
          "Conversion optimized"
        ]
      },
      hotel: {
        title: "Luxury Hotel",
        description: "Premium booking experience for high-end hotel",
        features: [
          "Smooth booking interface",
          "Immersive visual gallery",
          "Conversion optimized"
        ]
      },
      corporate: {
        title: "Corporate Site",
        description: "Professional website for business",
        features: [
          "Professional design",
          "Well-structured sections",
          "Performance optimized"
        ]
      },
      viewDemo: "View demo",
      details: "Details"
    },
    benefits: {
      title: "Our Method: The 4-Tier System",
      subtitle: "A strategic approach that transforms your website into a profitable conversion machine.",
      architecture: {
        title: "01. Architecture (Strategy)",
        description: "We deconstruct your business to architect a clear message and conversion funnel that transforms visitors into clients."
      },
      engineering: {
        title: "02. Engineering (Design & Code)",
        description: "We build a frictionless, fast, and intuitive user experience where every design element serves the conversion objective."
      },
      automation: {
        title: "03. Automation (Freedom)",
        description: "We deploy tracking and follow-up systems that work for you 24/7, nurturing your prospects and maximizing your revenue."
      },
      ecosystem: {
        title: "04. Ecosystem (Applications)",
        description: "Your system doesn't stop at your website. We extend it into your customers' pockets with native iOS applications that create an immersive experience and build long-term loyalty."
      }
    },
    about: {
      title: "About / Process",
      description: "I'm Chris Henock, a developer in Paris. I blend clean design with marketing sense to build sites that turn visitors into customers.",
      additional: "I create clear, fast websites that focus on conversion and user experience. Every project is crafted with attention to detail and performance.",
      availability: {
        title: "Limited Availability",
        message: "Only 2 slots available this month"
      }
    },
    contact: {
      title: "Let's work together",
      subtitle: "Ready to transform your online presence? Let's discuss your project and create something amazing.",
      startProject: "Start a project",
      emailMe: "Email me",
      reassurance: "Replies within 24h. Let's make something great together."
    },
    footer: {
      branding: "NL Project - Clear. Fast. Impactful.",
      copyright: "© 2024 NL Project. All rights reserved."
    },
    mobileMenu: {
      responseTime: "Response within 24h"
    },
    language: {
      en: "EN",
      fr: "FR"
    }
  },
  fr: {
    nav: {
      systems: "Systèmes",
      method: "Méthode",
      contact: "Contact",
      startProject: "Démarrer un projet"
    },
    hero: {
      title: "Des sites web qui gagnent des clients",
      subtitle: "Sites web modernes. Construits rapidement. Construits pour convertir.",
      viewDemos: "Voir les demos",
      contactMe: "Me contacter"
    },
    demos: {
      title: "Nos Systèmes en Action",
      subtitle: "Découvrez comment nous transformons les sites web en machines à convertir avec stratégie, design et automatisation.",
      restaurant: {
        title: "Restaurant Gastronomique",
        description: "Site web élégant pour restaurant haut de gamme",
        features: [
          "Design épuré et moderne",
          "Navigation intuitive",
          "Mise en page responsive"
        ],
        page: {
          title: "Restaurant Gastronomique",
          subtitle: "Site web élégant pour restaurant gastronomique avec design moderne et navigation intuitive",
          description: "Cette démo présente un site web complet pour restaurant gastronomique avec toutes les fonctionnalités essentielles, conçu pour attirer et convertir vos clients et offrir une expérience digitale qui reflète l'excellence de votre cuisine.",
          viewDemo: "Voir la démo complète",
          contactMe: "Me contacter",
          preview: "Aperçu",
          features: {
            design: "Design",
            designDesc: "Interface élégante et moderne",
            experience: "Expérience",
            experienceDesc: "Navigation intuitive mobile-first",
            performance: "Performance",
            performanceDesc: "Animations fluides et optimisées"
          },
          footer: "Design gastronomique raffiné • Performance optimisée • Animations fluides • Support technique inclus"
        }
      },
      ecommerce: {
        title: "E-commerce Premium",
        description: "Boutique en ligne avec design créatif",
        features: [
          "Interface utilisateur moderne",
          "Système de panier avancé",
          "Optimisé pour la conversion"
        ]
      },
      hotel: {
        title: "Hôtel de Luxe",
        description: "Expérience de réservation premium pour hôtel haut de gamme",
        features: [
          "Interface de réservation fluide",
          "Galerie visuelle immersive",
          "Optimisé pour la conversion"
        ]
      },
      corporate: {
        title: "Site Corporate",
        description: "Site professionnel pour entreprise",
        features: [
          "Design professionnel",
          "Sections bien structurées",
          "Performance optimisée"
        ]
      },
      viewDemo: "Voir la demo",
      details: "Détails"
    },
    benefits: {
      title: "Notre Méthode : Le Système en 4 Paliers",
      subtitle: "Une approche stratégique qui transforme votre site en machine de conversion rentable.",
      architecture: {
        title: "01. Architecture (Stratégie)",
        description: "Nous déconstruisons votre business pour architecturer un message clair et un funnel de conversion qui transforme les visiteurs en clients."
      },
      engineering: {
        title: "02. Ingénierie (Design & Code)",
        description: "Nous construisons une expérience utilisateur sans friction, rapide et intuitive, où chaque élément de design sert l'objectif de conversion."
      },
      automation: {
        title: "03. Automation (Liberté)",
        description: "Nous déployons des systèmes de tracking et de relance qui travaillent pour vous 24/7, nourrissant vos prospects et maximisant votre revenu."
      },
      ecosystem: {
        title: "04. Écosystème (Applications)",
        description: "Votre système ne s'arrête pas à votre site. Nous le prolongeons dans la poche de vos clients avec des applications natives (iOS) qui créent une expérience immersive et fidélisent à long terme."
      }
    },
    about: {
      title: "À propos / Processus",
      description: "Je suis Chris Henock, développeur à Paris. Je mélange design épuré et sens marketing pour créer des sites qui transforment les visiteurs en clients.",
      additional: "Je crée des sites web clairs et rapides qui se concentrent sur la conversion et l'expérience utilisateur. Chaque projet est conçu avec attention aux détails et à la performance.",
      availability: {
        title: "Disponibilité limitée",
        message: "Seulement 2 créneaux disponibles ce mois-ci"
      }
    },
    contact: {
      title: "Travaillons ensemble",
      subtitle: "Prêt à transformer votre présence en ligne ? Discutons de votre projet et créons quelque chose d'incroyable.",
      startProject: "Démarrer un projet",
      emailMe: "M'envoyer un email",
      reassurance: "Réponse sous 24h. Créons quelque chose de génial ensemble."
    },
    footer: {
      branding: "NL Project - Clair. Rapide. Impactant.",
      copyright: "© 2024 NL Project. Tous droits réservés."
    },
    mobileMenu: {
      responseTime: "Réponse sous 24h"
    },
    language: {
      en: "EN",
      fr: "FR"
    }
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLangState] = useState<'fr' | 'en'>('fr'); // 🇫🇷 Défaut en français

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLang = localStorage.getItem('lang') as 'fr' | 'en';
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLangState(savedLang);
    }
    // Sinon, on garde 'fr' comme défaut
  }, []);

  const setLang = (newLang: 'fr' | 'en') => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (path: string): any => {
    const keys = path.split('.');
    let value: any = dictionaries[lang];
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path; // Fallback to key path
      }
    }
    
    return value; // Retourner la vraie valeur, pas seulement les strings
  };

  const contextValue: LanguageContextType = {
    lang,
    setLang,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
