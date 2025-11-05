/**
 * 🛡️ CORS - Protection contre les requêtes cross-origin non autorisées
 */

/**
 * Liste des origines autorisées
 */
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [
  'https://nlproject.site',
  'https://www.nlproject.site',
];

// En développement, autoriser localhost
if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push(
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  );
}

/**
 * Vérifie si l'origine est autorisée
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  
  // Retirer le trailing slash pour la comparaison
  const normalizedOrigin = origin.replace(/\/$/, '');
  
  return ALLOWED_ORIGINS.some(allowed => 
    allowed.replace(/\/$/, '') === normalizedOrigin
  );
}

/**
 * Headers CORS à ajouter aux réponses
 */
export function getCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400', // 24h
  };
  
  if (origin && isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  
  return headers;
}

/**
 * Gère la preflight request OPTIONS
 */
export function handleCorsPreflightRequest(origin: string | null): Response {
  if (!isOriginAllowed(origin)) {
    return new Response('Forbidden', { status: 403 });
  }
  
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

