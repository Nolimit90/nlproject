/**
 * 🛡️ NEXT.JS MIDDLEWARE - Headers de sécurité globaux
 * Appliqué à toutes les routes
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Headers de sécurité standards (OWASP recommendations)
  const securityHeaders = {
    // Empêche le MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Empêche l'affichage dans une iframe (protection clickjacking)
    'X-Frame-Options': 'DENY',
    
    // Active la protection XSS du navigateur
    'X-XSS-Protection': '1; mode=block',
    
    // Contrôle les informations de référence
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Content Security Policy (CSP) - Strict
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com", // Turnstile
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://challenges.cloudflare.com", // Turnstile
      "frame-src https://challenges.cloudflare.com", // Turnstile
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
    
    // Permissions Policy (anciennement Feature Policy)
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
    ].join(', '),
    
    // Force HTTPS (si en production)
    ...(process.env.NODE_ENV === 'production' && {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    }),
  };
  
  // Appliquer tous les headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf:
     * - api (API routes internes)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (favicon)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

