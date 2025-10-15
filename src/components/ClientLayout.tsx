'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TelegramButton from '@/components/TelegramButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <TelegramButton />
    </>
  );
}





