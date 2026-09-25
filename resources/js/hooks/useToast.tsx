import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Toast, ToastItem, ToastType } from '@/Components/common/Toast';

export type { ToastType };

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

export interface FlashProps {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
  toast: {
    success: (message?: string, description?: string, duration?: number) => void;
    delete: (message?: string, description?: string, duration?: number) => void;
    deleted: (message?: string, description?: string, duration?: number) => void;
    error: (message?: string, description?: string, duration?: number) => void;
    warning: (message?: string, description?: string, duration?: number) => void;
    info: (message?: string, description?: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({
  children,
  initialFlash,
}: {
  children: React.ReactNode;
  initialFlash?: FlashProps;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const processedFlashRef = useRef<string>('');

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({
    id = String(Date.now() + Math.random()),
    type = 'success',
    message,
    description,
    duration = 3500,
  }: ToastOptions) => {
    setToasts((prev) => [
      ...prev.slice(-2), // Batasi maksimal 3 toast sekaligus agar tidak menumpuk layar
      { id, type, message, description, duration },
    ]);
  }, []);

  const toast = useMemo(() => ({
    success: (message: string = 'Data berhasil disimpan', description?: string, duration?: number) =>
      showToast({ type: 'success', message, description, duration }),
    delete: (message: string = 'Data berhasil dihapus', description?: string, duration?: number) =>
      showToast({ type: 'delete', message, description, duration }),
    deleted: (message: string = 'Data berhasil dihapus', description?: string, duration?: number) =>
      showToast({ type: 'delete', message, description, duration }),
    error: (message: string = 'Data gagal disimpan / dihapus', description?: string, duration?: number) => {
      // Sanitasi pesan teknis / stack trace / PHP exception agar tidak pernah bocor ke tampilan user
      let safeMessage = message;
      let safeDesc = description;
      if (
        typeof safeMessage === 'string' &&
        (safeMessage.includes('\\') ||
          safeMessage.includes('League\\Flysystem') ||
          safeMessage.includes('Exception') ||
          safeMessage.includes('SQLSTATE') ||
          safeMessage.includes('Fatal error') ||
          (safeMessage.toLowerCase().includes('not found') && safeMessage.includes('\\')))
      ) {
        console.error('[Technical Error Intercepted]:', safeMessage);
        safeMessage = 'Terjadi kesalahan sistem saat memproses tindakan Anda.';
        safeDesc = 'Silakan coba beberapa saat lagi atau hubungi administrator.';
      }
      showToast({ type: 'error', message: safeMessage, description: safeDesc, duration });
    },
    warning: (message: string = 'Perhatian', description?: string, duration?: number) =>
      showToast({ type: 'warning', message, description, duration }),
    info: (message: string = 'Informasi', description?: string, duration?: number) =>
      showToast({ type: 'info', message, description, duration }),
  }), [showToast]);

  const handleFlash = useCallback(
    (flash?: FlashProps) => {
      if (!flash) return;
      const key = `${flash.success || ''}:::${flash.error || ''}:::${flash.warning || ''}:::${flash.info || ''}`;
      if (key === '::::::') return;
      if (processedFlashRef.current === key) return;
      processedFlashRef.current = key;

      if (flash.success) {
        toast.success(flash.success);
      }
      if (flash.error) {
        toast.error(flash.error);
      }
      if (flash.warning) {
        toast.warning(flash.warning);
      }
      if (flash.info) {
        toast.info(flash.info);
      }
    },
    [toast]
  );

  // Tangani flash pada saat initial page load
  useEffect(() => {
    if (initialFlash) {
      handleFlash(initialFlash);
    }
  }, [initialFlash, handleFlash]);

  // Tangani flash otomatis pada setiap visit / redirect Inertia (termasuk logout dan navigasi ke URL yang sama)
  useEffect(() => {
    const unregisterSuccess = router.on('success', (event) => {
      const pageFlash = (event.detail.page.props as any)?.flash as FlashProps | undefined;
      if (pageFlash && (pageFlash.success || pageFlash.error || pageFlash.warning || pageFlash.info)) {
        handleFlash(pageFlash);
      } else {
        processedFlashRef.current = '';
      }
    });

    const unregisterFinish = router.on('finish', () => {
      // Bersihkan processed key setelah aksi selesai agar flash berikutnya dengan pesan yang sama bisa tampil
      setTimeout(() => {
        processedFlashRef.current = '';
      }, 300);
    });

    return () => {
      unregisterSuccess();
      unregisterFinish();
    };
  }, [handleFlash]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toast }}>
      {children}

      {/* Floating Container di Kanan Atas Layar */}
      <div className="fixed top-5 right-4 sm:right-6 z-[9999] flex flex-col items-end gap-2.5 pointer-events-none max-w-[calc(100vw-2rem)]">
        {toasts.map((item) => (
          <Toast key={item.id} toast={item} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const defaultFallbackValue: ToastContextValue = {
  showToast: () => {},
  removeToast: () => {},
  toast: {
    success: (msg = 'Data berhasil disimpan') => console.log('[Toast Success]:', msg),
    delete: (msg = 'Data berhasil dihapus') => console.log('[Toast Delete]:', msg),
    deleted: (msg = 'Data berhasil dihapus') => console.log('[Toast Deleted]:', msg),
    error: (msg = 'Data gagal disimpan / dihapus') => console.error('[Toast Error]:', msg),
    warning: (msg = 'Perhatian') => console.warn('[Toast Warning]:', msg),
    info: (msg = 'Informasi') => console.info('[Toast Info]:', msg),
  },
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return defaultFallbackValue;
  }
  return context;
}
