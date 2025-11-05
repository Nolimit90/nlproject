/**
 * 🛡️ WEBHOOK AUTHENTICATION - Protection du webhook n8n
 * Empêche les appels non autorisés au workflow
 */

import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Génère une signature HMAC pour authentifier le webhook
 */
export function generateWebhookSignature(
  payload: string,
  secret: string
): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * Vérifie la signature du webhook (timing-safe comparison)
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = generateWebhookSignature(payload, secret);
  
  try {
    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(signature);
    
    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }
    
    return timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Crée les headers d'authentification pour le webhook n8n
 */
export function createWebhookAuthHeaders(payload: object): Record<string, string> {
  const secret = process.env.WEBHOOK_SECRET;
  
  if (!secret) {
    console.warn('⚠️ WEBHOOK_SECRET not configured - Webhook authentication disabled');
    return {};
  }
  
  const payloadString = JSON.stringify(payload);
  const signature = generateWebhookSignature(payloadString, secret);
  const timestamp = Date.now().toString();
  
  return {
    'X-Webhook-Signature': signature,
    'X-Webhook-Timestamp': timestamp,
  };
}

