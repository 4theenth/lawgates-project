import { useState, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
}

/**
 * Komponen animasi angka bertambah secara halus (CountUp)
 */
export function CountUp({ end, duration = 2500 }: CountUpProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Ease out expo formula
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      setCount(Math.floor(end * easeOut));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <>{new Intl.NumberFormat('id-ID').format(count)}</>;
}
