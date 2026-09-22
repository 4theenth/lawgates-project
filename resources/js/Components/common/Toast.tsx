import React, { useEffect, useState, useRef } from 'react';
import { Check, X, AlertTriangle, Info, Trash2, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'delete';

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
      container: 'bg-[#D2E7D7] border border-[#BCDCC4]',
      textColor: 'text-[#145732]',
      descColor: 'text-[#145732]/85',
      iconBadge: 'bg-[#1E8349] text-white',
      progressTrack: 'bg-[#70B58B]',
      progressBar: 'bg-[#145732]',
      closeColor: 'text-[#2D5A3D] hover:text-black',
      icon: <Check className="w-5 h-5 stroke-[2.75]" />,
    },
    delete: {
      container: 'bg-[#D2E7D7] border border-[#BCDCC4]',
      textColor: 'text-[#145732]',
      descColor: 'text-[#145732]/85',
      iconBadge: 'bg-[#1E8349] text-white',
      progressTrack: 'bg-[#70B58B]',
      progressBar: 'bg-[#145732]',
      closeColor: 'text-[#2D5A3D] hover:text-black',
      icon: <Trash2 className="w-5 h-5 stroke-[2.2]" />,
    },
    error: {
      container: 'bg-[#FCE6E8] border border-[#F8C8CC]',
      textColor: 'text-[#8C1D24]',
      descColor: 'text-[#8C1D24]/85',
      iconBadge: 'bg-[#BA1A1A] text-white',
      progressTrack: 'bg-[#ECA8AE]',
      progressBar: 'bg-[#8C1D24]',
      closeColor: 'text-[#8C1D24] hover:text-black',
      icon: <AlertCircle className="w-5 h-5 stroke-[2.4]" />,
    },
    warning: {
      container: 'bg-[#FEF3D6] border border-[#FDE6A8]',
      textColor: 'text-[#7A5A0A]',
      descColor: 'text-[#7A5A0A]/85',
      iconBadge: 'bg-[#EAB308] text-white',
      progressTrack: 'bg-[#F6D888]',
      progressBar: 'bg-[#7A5A0A]',
      closeColor: 'text-[#7A5A0A] hover:text-black',
      icon: <AlertTriangle className="w-5 h-5 stroke-[2.2]" />,
    },
    info: {
      container: 'bg-[#D7EFFE] border border-[#BCE2FD]',
      textColor: 'text-[#0C548A]',
      descColor: 'text-[#0C548A]/85',
      iconBadge: 'bg-[#0284C7] text-white',
      progressTrack: 'bg-[#90CEFA]',
      progressBar: 'bg-[#0C548A]',
      closeColor: 'text-[#0C548A] hover:text-black',
      icon: <Info className="w-5 h-5 stroke-[2.2]" />,
    },
  }[toast.type];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative flex items-center gap-3.5 py-3 px-5 rounded-[20px] ${config.container} shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all animate-in fade-in slide-in-from-top-3 duration-250 min-w-[340px] max-w-lg pointer-events-auto overflow-hidden select-none`}
    >
      {/* Icon lingkaran solid sesuai Gambar 5 */}
      <div
        className={`w-9 h-9 rounded-full ${config.iconBadge} flex items-center justify-center shrink-0 shadow-2xs`}
      >
        {config.icon}
      </div>

      {/* Konten Pesan */}
      <div className="flex-1 min-w-0 pr-1">
        <p className={`text-[15px] font-normal ${config.textColor} leading-tight`}>
          {toast.message}
        </p>
        {toast.description && (
          <p className={`text-[12px] ${config.descColor} mt-0.5 leading-snug`}>
            {toast.description}
          </p>
        )}
      </div>

      {/* Tombol Tutup (X) */}
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className={`p-1.5 ${config.closeColor} rounded-lg transition-colors cursor-pointer shrink-0 ml-1`}
        title="Tutup notifikasi"
      >
        <X className="w-5 h-5 stroke-[2]" />
      </button>

      {/* Animated Progress Bar di bawah alert sesuai Gambar 5 */}
      <div className={`absolute bottom-0 left-0 right-0 h-[5px] ${config.progressTrack} overflow-hidden`}>
        <div
          className={`h-full ${config.progressBar} transition-all duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
