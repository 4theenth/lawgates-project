import React, { useEffect, useState, useRef } from 'react';
import { Check, Trash2, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'delete' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  const duration = toast.duration || 3500;
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = Date.now();
    const interval = 20;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newRemaining = remainingTimeRef.current - elapsed;

      if (newRemaining <= 0) {
        clearInterval(timer);
        onClose(toast.id);
      } else {
        setProgress((newRemaining / duration) * 100);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    };
  }, [isPaused, duration, onClose, toast.id]);

  const config = {
    success: {
      cardBg: 'bg-[#D6EADA]',
      textColor: 'text-[#15803D]',
      iconBadge: 'bg-[#15803D]',
      progressBar: 'bg-[#15803D]',
      trackBar: 'bg-[#15803D]/25',
      icon: <Check className="w-4 h-4 text-white stroke-[2.5]" />,
    },
    delete: {
      cardBg: 'bg-[#D6EADA]',
      textColor: 'text-[#15803D]',
      iconBadge: 'bg-[#15803D]',
      progressBar: 'bg-[#15803D]',
      trackBar: 'bg-[#15803D]/25',
      icon: <Trash2 className="w-4 h-4 text-white stroke-[2]" />,
    },
    error: {
      cardBg: 'bg-[#FCE8E8]',
      textColor: 'text-[#B72121]',
      iconBadge: 'bg-[#B72121]',
      progressBar: 'bg-[#B72121]',
      trackBar: 'bg-[#B72121]/25',
      icon: (
        <span className="text-white font-bold text-[15px] leading-none select-none">
          !
        </span>
      ),
    },
    warning: {
      cardBg: 'bg-[#FFF3E0]',
      textColor: 'text-[#D97706]',
      iconBadge: 'bg-[#D97706]',
      progressBar: 'bg-[#D97706]',
      trackBar: 'bg-[#D97706]/25',
      icon: <AlertTriangle className="w-4 h-4 text-white stroke-[2]" />,
    },
    info: {
      cardBg: 'bg-[#EBF8FF]',
      textColor: 'text-[#2563EB]',
      iconBadge: 'bg-[#2563EB]',
      progressBar: 'bg-[#2563EB]',
      trackBar: 'bg-[#2563EB]/25',
      icon: <Info className="w-4 h-4 text-white stroke-[2]" />,
    },
  }[toast.type];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative flex items-center justify-between gap-3.5 pt-3 pb-4 px-4 ${config.cardBg} rounded-[16px] shadow-lg transition-all animate-in fade-in slide-in-from-top-3 duration-200 min-w-[320px] sm:min-w-[360px] max-w-md pointer-events-auto overflow-hidden select-none`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Bulatan solid icon */}
        <div
          className={`w-7 h-7 rounded-full ${config.iconBadge} flex items-center justify-center shrink-0 shadow-2xs`}
        >
          {config.icon}
        </div>

        {/* Konten Pesan */}
        <div className="min-w-0 pr-1">
          <p className={`text-[14px] font-medium leading-tight ${config.textColor}`}>
            {toast.message}
          </p>
          {toast.description && (
            <p className={`text-[12px] opacity-80 mt-0.5 leading-snug ${config.textColor}`}>
              {toast.description}
            </p>
          )}
        </div>
      </div>

      {/* Tombol Tutup (X) */}
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="p-1 text-neu-700 hover:text-black hover:bg-black/5 rounded-md transition-colors cursor-pointer shrink-0"
        title="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Animated Progress Bar di bawah alert */}
      <div className={`absolute bottom-0 left-0 right-0 h-[4px] ${config.trackBar} overflow-hidden`}>
        <div
          className={`h-full ${config.progressBar} transition-all duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
