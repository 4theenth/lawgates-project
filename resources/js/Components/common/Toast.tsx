import React, { useEffect, useState, useRef } from 'react';
import { Check, X, AlertTriangle, Info, Trash2, AlertCircle } from 'lucide-react';
import { TOAST_THEMES, ToastType } from '@/constants/toast';

export type { ToastType };

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

const TOAST_ICONS: Record<ToastType, React.ReactNode> = {
  success: <Check className="w-5 h-5 stroke-[2.75]" />,
  delete: <Trash2 className="w-5 h-5 stroke-[2.2]" />,
  error: <AlertCircle className="w-5 h-5 stroke-[2.4]" />,
  warning: <AlertTriangle className="w-5 h-5 stroke-[2.2]" />,
  info: <Info className="w-5 h-5 stroke-[2.2]" />,
};

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

  const theme = TOAST_THEMES[toast.type];
  const icon = TOAST_ICONS[toast.type];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative flex items-center gap-3.5 py-3 px-5 rounded-2xl ${theme.container} shadow-md transition-all animate-in fade-in slide-in-from-top-3 duration-250 min-w-[340px] max-w-lg pointer-events-auto overflow-hidden select-none`}
    >
      {/* Icon lingkaran solid sesuai LawGates theme */}
      <div
        className={`w-9 h-9 rounded-full ${theme.iconBadge} flex items-center justify-center shrink-0 shadow-2xs`}
      >
        {icon}
      </div>

      {/* Konten Pesan */}
      <div className="flex-1 min-w-0 pr-1">
        <p className={`text-[15px] font-normal ${theme.textColor} leading-tight`}>
          {toast.message}
        </p>
        {toast.description && (
          <p className={`text-[12px] ${theme.descColor} mt-0.5 leading-snug`}>
            {toast.description}
          </p>
        )}
      </div>

      {/* Tombol Tutup (X) */}
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className={`p-1.5 ${theme.closeColor} rounded-lg transition-colors cursor-pointer shrink-0 ml-1`}
        title="Tutup notifikasi"
      >
        <X className="w-5 h-5 stroke-[2]" />
      </button>

      {/* Animated Progress Bar di bawah alert */}
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${theme.progressTrack} overflow-hidden`}>
        <div
          className={`h-full ${theme.progressBar} transition-all duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
