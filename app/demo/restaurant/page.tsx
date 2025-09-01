'use client';

import { useState, useEffect } from 'react';

export default function RestaurantDemo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Optimisation pour mobile : désactiver le scroll sur le body quand le menu est ouvert
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset'; // Nettoyer au démontage
    };
  }, [isMobileMenuOpen]);

  // Optimisation du chargement des images
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/restaurant/optimized/hero-1920w.webp',
        '/restaurant/optimized/story-1920w.webp',
        '/restaurant/optimized/band-1920w.webp',
        '/restaurant/optimized/entree-1920w.webp',
        '/restaurant/optimized/dessert-1920w.webp'
      ];

      try {
        await Promise.all(
          imageUrls.map(url => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = url;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        setImagesLoaded(true); // Continuer même si certaines images échouent
      }
    };

    preloadImages();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    // Fermer le menu mobile immédiatement
    setIsMobileMenuOpen(false);
    
    // Attendre un peu que le menu se ferme avant de scroller
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculer la position avec offset pour le header fixe
        const headerHeight = window.innerWidth < 768 ? 64 : 80; // Hauteur adaptative selon l'écran
        const elementPosition = element.offsetTop - headerHeight;
        
        // Scroll fluide vers la section avec fallback pour les navigateurs qui ne supportent pas smooth
        try {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } catch (error) {
          // Fallback pour les navigateurs plus anciens
          window.scrollTo(0, elementPosition);
        }
      }
    }, 100);
  };

  const showPhoneNumber = () => {
    const phoneNumber = '33 1 42 78 90 12';
    
    // Détecter si c'est un appareil mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Sur mobile : lancer l'appel téléphonique directement
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // Sur desktop : afficher le numéro et proposer de copier
      if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
          alert(`📞 Numéro copié dans le presse-papiers : ${phoneNumber}\n\nVous pouvez maintenant l'utiliser pour appeler !`);
        });
      } else {
        alert(`📞 Appelez-nous au : ${phoneNumber}`);
      }
    }
  };

  // Afficher un loader pendant le chargement des images
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2D5A27] mx-auto mb-4"></div>
          <p className="text-[#2D5A27] font-light">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header gastronomique français avec complexité technique */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-[12px] shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="relative flex items-center h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24">
            {/* À GAUCHE : Navigation gastronomique mobile-first */}
            <div className="flex items-start pt-2 lg:pt-4 z-10">
              {/* Logo minimaliste sur mobile */}
              <div className="flex items-center space-x-2 sm:hidden">
                <span className="text-sm font-bold text-white">L'Atelier</span>
              </div>
              
              {/* Navigation desktop avec animations */}
              <div className="hidden lg:flex items-center space-x-8">
                {[
                  { href: '#accueil', label: 'ACCUEIL' },
                  { href: '#histoire', label: 'HISTOIRE' },
                  { href: '#menu', label: 'MENU' },
                  { href: '#contact', label: 'CONTACT' }
                ].map((item) => (
                  <div key={item.href} className="relative group">
                    <button 
                      onClick={() => scrollToSection(item.href.slice(1))}
                      className={`text-[14px] font-light tracking-[0.2em] transition-colors duration-200 hover:text-stone-200 ${
                        isScrolled ? 'text-white/90' : 'text-white/80'
                      }`} 
                      style={{ fontVariantCaps: 'all-small-caps' }}
                    >
                      {item.label}
                    </button>
                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-stone-200 group-hover:w-full transition-all duration-300 ease-out"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTRE : Logo principal parfaitement centré */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="hidden sm:block text-center">
                <h1 className={`text-lg sm:text-xl font-bold transition-transform duration-200 ${
                  isScrolled ? 'text-white scale-95' : 'text-white scale-100'
                }`}>L'Atelier du Chef</h1>
                <p className={`text-xs transition-transform duration-200 ${
                  isScrolled ? 'text-white/60 scale-90' : 'text-white/70 scale-100'
                }`}>Excellence gastronomique</p>
              </div>
              </div>
              
            {/* À DROITE : Actions avec complexité technique */}
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 ml-auto z-10">
              {/* Bouton réservation avec animation */}
              <div className="hidden sm:block">
                <button 
                  onClick={showPhoneNumber}
                  className={`group relative px-4 sm:px-6 py-2 sm:py-3 border border-white/30 text-white hover:border-stone-200 transition-colors duration-200 overflow-hidden ${
                    isScrolled ? 'bg-white/10' : 'bg-transparent'
                  }`}
                >
                  <span className="relative z-10 text-xs sm:text-sm font-light tracking-[0.15em] transition-all duration-300 group-hover:text-stone-200">
                    RÉSERVER
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-600/20 to-stone-800/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
              </button>
            </div>

              {/* Menu mobile avec animation */}
              <button 
                onClick={toggleMobileMenu}
                className={`relative p-2 transition-all duration-300 hover:scale-110 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                  <span className={`block w-5 h-px bg-current transition-transform duration-200 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}></span>
                  <span className={`block w-5 h-px bg-current transition-opacity duration-200 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`block w-5 h-px bg-current transition-transform duration-200 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile transparent avec backdrop-blur sophistiqué */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-opacity duration-300" onClick={toggleMobileMenu}>
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 lg:w-[450px] bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl transition-transform duration-300 transform translate-x-0" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 h-full flex flex-col overflow-y-auto">
              {/* Header avec logo transparent */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-stone-600/80 to-stone-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">L'Atelier du Chef</h2>
                    <p className="text-xs text-white/70 font-light">Menu de navigation</p>
                  </div>
                </div>
                <button 
                  onClick={toggleMobileMenu}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-all duration-200 rounded-full border border-white/20 touch-manipulation"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation simplifiée et élégante */}
              <nav className="flex-1 space-y-6">
                <div className="space-y-3">
                  {[
                    { href: '#accueil', label: 'Accueil', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                    { href: '#histoire', label: 'Notre Histoire', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                    { href: '#menu', label: 'Menu', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01' }
                  ].map((item) => (
                                          <button 
                        key={item.href}
                        onClick={() => scrollToSection(item.href.slice(1))}
                        className="group relative w-full text-left py-4 px-6 text-white/80 hover:text-white active:text-white/90 transition-all duration-200 cursor-pointer touch-manipulation"
                      >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                            </svg>
                          </div>
                          <div className="font-light text-sm tracking-wide">{item.label}</div>
                        </div>
                        <div className="w-1.5 h-1.5 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                      </div>
                      <div className="absolute left-0 bottom-0 w-0 h-px bg-gradient-to-r from-white/40 to-white/20 group-hover:w-full transition-all duration-500 ease-out"></div>
                    </button>
                  ))}
                </div>
              </nav>
              
              {/* Contact premium avec design sophistiqué */}
              <div className="pt-8 border-t border-white/20">
                <div className="text-xs font-bold text-white/60 uppercase tracking-[0.3em] mb-6">Contact</div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-light">8 Rue de la Gastronomie</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-light">+33 1 45 67 89 01</span>
                  </div>
                </div>
                <a 
                  href="tel:+33145678901"
                  className="group relative w-full bg-gradient-to-r from-white/15 to-white/8 backdrop-blur-sm text-white px-6 py-4 rounded-xl hover:from-white/25 hover:to-white/15 transition-all duration-500 font-semibold border border-white/25 hover:border-white/40 overflow-hidden flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                >
                  <div className="relative z-10 flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-white/70 font-light tracking-wide">Appeler maintenant</div>
                      <div className="text-sm font-bold tracking-wider">+33 1 45 67 89 01</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video - Optimisée pour tous les écrans */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/restaurant/optimized/hero-1920w.webp"
        >
          <source src="/restaurant/hero.mp4" type="video/mp4" />
          {/* Fallback image si la vidéo ne charge pas */}
          <img 
            src="/restaurant/optimized/hero-1920w.webp" 
            alt="L'Atelier du Chef" 
            className="absolute inset-0 w-full h-full object-cover" 
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            srcSet="/restaurant/optimized/hero-640w.webp 640w, /restaurant/optimized/hero-1024w.webp 1024w, /restaurant/optimized/hero-1920w.webp 1920w"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <div className="mb-8">
            <div className="font-script text-lg opacity-80 tracking-wide mb-4 animate-fade-in-up drop-shadow-lg">
              Bienvenue
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight font-light leading-none animate-fade-in-up drop-shadow-2xl" style={{ animationDelay: '0.3s' }}>
              L'Atelier<br />du Chef
            </h1>
          </div>

          {/* CTA Buttons élégants et cohérents */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {/* Bouton principal élégant */}
            <button 
              onClick={() => scrollToSection('menu')}
              className="group px-8 py-4 border border-white/60 text-white hover:border-white hover:bg-white/5 transition-all duration-300 font-light tracking-wide"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                DÉCOUVRIR →
              </span>
            </button>
            
            {/* Bouton secondaire raffiné */}
            <button 
              onClick={showPhoneNumber}
              className="group px-8 py-4 border border-white/40 text-white/90 hover:border-white hover:text-white transition-all duration-300 font-light tracking-wide"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                RÉSERVER →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Notre Histoire Section */}
      <section id="histoire" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-black animate-fade-in-up">
                Notre histoire
              </h2>
              <p className="text-lg leading-relaxed text-black/80 font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Depuis plus de deux décennies, L'Atelier du Chef incarne l'excellence gastronomique française. 
                Notre passion pour les produits d'exception et notre respect des traditions culinaires 
                nous poussent à créer des expériences uniques, où chaque plat raconte une histoire.
              </p>
              <p className="text-lg leading-relaxed text-black/80 font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Dans notre atelier, la modernité rencontre la tradition. Nos chefs, formés aux techniques 
                classiques, réinventent constamment notre héritage culinaire pour offrir une expérience 
                contemporaine tout en préservant l'authenticité de nos racines.
              </p>
              <button 
                onClick={() => scrollToSection('menu')}
                className="inline-block text-black font-light tracking-wider border-b border-black/20 hover:border-black/40 transition-all duration-300 animate-fade-in-up hover:scale-105 transform cursor-pointer" style={{ animationDelay: '0.6s' }}
              >
                À PROPOS →
              </button>
            </div>

            {/* Image avec animations - Optimisée pour tous les écrans */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src="/restaurant/optimized/story-1920w.webp"
                  alt="Chef en cuisine"
                  className="w-full h-[600px] sm:h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  srcSet="/restaurant/optimized/story-640w.webp 640w, /restaurant/optimized/story-1024w.webp 1024w, /restaurant/optimized/story-1920w.webp 1920w"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Band Section - Optimisée pour tous les écrans */}
      <section className="relative h-80 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <img
          src="/restaurant/optimized/band-1920w.webp"
          alt="Expérience gastronomique"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          srcSet="/restaurant/optimized/band-640w.webp 640w, /restaurant/optimized/band-1024w.webp 1024w, /restaurant/optimized/band-1920w.webp 1920w"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white tracking-tight text-center">
            Une expérience inédite
          </h2>
        </div>
      </section>

      {/* Les Entrées Section - Design sophistiqué et cohérent */}
      <section id="menu" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-stone-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            {/* Image avec animations - Optimisée mobile */}
            <div className="order-2 lg:order-1 group">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                <img
                  src="/restaurant/optimized/entree-1920w.webp"
                  alt="Plats d'entrée"
                  className="w-full h-[400px] sm:h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  srcSet="/restaurant/optimized/entree-640w.webp 640w, /restaurant/optimized/entree-1024w.webp 1024w, /restaurant/optimized/entree-1920w.webp 1920w"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Menu sophistiqué - Optimisé mobile et cohérent */}
            <div className="order-1 lg:order-2 space-y-8 sm:space-y-10">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-black animate-fade-in-up">
                Les entrées
              </h2>
                <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-stone-400 via-stone-600 to-stone-800"></div>
                <p className="text-sm sm:text-base text-stone-600 font-light italic">Découvrez nos créations d'exception</p>
              </div>
              
              <div className="space-y-4 sm:space-y-5">
                {/* Plat 1 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:text-stone-700 transition-all duration-300 truncate">Caviar d'Aquitaine</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Blini, crème fraîche, œufs de caille</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€45</span>
                    </div>
                  </div>
                </div>

                {/* Plat 2 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:text-stone-700 transition-all duration-300 truncate">Homard Bleu de Bretagne</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Sauce américaine, légumes glacés</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€38</span>
                    </div>
                  </div>
                </div>

                {/* Plat 3 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:text-stone-700 transition-all duration-300 truncate">Foie Gras Mi-Cuit</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Chutney de figues, pain brioché</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€32</span>
                    </div>
                  </div>
                </div>

                {/* Plat 4 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:scale-105 transition-transform duration-300 truncate">Asperges Vertes</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Sauce hollandaise, œuf mollet</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€28</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={showPhoneNumber}
                  className="group inline-flex items-center space-x-2 text-black font-light tracking-wider border-b border-black/20 hover:border-black/40 transition-all duration-300 text-sm sm:text-base cursor-pointer"
                >
                  <span>RÉSERVER UNE TABLE</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les Desserts Section - Design sophistiqué et cohérent */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-stone-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            {/* Menu sophistiqué - Optimisé mobile et cohérent */}
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-black animate-fade-in-up">
                Les desserts
              </h2>
                <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-stone-400 via-stone-600 to-stone-800"></div>
                <p className="text-sm sm:text-base text-stone-600 font-light italic">Finissez en beauté avec nos créations sucrées</p>
              </div>
              
              <div className="space-y-4 sm:space-y-5">
                {/* Dessert 1 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:text-stone-700 transition-all duration-300 truncate">Soufflé au Chocolat</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Glace vanille bourbon, coulis framboise</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€18</span>
                    </div>
                  </div>
                </div>

                {/* Dessert 2 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:text-stone-700 transition-all duration-300 truncate">Tarte Tatin</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Pommes caramélisées, crème fraîche</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€16</span>
                    </div>
                  </div>
                </div>

                {/* Dessert 3 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:text-stone-700 transition-all duration-300 truncate">Crème Brûlée</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Vanille de Madagascar, sucre caramélisé</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€14</span>
                    </div>
                  </div>
                </div>

                {/* Dessert 4 */}
                <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-stone-50/90 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200/50 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-serif text-lg sm:text-xl text-stone-900 group-hover:text-stone-700 transition-all duration-300 truncate">Millefeuille</h3>
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-all duration-300 flex-shrink-0"></div>
                      </div>
                      <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">Pâte feuilletée, crème pâtissière</p>
                    </div>
                    <div className="ml-4 sm:ml-6 flex-shrink-0">
                      <span className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-stone-600 transition-all duration-300">€17</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={showPhoneNumber}
                  className="group inline-flex items-center space-x-2 text-black font-light tracking-wider border-b border-black/20 hover:border-black/40 transition-all duration-300 text-sm sm:text-base cursor-pointer"
                >
                  <span>RÉSERVER UNE TABLE</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>

            {/* Image avec animations - Optimisée mobile */}
                                        <div className="group">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                  <img
                    src="/restaurant/dessert.jpg"
                    alt="Desserts raffinés de L'Atelier du Chef"
                    className="w-full h-[400px] sm:h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(e) => {
                      // Fallback vers l'image originale si l'optimisée échoue
                      const target = e.target as HTMLImageElement;
                      if (target.src !== '/restaurant/dessert.jpg') {
                        target.src = '/restaurant/dessert.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-xl text-black mb-4">Adresse</h3>
              <p className="text-black/70 font-light">
                15 Rue du Marais<br />
                75004 Paris, France
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-black mb-4">Horaires</h3>
              <p className="text-black/70 font-light">
                Mardi - Samedi<br />
                19h00 - 23h00
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-black mb-4">Contact</h3>
              <p className="text-black/70 font-light">
                33 1 42 78 90 12<br />
                contact@fabrik-gastronomie.fr
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-black mb-4">Suivez-nous</h3>
              <a 
                href="#" 
                className="text-black/70 hover:text-black transition-colors duration-300 font-light"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>



      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=Inter:wght@300;400&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-script {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          will-change: opacity, transform;
        }
        
        /* Optimisations pour mobile */
        @media (max-width: 768px) {
          .animate-fade-in-up {
            animation-duration: 0.4s; /* Plus rapide sur mobile */
          }
        }
        
        /* Optimisations pour les images */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
          will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}











