import { useState, useEffect } from 'react';

/**
 * Hook untuk mendeteksi apakah posisi scroll window telah melebihi threshold tertentu.
 * @param threshold Jarak scroll dalam piksel (default: 50)
 * @returns boolean `isScrolled`
 */
export function useScrollPosition(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Jalankan sekali saat mount untuk mengecek posisi awal
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
