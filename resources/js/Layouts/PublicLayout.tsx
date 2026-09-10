import type { ReactNode } from 'react';
import { Navbar } from '../Components/layout/Navbar';
import { Footer } from '../Components/layout/Footer';
import { useScrollPosition } from '../hooks/useScrollPosition';

// ─────────────────────────────────────────────
// Layout Tokens
// ─────────────────────────────────────────────

/**
 * Shared horizontal container used by EVERY layout element:
 * Navbar, Section, Footer, HeroSection inner content, etc.
 *
 * Apply this className to any wrapper that should align
 * with the LawGates logo edge on the left and right.
 *
 * max-w-[1196px] = content width from Figma
 * mx-auto        = center on wide screens
 * px-[120px]     = 120px horizontal padding (Figma spec)
 */
export const PAGE_CONTAINER = 'w-full max-w-[1199px] mx-auto';

/**
 * Vertical spacing between every page section — 121px (Figma spec).
 * Use the <Section> wrapper to apply this automatically.
 */
export const SECTION_SPACING = 66; // px

// ─────────────────────────────────────────────
// Section Wrapper
// ─────────────────────────────────────────────

interface SectionProps {
  children: ReactNode;
  className?: string;
  /**
   * Set true for full-bleed sections that span edge-to-edge
   * (e.g. dark banners). The horizontal container is skipped,
   * but the component should still use PAGE_CONTAINER internally.
   */
  fullWidth?: boolean;
}

/**
 * Wraps a page section with the standard 121px top spacing.
 * Also applies PAGE_CONTAINER so content aligns with the navbar.
 *
 * @example
 * <Section><StatsOverview /></Section>
 * <Section fullWidth><AboutOverview /></Section>
 */
export function Section({ children, className = '', fullWidth = false }: SectionProps) {
  return (
    <div style={{ marginTop: SECTION_SPACING }} className={className}>
      {fullWidth ? (
        children
      ) : (
        <div className={PAGE_CONTAINER}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const isScrolled = useScrollPosition(40);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col selection:bg-sec-900 selection:text-white">
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
