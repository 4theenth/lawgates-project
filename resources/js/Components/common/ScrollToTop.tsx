import { ChevronUp } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface ScrollToTopProps {
  threshold?: number;
  positionClassName?: string;
  className?: string;
}

export function ScrollToTop({
  threshold = 300,
  positionClassName = 'bottom-8 lg:bottom-10',
  className = '',
}: ScrollToTopProps) {
  const isVisible = useScrollPosition(threshold);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
      className={`fixed ${positionClassName} right-6 sm:right-10 p-3 rounded-full bg-pr-900 border border-pr-800 text-white shadow-lg shadow-pr-900/30 transition-all duration-300 hover:bg-pr-800 hover:shadow-xl hover:-translate-y-1 active:scale-95 z-40 flex items-center justify-center cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      } ${className}`}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

export default ScrollToTop;
