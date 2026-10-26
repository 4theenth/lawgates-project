import React, { useState, useEffect } from 'react';

interface TimelineLoadingBarProps {
  isLoading: boolean;
  className?: string;
}

/**
 * Loading progress bar untuk card timeline.
 * Menampilkan animasi progress yang berjalan bertahap saat memuat data,
 * dan melesat penuh ke 100% saat data selesai dimuat sebelum memudar halus.
 */
export function TimelineLoadingBar({ isLoading, className = '' }: TimelineLoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;
    let tFade: NodeJS.Timeout;
    let tReset: NodeJS.Timeout;

    if (isLoading) {
      setIsVisible(true);
      // Mulai dengan 15%
      setProgress((prev) => (prev > 0 && prev < 90 ? prev : 15));

      t1 = setTimeout(() => {
        setProgress((prev) => Math.max(prev, 42));
      }, 150);

      t2 = setTimeout(() => {
        setProgress((prev) => Math.max(prev, 72));
      }, 450);

      t3 = setTimeout(() => {
        setProgress((prev) => Math.max(prev, 88));
      }, 900);
    } else if (isVisible) {
      // Ketika loading selesai: penuhi bar sampai 100% agar user melihat loading selesai tuntas
      setProgress(100);

      // Tahan di 100% selama 320ms agar terlihat jelas oleh mata
      tFade = setTimeout(() => {
        setIsVisible(false);
        // Setelah animasi fade-out selesai (300ms), reset progress kembali ke 0%
        tReset = setTimeout(() => {
          setProgress(0);
        }, 300);
      }, 320);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tFade);
      clearTimeout(tReset);
    };
  }, [isLoading, isVisible]);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      className={`absolute top-0 left-0 right-0 h-[3.5px] bg-neu-100 overflow-hidden z-30 transition-opacity duration-300 pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden={!isVisible}
    >
      <div
        className="h-full bg-pr-900 transition-all duration-300 ease-out shadow-xs"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
