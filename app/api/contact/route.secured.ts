/**
 * 🛡️ SECURED CONTACT API ROUTE
 * Protection complète contre spam, abus, injections et attaques
 * 
 * Sécurités implémentées:
 * - Rate limiting (3 req/h par IP)
 * - Validation stricte des données (Zod)
 * - Sanitisation complète
 * - Détection d'emails suspects
 * - Protection contre injections SQL/XSS
 * - CAPTCHA Turnstile (optionnel)
 * - Authentification webhook HMAC
 * - Headers de sécurité
 */

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';
import { validateAndSanitizeBriefing } from '@/lib/security/validation';
import { verifyTurnstileToken } from '@/lib/security/turnstile';
import { createWebhookAuthHeaders } from '@/lib/security/webhookAuth';

/**
 * Headers de sécurité standards
 */
function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  };
}

/**
 * Logging sécurisé (évite de logger des données sensibles)
 */
function secureLog(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[CONTACT API] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  } else {
    console.log(`[CONTACT API] ${message}`);
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 🛡️ 1. RATE LIMITING - Vérifier la limite par IP
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);
    
    if (!rateLimit.allowed) {
      const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      secureLog(`Rate limit exceeded for IP: ${clientIp}`);
      
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            ...securityHeaders(),
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          },
        }
      );
    }
    
    // 🛡️ 2. PARSE & VALIDATION - Lire le body
    let body: any;
    try {
      body = await request.json();
    } catch (e) {
      secureLog('Invalid JSON payload');
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400, headers: securityHeaders() }
      );
    }
    
    // 🛡️ 3. CAPTCHA VERIFICATION (optionnel - si configuré)
    const turnstileToken = body.turnstileToken;
    if (process.env.TURNSTILE_SECRET_KEY && !turnstileToken) {
      secureLog('CAPTCHA token missing');
      return NextResponse.json(
        { success: false, error: 'CAPTCHA verification required' },
        { status: 400, headers: securityHeaders() }
      );
    }
    
    if (turnstileToken) {
      const captchaResult = await verifyTurnstileToken(turnstileToken, clientIp);
      if (!captchaResult.success) {
        secureLog(`CAPTCHA verification failed for IP: ${clientIp}`);
        return NextResponse.json(
          { success: false, error: captchaResult.error },
          { status: 403, headers: securityHeaders() }
        );
      }
    }
    
    // 🛡️ 4. VALIDATION & SANITIZATION - Vérifier et nettoyer les données
    const validationResult = validateAndSanitizeBriefing(body);
    
    if (!validationResult.success) {
      secureLog('Validation failed', {
        error: validationResult.error,
        security: validationResult.securityIssue,
      });
      
      // Si problème de sécurité détecté, on log avec plus de détails
      if (validationResult.securityIssue) {
        console.error(`🚨 SECURITY ISSUE from IP ${clientIp}:`, validationResult.securityIssue);
      }
      
      return NextResponse.json(
        { success: false, error: validationResult.error },
        { status: 400, headers: securityHeaders() }
      );
    }
    
    const sanitizedData = validationResult.data!;
    
    // 🛡️ 5. WEBHOOK AUTHENTICATION - Créer signature pour n8n
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 'http://78.47.62.117:5678/webhook/formulaire-briefing';
    const authHeaders = createWebhookAuthHeaders(sanitizedData);
    
    secureLog('Sending to n8n workflow');
    
    // 🛡️ 6. CALL N8N WEBHOOK - Avec authentification
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000), // 15 secondes timeout
      body: JSON.stringify(sanitizedData),
    });
    
    const duration = Date.now() - startTime;
    secureLog(`n8n response received in ${duration}ms`, { status: webhookResponse.status });
    
    if (!webhookResponse.ok) {
      console.error(`❌ n8n webhook error: ${webhookResponse.status}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to process your request. Please try again.',
        },
        { status: 502, headers: securityHeaders() }
      );
    }
    
    // Parse response
    let responseData = { success: true };
    try {
      const text = await webhookResponse.text();
      if (text && text.trim().length > 0) {
        responseData = JSON.parse(text);
      }
    } catch (e) {
      secureLog('n8n response is not JSON (OK)');
    }
    
    secureLog('✅ Briefing processed successfully');
    
    return NextResponse.json(
      {
        success: true,
        message: responseData.message || 'Thank you! Your briefing has been received.',
      },
      {
        status: 200,
        headers: {
          ...securityHeaders(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    );
    
  } catch (error: any) {
    console.error('💥 Contact API Error:', error);
    
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'Request timeout. Please try again.' },
        { status: 504, headers: securityHeaders() }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500, headers: securityHeaders() }
    );
  }
}

/**
 * OPTIONS handler pour CORS (si nécessaire)
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        ...securityHeaders(),
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

