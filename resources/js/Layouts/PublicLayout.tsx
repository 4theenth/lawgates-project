import type { ReactNode } from 'react';
import { Navbar } from '../Components/layout/Navbar';
import { Footer } from '../Components/layout/Footer';
import { useScrollPosition } from '../hooks/useScrollPosition';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const isScrolled = useScrollPosition(40);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col selection:bg-[#D4AF37] selection:text-white">
      {/* Public Navbar */}
      <Navbar isScrolled={isScrolled} />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Public Footer */}
      <Footer />
    </div>
  );
}
