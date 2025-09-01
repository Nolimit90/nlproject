import 'server-only';
import { cookies, headers } from 'next/headers';
import { defaultLocale, supportedLocales, type Locale } from './config';

export async function getLocaleFromCookiesOrHeader(): Promise<Locale> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  
  // Try to get locale from cookie first
  const cookieLocale = cookieStore.get('locale')?.value;
  if (cookieLocale && supportedLocales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  
  // Fallback to Accept-Language header
  const acceptLanguage = headerStore.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2))
      .find(lang => supportedLocales.includes(lang as Locale));
    
    if (preferredLocale) {
      return preferredLocale as Locale;
    }
  }
  
  return defaultLocale;
}
