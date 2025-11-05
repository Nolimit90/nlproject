/**
 * 📊 MONITORING & ALERTES - Surveillance de la sécurité
 */

export interface SecurityEvent {
  type: 'bot_detected' | 'rate_limit_exceeded' | 'suspicious_content' | 'validation_failed' | 'injection_attempt' | 'blocked_ip';
  ip: string;
  timestamp: number;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Store des événements de sécurité (en mémoire pour l'instant)
// Pour production: utiliser une vraie DB ou service de logging
const securityEvents: SecurityEvent[] = [];
const MAX_EVENTS_STORED = 1000;

/**
 * Log un événement de sécurité
 */
export function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: Date.now(),
  };
  
  // Ajouter l'événement
  securityEvents.push(fullEvent);
  
  // Limiter la taille du store
  if (securityEvents.length > MAX_EVENTS_STORED) {
    securityEvents.shift(); // Retirer le plus ancien
  }
  
  // Log dans la console selon la sévérité
  const emoji = {
    low: '📝',
    medium: '⚠️',
    high: '🚨',
    critical: '🔴',
  }[event.severity];
  
  console.log(`${emoji} [SECURITY ${event.severity.toUpperCase()}] ${event.type} from ${event.ip}: ${event.details}`);
  
  // Envoyer une alerte pour les événements critiques
  if (event.severity === 'critical' || event.severity === 'high') {
    sendSecurityAlert(fullEvent).catch(err => 
      console.error('Failed to send security alert:', err)
    );
  }
}

/**
 * Envoie une alerte de sécurité (Telegram ou Email)
 */
async function sendSecurityAlert(event: SecurityEvent): Promise<void> {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_ALERT_CHAT_ID;
  
  if (!telegramToken || !telegramChatId) {
    console.warn('⚠️ Telegram alerts not configured');
    return;
  }
  
  const message = `
🔴 *ALERTE SÉCURITÉ ${event.severity.toUpperCase()}*

*Type:* ${event.type.replace(/_/g, ' ').toUpperCase()}
*IP:* \`${event.ip}\`
*Détails:* ${event.details}
*Date:* ${new Date(event.timestamp).toLocaleString('fr-FR')}

⚠️ Action requise: Vérifier les logs
  `.trim();
  
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );
    
    if (!response.ok) {
      console.error('Failed to send Telegram alert:', await response.text());
    } else {
      console.log('✅ Security alert sent to Telegram');
    }
  } catch (error) {
    console.error('Error sending Telegram alert:', error);
  }
}

/**
 * Récupère les événements de sécurité récents
 */
export function getRecentSecurityEvents(
  limit: number = 50,
  severity?: SecurityEvent['severity']
): SecurityEvent[] {
  let events = [...securityEvents].reverse(); // Plus récents en premier
  
  if (severity) {
    events = events.filter(e => e.severity === severity);
  }
  
  return events.slice(0, limit);
}

/**
 * Récupère les statistiques de sécurité
 */
export function getSecurityStats(lastHours: number = 24): {
  totalEvents: number;
  bySeverity: Record<SecurityEvent['severity'], number>;
  byType: Record<SecurityEvent['type'], number>;
  topOffendingIPs: Array<{ ip: string; count: number }>;
} {
  const cutoffTime = Date.now() - (lastHours * 60 * 60 * 1000);
  const recentEvents = securityEvents.filter(e => e.timestamp >= cutoffTime);
  
  // Compter par sévérité
  const bySeverity: Record<SecurityEvent['severity'], number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };
  
  // Compter par type
  const byType: Record<string, number> = {};
  
  // Compter par IP
  const ipCounts: Record<string, number> = {};
  
  recentEvents.forEach(event => {
    bySeverity[event.severity]++;
    byType[event.type] = (byType[event.type] || 0) + 1;
    ipCounts[event.ip] = (ipCounts[event.ip] || 0) + 1;
  });
  
  // Top IPs offensives
  const topOffendingIPs = Object.entries(ipCounts)
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return {
    totalEvents: recentEvents.length,
    bySeverity,
    byType: byType as Record<SecurityEvent['type'], number>,
    topOffendingIPs,
  };
}

/**
 * Nettoie les anciens événements (à appeler périodiquement)
 */
export function cleanupOldSecurityEvents(olderThanDays: number = 7): number {
  const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000);
  const initialLength = securityEvents.length;
  
  // Filtrer pour garder uniquement les événements récents
  const recentEvents = securityEvents.filter(e => e.timestamp >= cutoffTime);
  
  // Vider et remplir avec les événements récents
  securityEvents.length = 0;
  securityEvents.push(...recentEvents);
  
  const removed = initialLength - securityEvents.length;
  if (removed > 0) {
    console.log(`🧹 Cleaned up ${removed} old security events`);
  }
  
  return removed;
}

