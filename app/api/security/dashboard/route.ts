/**
 * 🛡️ API DASHBOARD SÉCURITÉ
 * 
 * Endpoint protégé pour visualiser les statistiques de sécurité
 * Accessible uniquement avec un token d'admin
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSecurityStats, getRecentSecurityEvents } from '@/lib/security/monitoring';
import { getRateLimitStats } from '@/lib/security/rateLimit';

/**
 * Token d'admin pour accéder au dashboard
 * ⚠️ En production, utiliser un vrai système d'authentification
 */
const ADMIN_TOKEN = process.env.SECURITY_DASHBOARD_TOKEN || 'nl-project-admin-2024';

/**
 * Vérifie le token d'admin
 */
function verifyAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_TOKEN;
}

/**
 * GET - Récupérer les statistiques de sécurité
 */
export async function GET(request: NextRequest) {
  // Vérifier l'authentification
  if (!verifyAdminToken(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const securityStats = getSecurityStats(24); // Dernières 24h
    const rateLimitStats = getRateLimitStats();
    const recentEvents = getRecentSecurityEvents(50);
    
    return NextResponse.json({
      success: true,
      data: {
        security: securityStats,
        rateLimit: rateLimitStats,
        recentEvents,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching security dashboard:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST - Actions admin (reset rate limit, etc.)
 */
export async function POST(request: NextRequest) {
  // Vérifier l'authentification
  if (!verifyAdminToken(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    const { action, ip } = body;
    
    if (action === 'reset_rate_limit' && ip) {
      const { resetRateLimit } = await import('@/lib/security/rateLimit');
      resetRateLimit(ip);
      
      return NextResponse.json({
        success: true,
        message: `Rate limit reset for IP: ${ip}`,
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error performing admin action:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

