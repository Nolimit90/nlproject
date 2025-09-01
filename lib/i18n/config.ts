export const supportedLocales = ['en', 'fr'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'en';
export const LOCALE_COOKIE = 'locale';
