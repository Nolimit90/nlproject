import 'server-only';
import { Locale } from './config';

export async function getDictionary(locale: Locale) {
  const dict = (await import(`../../dictionaries/${locale}.ts`)).default;
  return dict as Record<string, any>;
}
