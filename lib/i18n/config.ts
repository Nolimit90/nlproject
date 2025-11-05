export const supportedLocales = ['en', 'fr'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'fr';
export const LOCALE_COOKIE = 'locale';
