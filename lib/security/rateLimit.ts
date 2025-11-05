/**
 * 🚦 RATE LIMITING - Protection anti-spam et anti-DDoS
 * 
 * Utilise un store en mémoire pour limiter le nombre de requêtes par IP
 * Pour une production à grande échelle, utiliser Redis ou Upstash
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

// Store en mémoire (pour dev/petite échelle)
// Pour production: utiliser Redis/Upstash
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Configuration du rate limiting
 */
const RATE_LIMIT_CONFIG = {
  // Limite normale: 5 requêtes par 15 minutes
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  
  // Blocage agressif si dépassement répété
  blockDuration: 60 * 60 * 1000, // 1 heure de blocage
  maxViolations: 3, // Après 3 violations, blocage d'1h
};

/**
 * Nettoie les anciennes entrées du store (garbage collection)
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    // Supprimer si la fenêtre de temps est expirée et pas bloqué
    if (entry.resetTime < now && (!entry.blockedUntil || entry.blockedUntil < now)) {
      rateLimitStore.delete(ip);
    }
  }
}

/**
 * Vérifie et applique le rate limiting pour une IP
 */
export async function checkRateLimit(
  clientIp: string
): Promise<{
  success: boolean;
  retryAfter?: number;
  remaining?: number;
}> {
  const now = Date.now();
  
  // Nettoyer le store périodiquement (1% de chance à chaque appel)
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }
  
  // Récupérer ou créer l'entrée pour cette IP
  let entry = rateLimitStore.get(clientIp);
  
  if (!entry) {
    // Première requête de cette IP
    entry = {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
    rateLimitStore.set(clientIp, entry);
    
    return {
      success: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
    };
  }
  
  // Vérifier si l'IP est bloquée
  if (entry.blockedUntil && entry.blockedUntil > now) {
    const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000);
    console.warn(`🚨 IP ${clientIp} is blocked for ${retryAfter}s`);
    
    return {
      success: false,
      retryAfter,
    };
  }
  
  // Réinitialiser le compteur si la fenêtre est expirée
  if (entry.resetTime < now) {
    entry.count = 1;
    entry.resetTime = now + RATE_LIMIT_CONFIG.windowMs;
    entry.blockedUntil = undefined;
    rateLimitStore.set(clientIp, entry);
    
    return {
      success: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
    };
  }
  
  // Incrémenter le compteur
  entry.count++;
  
  // Vérifier si la limite est dépassée
  if (entry.count > RATE_LIMIT_CONFIG.maxRequests) {
    console.warn(`⚠️ Rate limit exceeded for IP ${clientIp} (${entry.count} requests)`);
    
    // Si dépassement répété, bloquer l'IP
    if (entry.count > RATE_LIMIT_CONFIG.maxRequests + RATE_LIMIT_CONFIG.maxViolations) {
      entry.blockedUntil = now + RATE_LIMIT_CONFIG.blockDuration;
      rateLimitStore.set(clientIp, entry);
      
      console.error(`🔒 IP ${clientIp} BLOCKED for 1 hour (aggressive violation)`);
      
      return {
        success: false,
        retryAfter: Math.ceil(RATE_LIMIT_CONFIG.blockDuration / 1000),
      };
    }
    
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    rateLimitStore.set(clientIp, entry);
    
    return {
      success: false,
      retryAfter,
    };
  }
  
  rateLimitStore.set(clientIp, entry);
  
  return {
    success: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
  };
}

/**
 * Réinitialise le rate limit pour une IP (admin only)
 */
export function resetRateLimit(clientIp: string): void {
  rateLimitStore.delete(clientIp);
  console.log(`✅ Rate limit reset for IP ${clientIp}`);
}

/**
 * Retourne les statistiques du rate limiting (monitoring)
 */
export function getRateLimitStats(): {
  totalIPs: number;
  blockedIPs: number;
  ips: Array<{ ip: string; count: number; blocked: boolean }>;
} {
  const now = Date.now();
  const ips: Array<{ ip: string; count: number; blocked: boolean }> = [];
  let blockedCount = 0;
  
  for (const [ip, entry] of rateLimitStore.entries()) {
    const isBlocked = entry.blockedUntil ? entry.blockedUntil > now : false;
    if (isBlocked) blockedCount++;
    
    ips.push({
      ip,
      count: entry.count,
      blocked: isBlocked,
    });
  }
  
  return {
    totalIPs: rateLimitStore.size,
    blockedIPs: blockedCount,
    ips,
  };
}
