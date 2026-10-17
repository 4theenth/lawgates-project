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
  success: <Check className="w-4 h-4 stroke-[2.75]" />,
  delete: <Trash2 className="w-4 h-4 stroke-[2.2]" />,
  error: <AlertCircle className="w-4 h-4 stroke-[2.4]" />,
  warning: <AlertTriangle className="w-4 h-4 stroke-[2.2]" />,
  info: <Info className="w-4 h-4 stroke-[2.2]" />,
};

export function Toast({ toast, onClose }: ToastProps) {
  const duration = toast.duration || 3500;
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = 20;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        clearInterval(timer);
        onClose(toast.id);
      } else {
        setProgress((remaining / duration) * 100);
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [duration, onClose, toast.id]);

  const theme = TOAST_THEMES[toast.type];
  const icon = TOAST_ICONS[toast.type];

  return (
    <div
      className={`relative flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl ${theme.container} shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-right-4 duration-200 min-w-[240px] sm:min-w-[280px] max-w-xs pointer-events-auto overflow-hidden select-none`}
    >
      {/* Icon lingkaran solid sesuai LawGates theme */}
      <div
        className={`w-7 h-7 rounded-full ${theme.iconBadge} flex items-center justify-center shrink-0 shadow-2xs`}
      >
        {icon}
      </div>

      {/* Konten Pesan */}
      <div className="flex-1 min-w-0 pr-0.5">
        <p className={`text-[13.5px] font-normal ${theme.textColor} leading-tight`}>
          {toast.message}
        </p>
        {toast.description && (
          <p className={`text-[11.5px] ${theme.descColor} mt-0.5 leading-tight`}>
            {toast.description}
          </p>
        )}
      </div>

      {/* Tombol Tutup (X) */}
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className={`p-1 ${theme.closeColor} rounded-md transition-colors cursor-pointer shrink-0 ml-0.5`}
        title="Tutup notifikasi"
      >
        <X className="w-4 h-4 stroke-[2]" />
      </button>

      {/* Animated Progress Bar di bawah alert */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.progressTrack} overflow-hidden`}>
        <div
          className={`h-full ${theme.progressBar} transition-all duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
