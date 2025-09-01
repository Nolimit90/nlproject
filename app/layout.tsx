import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageProvider from '@/i18n/LanguageProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NL Project - Web Developer | Paris',
  description: "I'm Chris Henock, a developer in Paris. I mix clean design with marketing sense to build sites that turn visitors into customers.",
  authors: [{ name: 'Chris Henock' }],
  keywords: ['web developer', 'Paris', 'NL Project', 'Chris Henock', 'website design', 'development', 'performance', 'optimization'],
  creator: 'Chris Henock',
  publisher: 'NL Project',
  robots: 'index, follow',
  metadataBase: new URL('https://nlproject.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NL Project - Web Developer',
    description: "I'm Chris Henock, a developer in Paris. I mix clean design with marketing sense to build sites that turn visitors into customers.",
    url: 'https://nlproject.dev/',
    siteName: 'NL Project',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NL Project - Web Developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NL Project - Web Developer',
    description: "I'm Chris Henock, a developer in Paris. I mix clean design with marketing sense to build sites that turn visitors into customers.",
    images: ['/og-image.jpg'],
  },
  // Optimisations de performance
  other: {
    'theme-color': '#2D5A27',
    'color-scheme': 'light',
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
