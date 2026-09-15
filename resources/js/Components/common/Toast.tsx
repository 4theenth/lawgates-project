import React, { useEffect, useState, useRef } from 'react';
import { CircleCheckBig, CircleAlert, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

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
      border: 'border-[#C6F6D5]',
      iconBadge: 'bg-[#EAF5ED] text-[#16A34A]',
      progressBar: 'bg-[#16A34A]',
      icon: <CircleCheckBig className="w-4 h-4 stroke-[2]" />,
    },
    error: {
      border: 'border-[#FED7D7]',
      iconBadge: 'bg-[#FFF5F5] text-[#E53E3E]',
      progressBar: 'bg-[#E53E3E]',
      icon: <CircleAlert className="w-4 h-4 stroke-[2]" />,
    },
    warning: {
      border: 'border-[#FEEBC8]',
      iconBadge: 'bg-[#FFFAF0] text-[#DD6B20]',
      progressBar: 'bg-[#DD6B20]',
      icon: <AlertTriangle className="w-4 h-4 stroke-[2]" />,
    },
    info: {
      border: 'border-[#BEE3F8]',
      iconBadge: 'bg-[#EBF8FF] text-[#3182CE]',
      progressBar: 'bg-[#3182CE]',
      icon: <Info className="w-4 h-4 stroke-[2]" />,
    },
  }[toast.type];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative flex items-center gap-3 py-2.5 px-3.5 sm:px-4 bg-white/98 backdrop-blur-md rounded-[12px] border ${config.border} shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all animate-in fade-in slide-in-from-top-3 duration-250 min-w-[280px] max-w-md pointer-events-auto overflow-hidden select-none`}
    >
      {/* Icon status */}
      <div
        className={`w-7 h-7 rounded-full ${config.iconBadge} flex items-center justify-center shrink-0`}
      >
        {config.icon}
      </div>

      {/* Konten Pesan */}
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[13px] font-semibold text-neu-900 leading-tight">
          {toast.message}
        </p>
        {toast.description && (
          <p className="text-[11px] text-neu-600 mt-0.5 leading-snug">
            {toast.description}
          </p>
        )}
      </div>

      {/* Tombol Tutup (X) */}
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="p-1 text-neu-400 hover:text-neu-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer shrink-0"
        title="Tutup notifikasi"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Animated Progress Bar di bawah alert */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-100 overflow-hidden">
        <div
          className={`h-full ${config.progressBar} transition-all duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
