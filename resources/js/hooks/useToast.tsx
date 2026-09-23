import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastItem, ToastType } from '@/Components/common/Toast';

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
  toast: {
    success: (message: string, description?: string, duration?: number) => void;
    delete: (message: string, description?: string, duration?: number) => void;
    error: (message: string, description?: string, duration?: number) => void;
    warning: (message: string, description?: string, duration?: number) => void;
    info: (message: string, description?: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

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

  const toast = {
    success: (message: string, description?: string, duration?: number) =>
      showToast({ type: 'success', message, description, duration }),
    delete: (message: string, description?: string, duration?: number) =>
      showToast({ type: 'delete', message, description, duration }),
    error: (message: string, description?: string, duration?: number) =>
      showToast({ type: 'error', message, description, duration }),
    warning: (message: string, description?: string, duration?: number) =>
      showToast({ type: 'warning', message, description, duration }),
    info: (message: string, description?: string, duration?: number) =>
      showToast({ type: 'info', message, description, duration }),
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toast }}>
      {children}

      {/* Floating Container di Atas Tengah Layar */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2.5 pointer-events-none">
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
    success: (msg) => console.log('[Toast Success]:', msg),
    delete: (msg) => console.log('[Toast Delete]:', msg),
    error: (msg) => console.error('[Toast Error]:', msg),
    warning: (msg) => console.warn('[Toast Warning]:', msg),
    info: (msg) => console.info('[Toast Info]:', msg),
  },
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return defaultFallbackValue;
  }
  return context;
}
