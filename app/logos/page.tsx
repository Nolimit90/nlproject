'use client';

import Header from "@/components/Header";
import BackgroundVideo from "@/components/BackgroundVideo";
import { MobileMenuProvider } from "@/components/MobileMenuContext";

export default function LogosPage() {
  return (
    <MobileMenuProvider>
      <div style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh'
      }}>
        <BackgroundVideo
          videoSrc="/VIDEO/go.mp4"
          fallbackImage="/pexels-googledeepmind-25626428.jpg"
        />
        
        <Header />
        
        {/* HERO - Design Premium UX 10/10 - Mobile First */}
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0 16px'
        }}>
          <div style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: 'white',
            maxWidth: '1024px',
            margin: '0 auto'
          }}>
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}>
                Inspirations
              </h2>
              <h1 style={{
                fontSize: '64px',
                fontWeight: 300,
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '0.9',
                marginBottom: '24px'
              }}>
                Marques de Luxe
              </h1>
              <p style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 300,
                maxWidth: '512px',
                margin: '0 auto 24px'
              }}>
                Ces géants m'inspirent dans mon travail
              </p>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 300,
                letterSpacing: 'wide'
              }}>
                Inspired by excellence, crafted for results
              </p>
            </div>
          </div>
        </section>

        {/* Section Logos - Bandeau de logos minimalistes */}
        <section style={{
          position: 'relative',
          zIndex: 10,
          padding: '64px 16px'
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto'
          }}>
            {/* Titre de la section */}
            <div style={{
              textAlign: 'center',
              marginBottom: '48px'
            }}>
              <h3 style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '20px',
                marginBottom: '16px'
              }}>
                Marques qui m'inspirent
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '16px'
              }}>
                Ces géants m'inspirent dans mon travail
              </p>
            </div>

            {/* Grille de logos statiques */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '32px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/apple.svg" alt="Apple" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Apple</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/chanel.svg" alt="Chanel" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Chanel</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/nike.svg" alt="Nike" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Nike</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/lv.svg" alt="Louis Vuitton" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Louis Vuitton</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/cartier.svg" alt="Cartier" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Cartier</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/rolex.svg" alt="Rolex" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Rolex</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/dior.svg" alt="Dior" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Dior</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/tesla.svg" alt="Tesla" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Tesla</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/netflix.svg" alt="Netflix" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Netflix</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <img src="/logos/google.svg" alt="Google" style={{ height: '64px', width: 'auto', opacity: 0.9 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500 }}>Google</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MobileMenuProvider>
  );
}
