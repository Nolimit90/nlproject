'use client';
import SiteHeader from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import ClientPageContent from '@/components/client-page-content';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <ClientPageContent />
      </main>
      <SiteFooter />
    </div>
  );
} 