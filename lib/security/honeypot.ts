/**
 * 🍯 HONEYPOT - Protection anti-bot
 * 
 * Un champ caché dans le formulaire que seuls les bots rempliront
 * Les humains ne verront jamais ce champ (caché en CSS)
 */

/**
 * Vérifie si le honeypot a été rempli (indique un bot)
 */
export function verifyHoneypot(data: any): {
  success: boolean;
  reason?: string;
} {
  // Champ honeypot : doit être vide pour un humain
  const honeypotField = data._website || data.website || data._email_confirm;

  if (honeypotField && honeypotField.trim() !== '') {
    return {
      success: false,
      reason: 'Honeypot field was filled (bot detected)',
    };
  }

  // Vérification supplémentaire : le temps de soumission
  // Un bot soumet généralement trop rapidement
  const submissionTime = data._submit_time;
  if (submissionTime) {
    const timeDiff = Date.now() - parseInt(submissionTime);
    
    // Si soumis en moins de 2 secondes, c'est suspect
    if (timeDiff < 2000) {
      return {
        success: false,
        reason: 'Form submitted too quickly (bot detected)',
      };
    }
  }

  return { success: true };
}

/**
 * Génère un timestamp pour le formulaire (à ajouter côté client)
 */
export function generateFormTimestamp(): number {
  return Date.now();
}

