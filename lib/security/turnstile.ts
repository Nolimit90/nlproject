/**
 * 🛡️ CLOUDFLARE TURNSTILE - Protection CAPTCHA gratuite
 * Documentation: https://developers.cloudflare.com/turnstile/
 */

/**
 * Vérifie le token Turnstile côté serveur
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  // Si TURNSTILE_SECRET_KEY n'est pas configuré, on skip (dev mode)
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('⚠️ TURNSTILE_SECRET_KEY not configured - CAPTCHA verification disabled');
    return { success: true };
  }
  
  if (!token || token.trim() === '') {
    return { success: false, error: 'CAPTCHA token is required' };
  }
  
  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }
    
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('❌ Turnstile verification failed:', data['error-codes']);
      return {
        success: false,
        error: 'CAPTCHA verification failed. Please try again.',
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('💥 Turnstile API error:', error);
    return {
      success: false,
      error: 'CAPTCHA verification error. Please try again.',
    };
  }
}

