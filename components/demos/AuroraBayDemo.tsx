"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, Users, MapPin, Star, ChevronRight, Home, Clock, CreditCard, CheckCircle } from 'lucide-react';

export default function AuroraBayDemo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('deluxe');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Calcul du prix par nuit selon le type de chambre
  const getRoomPrice = (type: string) => {
    switch (type) {
      case 'deluxe': return 280;
      case 'ocean': return 420;
      case 'presidential': return 680;
      case 'spa': return 350;
      default: return 280;
    }
  };

  // Calcul du nombre de nuits
  const getNumberOfNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = new Date(selectedDates.checkIn);
    const checkOut = new Date(selectedDates.checkOut);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calcul du prix total
  const getTotalPrice = () => {
    const basePrice = getRoomPrice(roomType);
    const nights = getNumberOfNights();
    const guestMultiplier = guests > 2 ? 1.5 : 1; // Supplément pour plus de 2 personnes
    return basePrice * nights * guestMultiplier;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleReservation = () => {
    setIsReservationOpen(!isReservationOpen);
    if (isReservationOpen) {
      setIsConfirmed(false);
    }
  };

  // Effet de scroll pour le header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimisation du chargement des images uniquement
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/aurora-bay/optimized/hero-1920w.webp',
        '/aurora-bay/optimized/SPA2-1920w.webp',
        '/aurora-bay/optimized/KITCHENOUT-1920w.webp',
        '/aurora-bay/optimized/deluxe-room-1920w.webp',
        '/aurora-bay/optimized/restaurant-1920w.webp'
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
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // Afficher un loader pendant le chargement des images
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7C8C6B] mx-auto mb-4"></div>
          <p className="text-[#7C8C6B] font-light">Loading Aurora Bay...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-['Playfair_Display']">
      {/* A. Header mobile-first et luxueux - SIMPLIFIÉ pour mobile */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#FAF9F6]/95 backdrop-blur-[8px] shadow-sm' : 'bg-transparent'
      }`}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24">
            {/* À GAUCHE : liens avec points verts - CACHÉS sur mobile pour simplifier */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <div className="flex items-center space-x-3">
                <span className="text-white text-[12px] leading-none font-bold" style={{color: 'white !important'}}>●</span>
                <a 
                  href="#" 
                  className="text-[15px] font-medium tracking-[0.12em] text-white hover:text-[#7C8C6B] transition-colors duration-300"
                  style={{ fontVariantCaps: 'all-small-caps' }}
                >
                  ENQUIRE NOW
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-white text-[12px] leading-none font-bold" style={{color: 'white !important'}}>●</span>
                <button 
                  onClick={toggleReservation}
                  className="text-[15px] font-medium tracking-[0.12em] text-white hover:text-[#7C8C6B] transition-colors duration-300 cursor-pointer"
                  style={{ fontVariantCaps: 'all-small-caps' }}
                >
                  BOOK DIRECTLY
                </button>
              </div>
            </div>

            {/* CENTRE : espace vide pour équilibrer la mise en page */}
            <div className="flex-1"></div>
            
            {/* À DROITE : "ROOMS & SUITES" + menu - SIMPLIFIÉ sur mobile */}
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
              {/* ROOMS & SUITES - CACHÉ sur mobile pour simplifier */}
              <div className="hidden md:flex items-center space-x-3">
                <span className={`text-[10px] leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-[#7C8C6B]' : 'text-white'
                }`}>●</span>
                <span className={`text-[15px] font-medium tracking-[0.12em] transition-colors duration-300 ${
                  isScrolled ? 'text-[#2E2E2E]' : 'text-white'
                }`} style={{ fontVariantCaps: 'all-small-caps' }}>
                  ROOMS & SUITES
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className={`p-1.5 sm:p-2 transition-colors duration-300 hover:text-[#7C8C6B] ${
                  isScrolled ? 'text-[#2E2E2E]' : 'text-white'
                }`}
              >
                <Menu size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu overlay mobile-first - DESIGN AMÉLIORÉ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#FAF9F6] via-white to-[#F5F3F0] overflow-y-auto">
          {/* Header du menu avec logo */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#E8E0D8]/50">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#7C8C6B] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-light">AB</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-light text-[#2E2E2E]">Aurora Bay</h2>
                    <p className="text-xs text-[#7C8C6B] font-light">Navigation</p>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="w-10 h-10 bg-[#2E2E2E] text-white flex items-center justify-center hover:bg-[#7C8C6B] transition-all duration-300 rounded-full hover:scale-110 hover:rotate-90"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24">
            <div className="flex flex-col lg:flex-row justify-between items-start space-y-12 lg:space-y-0">
              {/* Menu de gauche avec design amélioré */}
              <div className="w-full lg:flex-1">
                <div className="space-y-10 sm:space-y-12 md:space-y-16">
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#7C8C6B] to-[#9BAF8A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-light text-[#2E2E2E] group-hover:text-[#7C8C6B] transition-colors duration-300">AURORA BAY</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#5B6B62] font-light pl-4">
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          // Scroll to Our Story section
                          setTimeout(() => {
                            const storySection = document.querySelector('#immersive-experiences');
                            if (storySection) {
                              storySection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Our Story
                      </button>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          // Scroll to Immersive Experiences section
                          setTimeout(() => {
                            const experiencesSection = document.querySelector('#immersive-experiences');
                            if (experiencesSection) {
                              experiencesSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Immersive Experiences
                      </button>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          // Scroll to Luxury Services section
                          setTimeout(() => {
                            const servicesSection = document.querySelector('#luxury-services');
                            if (servicesSection) {
                              servicesSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Luxury Services
                      </button>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#7C8C6B] to-[#9BAF8A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-light text-[#2E2E2E] group-hover:text-[#7C8C6B] transition-colors duration-300">ACCOMMODATION</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#5B6B62] font-light pl-4">
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setRoomType('deluxe');
                          setTimeout(() => {
                            toggleReservation();
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Deluxe Room - €280/night
                      </button>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setRoomType('ocean');
                          setTimeout(() => {
                            toggleReservation();
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Ocean Suite - €420/night
                      </button>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setRoomType('presidential');
                          setTimeout(() => {
                            toggleReservation();
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Presidential Villa - €680/night
                      </button>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#7C8C6B] to-[#9BAF8A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-light text-[#2E2E2E] group-hover:text-[#7C8C6B] transition-colors duration-300">WELLNESS</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#5B6B62] font-light pl-4">
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          // Scroll to Premium Wellness section
                          setTimeout(() => {
                            const wellnessSection = document.querySelector('#luxury-services');
                            if (wellnessSection) {
                              wellnessSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Premium Spa Experience
                      </button>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          // Scroll to Premium Wellness section
                          setTimeout(() => {
                            const wellnessSection = document.querySelector('#luxury-services');
                            if (wellnessSection) {
                              wellnessSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        HUUM Sauna Technology
                      </button>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          // Scroll to Premium Wellness section
                          setTimeout(() => {
                            const wellnessSection = document.querySelector('#luxury-services');
                            if (wellnessSection) {
                              wellnessSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        VIP Concierge Service
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Menu de droite avec design amélioré */}
              <div className="w-full lg:flex-1">
                <div className="space-y-10 sm:space-y-12 md:space-y-16">
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#7C8C6B] to-[#9BAF8A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-light text-[#2E2E2E] group-hover:text-[#7C8C6B] transition-colors duration-300">CUISINE</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#5B6B62] font-light pl-4">
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Fine Dining
                      </p>
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Wine Cellar
                      </p>
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Private Chef
                      </p>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#7C8C6B] to-[#9BAF8A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-light text-[#2E2E2E] group-hover:text-[#7C8C6B] transition-colors duration-300">SPA & GYM +</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#5B6B62] font-light pl-4">
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Wellness Center
                      </p>
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Fitness Studio
                      </p>
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Massage Therapy
                      </p>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#7C8C6B] to-[#9BAF8A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-light text-[#2E2E2E] group-hover:text-[#7C8C6B] transition-colors duration-300">PHOTO GALLERY</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#5B6B62] font-light pl-4">
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Resort Views
                      </p>
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Room Photos
                      </p>
                      <p className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center">
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Activities
                      </p>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#7C8C6B] to-[#9BAF8A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-light text-[#2E2E2E] group-hover:text-[#7C8C6B] transition-colors duration-300">CONTACT</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#5B6B62] font-light pl-4">
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          toggleReservation();
                        }}
                        className="w-full text-left hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Reservations
                      </button>
                      <a 
                        href="tel:+62361123456"
                        className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Call Us: +62 361 123 456
                      </a>
                      <a 
                        href="mailto:info@aurorabaybali.com"
                        className="hover:text-[#2E2E2E] transition-all duration-300 cursor-pointer group/item flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#7C8C6B] rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                        Email: info@aurorabaybali.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section CTA en bas du menu */}
            <div className="mt-20 pt-16 border-t border-[#E8E0D8]/30">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-light text-[#2E2E2E] mb-6">Ready to experience Aurora Bay?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="bg-[#7C8C6B] text-white px-8 py-3 rounded-lg hover:bg-[#6B7A5A] transition-all duration-300 font-medium hover:scale-105 transform">
                    Book Your Stay
                  </button>
                  <button className="border border-[#7C8C6B] text-[#7C8C6B] px-8 py-3 rounded-lg hover:bg-[#7C8C6B] hover:text-white transition-all duration-300 font-medium hover:scale-105 transform">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B. Hero immersif mobile-first avec vidéo optimisée */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Fond vidéo plein écran avec boucle parfaite */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            src="/VIDEO/hero-light.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover hero-video"
            style={{
              objectPosition: 'center center',
              willChange: 'transform',
              transform: 'scale(1.01)',
            }}
            preload="metadata"
            poster="/aurora-bay/hero-poster.jpg"
            onError={(e) => console.log('Video error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onEnded={() => console.log('Video ended, looping...')}
            onSeeked={() => console.log('Video seeked')}
          />
          {/* Overlay très subtil pour lisibilité */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Contenu Hero centré mobile-first */}
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col justify-between h-full py-16 sm:py-20 md:py-24">
          {/* Logo centré horizontalement */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-sm sm:text-base md:text-lg font-light text-white/80 mb-3 sm:mb-4 tracking-[0.2em] uppercase">
                feel good resort
              </h2>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white tracking-[0.05em] leading-[0.9]">
                Aurora Bay
              </div>
            </div>
          </div>
          
          {/* Phrase descriptive en bas du Hero, centrée, typo fine - IDENTIQUE à Johannis */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-white leading-relaxed tracking-wide max-w-3xl sm:max-w-4xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0" style={{ lineHeight: '1.6' }}>
              YOUR HOTEL IN PARADISE. MOMENTS OF TRANQUILITY BETWEEN SEA AND NATURE.
            </p>
            
            {/* Bouton CTA transparent stylé pour réserver - DESIGN AMÉLIORÉ */}
            <button
              onClick={toggleReservation}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-light text-white border border-white/40 rounded-none overflow-hidden transition-all duration-500 hover:border-white hover:scale-[1.02] hover:px-16"
            >
              <span className="relative z-10 tracking-wide">
                Reserve Your Stay
              </span>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm group-hover:bg-white/15 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
            </button>
          </div>
        </div>
      </section>

      {/* C. Section présentation - DESIGN AMÉLIORÉ avec meilleure hiérarchie */}
      <section className="py-24 sm:py-28 md:py-32 lg:py-36 xl:py-40 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            {/* Titre principal avec meilleure hiérarchie */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[clamp(48px,8vw,80px)] font-light text-[#2E2E2E] mb-8 sm:mb-10 md:mb-12 leading-[1.08] tracking-wide">
              Aurora Bay is a luxury retreat where modern design blends with breathtaking views.
            </h2>
            
            {/* Sous-titre séparé pour meilleure lisibilité */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#2E2E2E] mb-12 sm:mb-16 md:mb-20 leading-[1.1] tracking-wide">
              An oasis of tranquility, sun, and water.
            </h3>
            
            {/* Description avec meilleur espacement */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl leading-[1.7] md:leading-[1.8] text-[#5B6B62] max-w-4xl lg:max-w-5xl mx-auto font-light">
              Nestled in the heart of Bali's tropical paradise, Aurora Bay Resort offers an unparalleled experience 
              where contemporary architecture meets pristine nature. Our commitment to authentic hospitality 
              creates moments of pure serenity, allowing guests to reconnect with themselves and the world 
              around them.
            </p>
          </div>


          
          {/* Image immersive avec ANIMATIONS LUXUEUSES AUTHENTIQUES */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px] transform transition-all duration-1000 ease-out hover:scale-[1.02]">
              <img 
                src="/aurora-bay/optimized/SPA2-1920w.webp" 
                alt="Luxury Sauna - Premium Wellness Experience" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                srcSet="/aurora-bay/optimized/SPA2-640w.webp 640w, /aurora-bay/optimized/SPA2-1024w.webp 1024w, /aurora-bay/optimized/SPA2-1920w.webp 1920w"
              />
              
              {/* Overlay gradient animé */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent transition-all duration-1000 ease-out group-hover:from-black/60 group-hover:via-black/20"></div>
              
              {/* Éléments décoratifs flottants */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-white/20 rounded-full animate-float-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300"></div>
              <div className="absolute top-16 right-16 w-2 h-2 bg-white/30 rounded-full animate-float-medium opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500"></div>
              <div className="absolute top-24 right-24 w-1 h-1 bg-white/40 rounded-full animate-float-fast opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-700"></div>
              
              {/* Ligne de lumière animée */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out delay-200"></div>
              
              {/* Overlay text avec animations d'entrée luxueuses */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16 lg:p-20 transform translate-y-0 opacity-100 transition-all duration-1000 ease-out">
                <div className="text-white">
                  <div className="overflow-hidden">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide mb-2 transform translate-y-0 opacity-100 transition-all duration-1000 delay-300 ease-out group-hover:translate-y-[-2px]">
                      Premium Wellness Experience
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base md:text-lg text-white/80 font-light transform translate-y-0 opacity-100 transition-all duration-1000 delay-500 ease-out group-hover:translate-y-[-1px]">
                      State-of-the-art sauna with HUUM technology
                    </p>
                  </div>
                  
                  {/* Bouton CTA avec animation d'entrée */}
                  <div className="overflow-hidden mt-6 sm:mt-8">
                    <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-500 transform translate-y-0 opacity-100 transition-all duration-1000 delay-700 ease-out group-hover:translate-y-[-2px] group-hover:scale-105">
                      Discover More
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Section vidéo immersive LUXURY2 - NOUVELLE SECTION */}
      <section className="relative py-32 sm:py-36 md:py-40 lg:py-44 xl:py-48 overflow-hidden">
        {/* Vidéo immersive en arrière-plan */}
        <div className="absolute inset-0 w-full h-full">
          <video 
                            src="/VIDEO/optimized/LUXURY2.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover background-video"
            style={{
              objectPosition: 'center center',
              willChange: 'transform',
              transform: 'scale(1.02)',
            }}
            preload="auto"
            onError={(e) => console.log('Video LUXURY2 error:', e)}
            onLoadStart={() => console.log('Video LUXURY2 loading started')}
            onCanPlay={() => console.log('Video LUXURY2 can play')}
            onEnded={() => console.log('Video LUXURY2 ended, looping...')}
            onSeeked={() => console.log('Video LUXURY2 seeked')}
          />
          {/* Overlay élégant pour la lisibilité */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Contenu centré sur la vidéo */}
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-6xl mx-auto">
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-8 sm:mb-12 tracking-wide leading-[1.1]">
              LUXURY REDEFINED
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed tracking-wide">
              Experience the perfect blend of sophistication and comfort in every detail
            </p>
            <div className="flex justify-center">
              <button
                onClick={toggleReservation}
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-light text-white border border-white/60 rounded-none overflow-hidden transition-all duration-500 hover:border-white hover:scale-[1.02] hover:px-14"
              >
                <span className="relative z-10 tracking-wide">
                  Discover More
                </span>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* E. Section storytelling - DESIGN AMÉLIORÉ avec meilleure présentation */}
      <section className="py-24 sm:py-28 md:py-32 lg:py-36 xl:py-40 bg-gradient-to-br from-[#FAF9F6] via-white to-[#F5F3F0]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto text-center">
          {/* Titre principal avec design amélioré */}
          <div className="mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[clamp(40px,6vw,72px)] font-light text-[#2E2E2E] mb-8 sm:mb-12 md:mb-16 leading-[1.08] tracking-wide">
              IN A 5-STAR HOTEL AND YET SO FREE.
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#2E2E2E] mb-8 sm:mb-12 leading-[1.1] tracking-wide">
              SO PERSONAL. SO FEEL GOOD.
            </h3>
          </div>
          
          {/* Description avec meilleur espacement et design */}
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-[#5B6B62] font-light leading-[1.7] md:leading-[1.8] mb-12 sm:mb-16">
              Aurora Bay redefines luxury hospitality by offering an experience that feels both 
              exclusive and authentically personal.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-[#5B6B62] font-light leading-[1.6] md:leading-[1.7]">
              Here, every guest is treated like family, creating connections that last far beyond your stay.
            </p>
          </div>
          
          {/* Éléments visuels décoratifs */}
          <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 flex justify-center items-center space-x-8 sm:space-x-12 md:space-x-16">
            <div className="w-2 h-2 bg-[#7C8C6B] rounded-full opacity-60"></div>
            <div className="w-1 h-1 bg-[#7C8C6B] rounded-full opacity-40"></div>
            <div className="w-3 h-3 bg-[#7C8C6B] rounded-full opacity-80"></div>
            <div className="w-1 h-1 bg-[#7C8C6B] rounded-full opacity-40"></div>
            <div className="w-2 h-2 bg-[#7C8C6B] rounded-full opacity-60"></div>
          </div>
        </div>
      </section>

      {/* E. Section vidéo immersive LUXURY3 - NOUVELLE SECTION */}
      <section className="relative py-32 sm:py-36 md:py-40 lg:py-44 xl:py-48 overflow-hidden">
        {/* Vidéo immersive en arrière-plan */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            src="/VIDEO/LUXURY3.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover background-video"
            style={{
              objectPosition: 'center center',
              willChange: 'transform',
              transform: 'scale(1.02)',
            }}
            preload="none"
            onError={(e) => console.log('Video LUXURY3 error:', e)}
            onLoadStart={() => console.log('Video LUXURY3 loading started')}
            onCanPlay={() => console.log('Video LUXURY3 can play')}
            onEnded={() => console.log('Video LUXURY3 ended, looping...')}
            onSeeked={() => console.log('Video LUXURY3 seeked')}
          />
          {/* Overlay élégant pour la lisibilité */}
          <div className="absolute inset-0 bg-black/35"></div>
        </div>
        
        {/* Contenu centré sur la vidéo */}
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-6xl mx-auto">
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-8 sm:mb-12 tracking-wide leading-[1.1]">
              TIMELESS ELEGANCE
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed tracking-wide">
              Where every moment becomes a cherished memory of luxury and refinement
            </p>
            <div className="flex justify-center">
              <button
                onClick={toggleReservation}
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-light text-white border border-white/60 rounded-none overflow-hidden transition-all duration-500 hover:border-white hover:scale-[1.02] hover:px-14"
              >
                <span className="relative z-10 tracking-wide">
                  Book Your Experience
                </span>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* G. Section Experiences Immersives - ANIMATIONS LUXUEUSES OPTIMISÉES */}
      <section id="immersive-experiences" className="py-24 sm:py-28 md:py-32 lg:py-36 xl:py-40 bg-gradient-to-br from-[#FAF9F6] via-white to-[#F5F3F0] overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
          {/* Titre avec animation d'entrée luxueuse */}
          <div className="text-center mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            <div className="overflow-hidden">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#2E2E2E] mb-8 sm:mb-12 tracking-wide transform translate-y-0 opacity-100 transition-all duration-1000 ease-out animate-fade-in-up">
                Immersive Experiences
              </h2>
            </div>
            <div className="overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-[#5B6B62] font-light max-w-4xl mx-auto leading-relaxed transform translate-y-0 opacity-100 transition-all duration-1000 delay-300 ease-out animate-fade-in-up">
                Discover the extraordinary moments that make Aurora Bay more than just a hotel
              </p>
            </div>
          </div>
          
          {/* Section immersive avec image de fond - ANIMATIONS LUXUEUSES */}
          <div className="relative mb-20 sm:mb-24 md:mb-28 lg:mb-32 group">
            <div className="relative h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden transform transition-all duration-1000 ease-out hover:scale-[1.02]">
              <img 
                src="/aurora-bay/optimized/hero-1920w.webp" 
                alt="Aurora Bay Resort - Immersive Experience" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="100vw"
                srcSet="/aurora-bay/optimized/hero-640w.webp 640w, /aurora-bay/optimized/hero-1024w.webp 1024w, /aurora-bay/optimized/hero-1920w.webp 1920w"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-1000 ease-out group-hover:opacity-90"></div>
              
              {/* Overlay text avec animation d'entrée */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16 text-white transform translate-y-0 opacity-100 transition-all duration-1000 delay-500 ease-out">
                <div className="overflow-hidden">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 transform translate-y-0 opacity-100 transition-all duration-1000 delay-700 ease-out">
                    Where Luxury Meets Nature
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed transform translate-y-0 opacity-100 transition-all duration-1000 delay-900 ease-out">
                    Every moment at Aurora Bay is designed to create unforgettable memories. From the moment you arrive, you'll feel the magic of this extraordinary place.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carrousel de témoignages clients - ANIMATIONS LUXUEUSES */}
          <div className="mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {/* Témoignage 1 - Animation d'entrée progressive */}
              <div className="group bg-white rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-3xl transform translate-y-0 opacity-100 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7C8C6B] to-[#9BAF8A] rounded-full flex items-center justify-center text-white text-2xl font-light mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#2E2E2E]">Sarah & Michael</h4>
                    <p className="text-sm text-[#5B6B62]">New York, USA</p>
                  </div>
                </div>
                <p className="text-[#5B6B62] leading-relaxed mb-4 italic">
                  "The spa experience was beyond anything we've ever experienced. The facial treatments and sauna sessions were absolutely transformative."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Témoignage 2 - Animation d'entrée progressive */}
              <div className="group bg-white rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-3xl transform translate-y-0 opacity-100 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7C8C6B] to-[#9BAF8A] rounded-full flex items-center justify-center text-white text-2xl font-light mr-4">
                    C
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#2E2E2E]">Carlos & Elena</h4>
                    <p className="text-sm text-[#5B6B62]">Madrid, Spain</p>
                  </div>
                </div>
                <p className="text-[#5B6B62] leading-relaxed mb-4 italic">
                  "The poolside dining experience was magical. Fresh sushi by the pool with tropical garden views - absolutely unforgettable!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Témoignage 3 - Animation d'entrée progressive */}
              <div className="group bg-white rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-3xl transform translate-y-0 opacity-100 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7C8C6B] to-[#9BAF8A] rounded-full flex items-center justify-center text-white text-2xl font-light mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#2E2E2E]">James & Emma</h4>
                    <p className="text-sm text-[#5B6B62]">London, UK</p>
                  </div>
                </div>
                <p className="text-[#5B6B62] leading-relaxed mb-4 italic">
                  "The presidential villa exceeded all expectations. Private pool, tropical garden views, and impeccable service. Pure luxury!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline interactive de l'histoire d'Aurora Bay - ANIMATIONS LUXUEUSES */}
          <div className="mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            <div className="overflow-hidden">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2E2E] text-center mb-12 sm:mb-16 transform translate-y-0 opacity-100 transition-all duration-1000 delay-600 ease-out animate-fade-in-up">
                Our Story
              </h3>
            </div>
            <div className="relative">
              {/* Ligne de temps animée */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#7C8C6B] to-transparent animate-timeline-grow"></div>
              
              <div className="space-y-16 sm:space-y-20">
                {/* 2006 - Animation progressive */}
                <div className="relative flex items-center transform translate-y-0 opacity-100 transition-all duration-1000 delay-700 ease-out animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                  <div className="w-4 h-4 bg-[#7C8C6B] rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 animate-pulse-slow"></div>
                  <div className="w-1/2 pr-8 text-right">
                    <h4 className="text-xl font-medium text-[#2E2E2E] mb-2">2006</h4>
                    <p className="text-[#5B6B62]">Foundation of Aurora Bay Resort</p>
                  </div>
                </div>
                
                {/* 2015 - Animation progressive */}
                <div className="relative flex items-center transform translate-y-0 opacity-100 transition-all duration-1000 delay-900 ease-out animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                  <div className="w-4 h-4 bg-[#7C8C6B] rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 animate-pulse-slow"></div>
                  <div className="w-1/2 pl-8 text-left ml-auto">
                    <h4 className="text-xl font-medium text-[#2E2E2E] mb-2">2015</h4>
                    <p className="text-[#5B6B62]">Opening of the Luxury Spa & Wellness Center</p>
                  </div>
                </div>
                
                {/* 2025 - Animation progressive */}
                <div className="relative flex items-center transform translate-y-0 opacity-100 transition-all duration-1000 delay-1100 ease-out animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                  <div className="w-4 h-4 bg-[#7C8C6B] rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 animate-pulse-slow"></div>
                  <div className="w-1/2 pr-8 text-right">
                    <h4 className="text-xl font-medium text-[#2E2E2E] mb-2">2025</h4>
                    <p className="text-[#5B6B62]">Launch of the Presidential Villa Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          

        </div>
      </section>

      {/* H. Section Luxury Services - Version simplifiée et immersive */}
      <section id="luxury-services" className="py-24 sm:py-28 md:py-32 lg:py-36 xl:py-40 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#2E2E2E] mb-8 sm:mb-12 tracking-wide">
              Luxury Services
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#5B6B62] font-light max-w-4xl mx-auto leading-relaxed">
              Discover our curated collection of premium experiences designed for the discerning traveler
            </p>
          </div>
          
          {/* Services avec images immersives */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-20 sm:mb-24 md:mb-28 lg:mb-32">
            {/* Service 1 - Concierge VIP */}
            <div className="group">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-6">
                <img 
                  src="/aurora-bay/optimized/deluxe-room-1920w.webp" 
                  alt="VIP Concierge Service" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  srcSet="/aurora-bay/optimized/deluxe-room-640w.webp 640w, /aurora-bay/optimized/deluxe-room-1024w.webp 1024w, /aurora-bay/optimized/deluxe-room-1920w.webp 1920w"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#2E2E2E] mb-4">VIP Concierge</h3>
              <p className="text-[#5B6B62] leading-relaxed mb-4">
                Personalized service with dedicated staff available 24/7 for all your needs. From restaurant reservations to exclusive experiences, we handle everything.
              </p>
              <div className="flex items-center text-[#7C8C6B] text-sm">
                <span className="mr-2">●</span>
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center text-[#7C8C6B] text-sm">
                <span className="mr-2">●</span>
                <span>Personalized recommendations</span>
              </div>
            </div>
            
            {/* Service 2 - Spa Premium */}
            <div className="group">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-6">
                <img 
                  src="/aurora-bay/optimized/SPA2-1920w.webp" 
                  alt="Premium Spa Experience" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  srcSet="/aurora-bay/optimized/SPA2-640w.webp 640w, /aurora-bay/optimized/SPA2-1024w.webp 1024w, /aurora-bay/optimized/SPA2-1920w.webp 1920w"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#2E2E2E] mb-4">Premium Spa</h3>
              <p className="text-[#5B6B62] leading-relaxed mb-4">
                Exclusive access to our luxury spa with private treatment rooms, expert therapists, and world-class wellness programs.
              </p>
              <div className="flex items-center text-[#7C8C6B] text-sm">
                <span className="mr-2">●</span>
                <span>Private treatment rooms</span>
              </div>
              <div className="flex items-center text-[#7C8C6B] text-sm">
                <span className="mr-2">●</span>
                <span>Expert therapists</span>
              </div>
            </div>

            {/* Service 3 - Fine Dining */}
            <div className="group">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-6">
                <img 
                  src="/aurora-bay/optimized/KITCHENOUT-1920w.webp" 
                  alt="Fine Dining Experience" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  srcSet="/aurora-bay/optimized/KITCHENOUT-640w.webp 640w, /aurora-bay/optimized/KITCHENOUT-1024w.webp 1024w, /aurora-bay/optimized/KITCHENOUT-1920w.webp 1920w"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#2E2E2E] mb-4">Fine Dining</h3>
              <p className="text-[#5B6B62] leading-relaxed mb-4">
                Experience world-class cuisine with our award-winning chefs. Fresh sushi by the pool, gourmet dining with tropical garden views.
              </p>
              <div className="flex items-center text-[#7C8C6B] text-sm">
                <span className="mr-2">●</span>
                <span>Fresh sushi by the pool</span>
              </div>
              <div className="flex items-center text-[#7C8C6B] text-sm">
                <span className="mr-2">●</span>
                <span>Gourmet tropical dining</span>
              </div>
            </div>
          </div>
          
          {/* Call-to-action final immersif */}
          <div className="bg-gradient-to-r from-[#7C8C6B] to-[#9BAF8A] rounded-2xl p-8 sm:p-10 lg:p-12 text-center text-white">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">
              Experience the Magic of Aurora Bay
            </h3>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Every moment here is designed to create the ultimate luxury experience. Let us make your dreams come true.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <button
                onClick={toggleReservation}
                className="bg-white text-[#7C8C6B] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-lg hover:scale-105"
              >
                Book Your Stay
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#7C8C6B] transition-all duration-300 font-medium text-lg">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* I. Footer luxueux - Mobile-first */}
      <footer className="bg-[#2E2E2E] text-white py-16 sm:py-20 md:py-24">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16">
            {/* Logo Aurora Bay */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-6 sm:mb-8">Aurora Bay Resort</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-sm sm:max-w-md leading-relaxed">
                Jl. Aurora Bay 1, Ubud, Bali 80571, Indonesia<br />
                Luxury retreat in the heart of Bali's tropical paradise
              </p>
              <div className="flex space-x-4 sm:space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Liens rapides */}
            <div>
              <h4 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8">Quick Links</h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
                <li><Link href="#" className="hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight size={14} className="sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Rooms
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight size={14} className="sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Cuisine
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight size={14} className="sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Spa
                </Link></li>
                <li><Link href="#immersive-experiences" className="hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight size={14} className="sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Immersive Experiences
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight size={14} className="sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Contact
                </Link></li>
              </ul>
            </div>
            
            {/* Coordonnées */}
            <div>
              <h4 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8">Contact</h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
                <li className="flex items-center">
                  <MapPin size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-[#7C8C6B]" />
                  +62 361 123 456
                </li>
                <li className="flex items-center">
                  <Users size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-[#7C8C6B]" />
                  info@aurorabaybali.com
                </li>
                <li className="flex items-center">
                  <Star size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-[#7C8C6B]" />
                  Jl. Aurora Bay 1, Ubud, Bali
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 text-center text-gray-400">
            <p className="text-sm sm:text-base md:text-lg">&copy; 2024 Aurora Bay Resort. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Réservation */}
      {isReservationOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleReservation}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header du modal */}
            <div className="sticky top-0 bg-gradient-to-r from-[#7C8C6B] to-[#9BAF8A] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light">Reserve Your Stay</h2>
                  <p className="text-white/80 mt-1">Aurora Bay Resort</p>
                </div>
                <button
                  onClick={toggleReservation}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Contenu du modal */}
            <div className="p-6 space-y-6">
              {!isConfirmed ? (
                <>
                  {/* Sélection des dates */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                      <Calendar size={20} className="mr-2 text-[#7C8C6B]" />
                      Select Dates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                        <input
                          type="date"
                          value={selectedDates.checkIn}
                          onChange={(e) => setSelectedDates(prev => ({ ...prev, checkIn: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C8C6B] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                        <input
                          type="date"
                          value={selectedDates.checkOut}
                          onChange={(e) => setSelectedDates(prev => ({ ...prev, checkOut: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C8C6B] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sélection du nombre de voyageurs */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                      <Users size={20} className="mr-2 text-[#7C8C6B]" />
                      Number of Guests
                    </h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-10 h-10 rounded-full border-2 border-[#7C8C6B] text-[#7C8C6B] hover:bg-[#7C8C6B] hover:text-white transition-all duration-200 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xl font-medium text-gray-800 min-w-[3rem] text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="w-10 h-10 rounded-full border-2 border-[#7C8C6B] text-[#7C8C6B] hover:bg-[#7C8C6B] hover:text-white transition-all duration-200 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Sélection du type de chambre */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                      <Home size={20} className="mr-2 text-[#7C8C6B]" />
                      Room Type
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: 'deluxe', name: 'Deluxe Room', price: 280, description: 'Tropical garden view, balcony, premium amenities' },
                        { id: 'ocean', name: 'Ocean Suite', price: 420, description: 'Sea view, private terrace, butler service' },
                        { id: 'presidential', name: 'Presidential Villa', price: 680, description: 'Private pool, garden, exclusive access' },
                        { id: 'spa', name: 'Spa Suite', price: 350, description: 'Wellness area, HUUM sauna, spa treatments' }
                      ].map((room) => (
                        <div
                          key={room.id}
                          onClick={() => setRoomType(room.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            roomType === room.id
                              ? 'border-[#7C8C6B] bg-[#7C8C6B]/5'
                              : 'border-gray-200 hover:border-[#7C8C6B]/50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-800">{room.name}</h4>
                            <span className="text-lg font-semibold text-[#7C8C6B]">€{room.price}/night</span>
                          </div>
                          <p className="text-sm text-gray-600">{room.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Résumé du prix */}
                  {(selectedDates.checkIn && selectedDates.checkOut) && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-gray-800 mb-3">Reservation Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room Type:</span>
                          <span className="font-medium">
                            {roomType === 'deluxe' ? 'Deluxe Room' : 
                             roomType === 'ocean' ? 'Ocean Suite' : 
                             roomType === 'presidential' ? 'Presidential Villa' : 'Spa Suite'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span className="font-medium">{guests} {guests > 1 ? 'people' : 'person'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{getNumberOfNights()} {getNumberOfNights() > 1 ? 'nights' : 'night'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per night:</span>
                          <span className="font-medium">€{getRoomPrice(roomType)}</span>
                        </div>
                        {guests > 2 && (
                          <div className="flex justify-between text-[#7C8C6B]">
                            <span>Additional guests supplement:</span>
                            <span>+50%</span>
                          </div>
                        )}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span className="text-[#7C8C6B]">€{getTotalPrice()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bouton de confirmation */}
                  <button
                    onClick={() => setIsConfirmed(true)}
                    disabled={!selectedDates.checkIn || !selectedDates.checkOut}
                    className="w-full bg-[#7C8C6B] text-white py-4 rounded-lg font-medium text-lg hover:bg-[#6B7A5A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <CreditCard size={20} />
                    <span>Confirm Reservation</span>
                  </button>
                </>
              ) : (
                /* Confirmation de réservation */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-800 mb-4">Reservation Confirmed!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for choosing Aurora Bay Resort. We've sent a confirmation email with all the details.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-500">Check-in:</span>
                          <p className="font-medium">{selectedDates.checkIn}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Check-out:</span>
                          <p className="font-medium">{selectedDates.checkOut}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Guests:</span>
                          <p className="font-medium">{guests} {guests > 1 ? 'people' : 'person'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Room:</span>
                          <p className="font-medium">{roomType === 'deluxe' ? 'Deluxe Room' : roomType === 'ocean' ? 'Ocean Suite' : roomType === 'presidential' ? 'Presidential Villa' : 'Spa Suite'}</p>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Amount:</span>
                          <span className="text-[#7C8C6B]">€{getTotalPrice()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      toggleReservation();
                    }}
                    className="bg-[#7C8C6B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#6B7A5A] transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
