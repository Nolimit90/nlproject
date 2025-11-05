export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { validateAndSanitizeBriefing } from '@/lib/security/validation';
import { checkRateLimit } from '@/lib/security/rateLimit';
import { verifyHoneypot } from '@/lib/security/honeypot';
import { getCorsHeaders, handleCorsPreflightRequest, isOriginAllowed } from '@/lib/security/cors';
import { logSecurityEvent } from '@/lib/security/monitoring';
import crypto from 'crypto';

/**
 * 🔐 SÉCURITÉ : Génère une signature HMAC pour authentifier les requêtes vers n8n
 */
function generateWebhookSignature(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * 🛡️ Headers de sécurité
 */
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

/**
 * 🔐 OPTIONS - Gestion des requêtes CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return handleCorsPreflightRequest(origin);
}

export async function POST(request: NextRequest) {
  try {
    // 🔐 SÉCURITÉ 0: Vérification CORS
    const origin = request.headers.get('origin');
    if (origin && !isOriginAllowed(origin)) {
      logSecurityEvent({
        type: 'blocked_ip',
        ip: origin,
        severity: 'medium',
        details: `CORS: Origin not allowed - ${origin}`,
      });
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403, headers: SECURITY_HEADERS }
      );
    }
    
    // 🔐 SÉCURITÉ 1: Rate Limiting (anti-spam/DDoS)
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitResult = await checkRateLimit(clientIp);
    if (!rateLimitResult.success) {
      console.log(`🚫 Rate limit exceeded for IP: ${clientIp}`);
      logSecurityEvent({
        type: 'rate_limit_exceeded',
        ip: clientIp,
        severity: 'high',
        details: `Rate limit exceeded: ${rateLimitResult.retryAfter}s retry`,
      });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429, 
          headers: { ...SECURITY_HEADERS, ...getCorsHeaders(origin) } 
        }
      );
    }

    const body = await request.json();
    console.log('📥 Received briefing payload from IP:', clientIp);

    // 🔐 SÉCURITÉ 2: Honeypot (anti-bot)
    const honeypotResult = verifyHoneypot(body);
    if (!honeypotResult.success) {
      console.log('🤖 Bot detected via honeypot');
      logSecurityEvent({
        type: 'bot_detected',
        ip: clientIp,
        severity: 'medium',
        details: `Honeypot triggered: ${honeypotResult.reason}`,
      });
      // On retourne un succès pour tromper le bot
      return NextResponse.json(
        { success: true, message: 'Thank you for your submission' },
        { status: 200, headers: { ...SECURITY_HEADERS, ...getCorsHeaders(origin) } }
      );
    }

    // 🔐 SÉCURITÉ 3: Validation stricte + Sanitization (Zod + anti-injection)
    const validationResult = validateAndSanitizeBriefing(body);
    
    if (!validationResult.success) {
      console.log('❌ Validation failed:', validationResult.error);
      
      // Log security issue si détecté
      if (validationResult.securityIssue) {
        console.warn(`🚨 SECURITY ALERT from IP ${clientIp}: ${validationResult.securityIssue}`);
        logSecurityEvent({
          type: validationResult.securityIssue.includes('injection') || validationResult.securityIssue.includes('pattern') 
            ? 'injection_attempt' 
            : 'suspicious_content',
          ip: clientIp,
          severity: 'critical',
          details: validationResult.securityIssue,
        });
      } else {
        logSecurityEvent({
          type: 'validation_failed',
          ip: clientIp,
          severity: 'low',
          details: `Validation error: ${validationResult.error}`,
        });
      }
      
      return NextResponse.json(
        { success: false, error: validationResult.error },
        { status: 400, headers: { ...SECURITY_HEADERS, ...getCorsHeaders(origin) } }
      );
    }

    const sanitizedData = validationResult.data!;
    console.log('✅ Data validated and sanitized successfully');

    // 🌐 Ajouter la langue (par défaut FR si non fourni)
    const lang = body.lang || 'fr';
    const dataWithLang = { ...sanitizedData, lang };

    // 🔐 SÉCURITÉ 4: Signature HMAC pour authentifier la requête vers n8n
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET || 'nl-project-secret-key-2024';
    const payloadString = JSON.stringify(dataWithLang);
    const signature = generateWebhookSignature(payloadString, webhookSecret);

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://78.47.62.117:5678/webhook/formulaire-briefing';

    console.log('📤 Sending signed payload to n8n workflow');

    const res = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Client-IP': clientIp,
        'User-Agent': 'NL-Project-API/1.0',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
      body: payloadString,
    });

    console.log('📥 n8n response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Error from n8n webhook: ${n8nWebhookUrl}`);
      console.error(`Status: ${res.status}, Error: ${errorText}`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to process briefing. Please try again.' 
        },
        { status: 502, headers: SECURITY_HEADERS }
      );
    }

    let responseData = { success: true };
    try {
      const text = await res.text();
      if (text && text.trim().length > 0) {
        responseData = JSON.parse(text);
      }
    } catch (e) {
      console.log('⚠️ Response is not JSON, but request was successful');
    }
    
    console.log('✅ Briefing successfully sent to n8n');
    
    return NextResponse.json({ 
      success: true, 
      message: responseData.message || 'Briefing received successfully' 
    }, { 
      headers: { 
        ...SECURITY_HEADERS,
        ...getCorsHeaders(origin),
        'Cache-Control': 'no-store' 
      } 
    });

  } catch (error: any) {
    console.error('💥 Global API error:', error);
    
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'Request timeout. Please try again.' },
        { status: 504, headers: SECURITY_HEADERS }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again.' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}



















