import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../../globals.css';
import AtelierAsterHeader from '@/components/atelier-aster/AtelierAsterHeader';
import AtelierAsterFooter from '@/components/atelier-aster/AtelierAsterFooter';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ATELIER ASTER - Project 002 – Timeless Blue | Luxury Watches',
  description: 'Discover the art of precision watchmaking. ATELIER ASTER presents Project 002 – Timeless Blue, a masterpiece of Swiss craftsmanship.',
  authors: [{ name: 'ATELIER ASTER' }],
  keywords: ['luxury watches', 'Swiss craftsmanship', 'precision timepieces', 'ATELIER ASTER', 'Project 002'],
  creator: 'ATELIER ASTER',
  publisher: 'ATELIER ASTER',
  robots: 'index, follow',
  openGraph: {
    title: 'ATELIER ASTER - Project 002 – Timeless Blue',
    description: 'Discover the art of precision watchmaking. ATELIER ASTER presents Project 002 – Timeless Blue, a masterpiece of Swiss craftsmanship.',
    url: 'https://atelier-aster.demo/',
    siteName: 'ATELIER ASTER',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://source.unsplash.com/1600x900/?watch,luxury,blue',
        width: 1600,
        height: 900,
        alt: 'ATELIER ASTER - Project 002',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATELIER ASTER - Project 002 – Timeless Blue',
    description: 'Discover the art of precision watchmaking. ATELIER ASTER presents Project 002 – Timeless Blue, a masterpiece of Swiss craftsmanship.',
    images: ['https://source.unsplash.com/1600x900/?watch,luxury,blue'],
  },
};

export default function AtelierAsterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased bg-white text-black`}>
        <AtelierAsterHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <AtelierAsterFooter />
      </body>
    </html>
  );
}
