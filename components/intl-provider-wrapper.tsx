"use client";
import { NextIntlClientProvider } from "next-intl";

export default function IntlProviderWrapper({ locale, messages, children }: { locale: string; messages: any; children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 