/**
 * 🛡️ VALIDATION & SANITIZATION - Protection contre injections et données malveillantes
 */

import { z } from 'zod';
import validator from 'validator';

/**
 * Schema Zod pour validation stricte du briefing
 */
export const BriefingSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'First name contains invalid characters'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Last name contains invalid characters'),
  
  email: z
    .string()
    .email('Invalid email format')
    .min(5, 'Email too short')
    .max(100, 'Email too long')
    .refine((email) => {
      // Validation supplémentaire avec validator.js
      return validator.isEmail(email);
    }, 'Invalid email format'),
  
  telephone: z
    .string()
    .optional()
    .refine((phone) => {
      if (!phone || phone.trim() === '') return true;
      // Accepte formats internationaux: +33, 00, ou local
      return /^[\d\s\+\(\)\-\.]+$/.test(phone) && phone.replace(/\D/g, '').length >= 8;
    }, 'Invalid phone number format'),
  
  clientType: z.enum(['NewProject', 'Company', 'Freelance', 'Startup', 'Other'], {
    errorMap: () => ({ message: 'Invalid client type' }),
  }),
  
  businessObjective: z
    .string()
    .min(10, 'Business objective must be at least 10 characters')
    .max(1000, 'Business objective must be less than 1000 characters'),
  
  existingWebsite: z
    .string()
    .optional()
    .refine((url) => {
      if (!url || url.trim() === '') return true;
      return validator.isURL(url, {
        protocols: ['http', 'https'],
        require_protocol: false,
      });
    }, 'Invalid website URL'),
  
  budget: z.enum(
    ['< 3000€', '3000€ - 5000€', '5000€ - 10 000€', '+10 000€'],
    { errorMap: () => ({ message: 'Invalid budget selection' }) }
  ),
});

export type BriefingData = z.infer<typeof BriefingSchema>;

/**
 * Liste noire de domaines email suspects (anti-spam)
 */
const SUSPICIOUS_EMAIL_DOMAINS = [
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'throwaway.email',
  'mailinator.com',
  'maildrop.cc',
  'trashmail.com',
  'yopmail.com',
];

/**
 * Patterns suspects dans le contenu (anti-spam/injection)
 */
const SUSPICIOUS_PATTERNS = [
  /<script[^>]*>.*?<\/script>/gi, // Scripts
  /<iframe[^>]*>.*?<\/iframe>/gi, // iframes
  /javascript:/gi, // Javascript protocol
  /on\w+\s*=/gi, // Event handlers (onclick, onerror, etc.)
  /(union|select|insert|update|delete|drop|create|alter)\s+(all|distinct|table|from|where)/gi, // SQL injection basique
];

/**
 * Vérifie si l'email utilise un domaine suspect
 */
export function isSuspiciousEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return true;
  
  return SUSPICIOUS_EMAIL_DOMAINS.some((suspicious) =>
    domain.includes(suspicious)
  );
}

/**
 * Détecte des patterns suspects dans le texte
 */
export function containsSuspiciousPatterns(text: string): boolean {
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Sanitize une chaîne de caractères
 */
export function sanitizeString(input: string): string {
  // Trim whitespace
  let sanitized = input.trim();
  
  // Escape HTML entities
  sanitized = validator.escape(sanitized);
  
  // Normalise whitespace
  sanitized = sanitized.replace(/\s+/g, ' ');
  
  return sanitized;
}

/**
 * Validation et sanitisation complète du briefing
 */
export function validateAndSanitizeBriefing(data: unknown): {
  success: boolean;
  data?: BriefingData;
  error?: string;
  securityIssue?: string;
} {
  // Validation schema Zod
  const result = BriefingSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message).join(', ');
    return { success: false, error: errors };
  }
  
  const validData = result.data;
  
  // Vérifications de sécurité supplémentaires
  
  // 1. Email suspect
  if (isSuspiciousEmail(validData.email)) {
    return {
      success: false,
      error: 'Please use a valid professional email address',
      securityIssue: 'Suspicious email domain detected',
    };
  }
  
  // 2. Patterns suspects dans businessObjective
  if (containsSuspiciousPatterns(validData.businessObjective)) {
    return {
      success: false,
      error: 'Invalid content detected in your message',
      securityIssue: 'Suspicious patterns detected',
    };
  }
  
  // 3. Sanitisation des données
  const sanitizedData: BriefingData = {
    firstName: sanitizeString(validData.firstName),
    lastName: sanitizeString(validData.lastName),
    email: validData.email.toLowerCase().trim(),
    telephone: validData.telephone?.trim() || '',
    clientType: validData.clientType,
    businessObjective: sanitizeString(validData.businessObjective),
    existingWebsite: validData.existingWebsite?.trim() || '',
    budget: validData.budget,
  };
  
  return { success: true, data: sanitizedData };
}

