import React, { createContext, useContext, useState, useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import MandatoryLoginModal from '@/Components/common/MandatoryLoginModal';

export interface AuthModalOptions {
  title?: string;
  description?: string;
  badgeText?: string;
  redirectUrl?: string;
}

export interface AuthModalContextValue {
  isOpen: boolean;
  openModal: (options?: AuthModalOptions) => void;
  closeModal: () => void;
  /**
   * requireAuth:
   * Guard function untuk aksi interaktif pengguna.
   * Jika user sudah login -> jalankan aksi langsung.
   * Jika belum login -> munculkan Mandatory Login Modal.
   */
  requireAuth: (action: () => void, options?: AuthModalOptions) => void;
  isAuthenticated: boolean;
  user: any;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const { props } = usePage();
  const user = (props as any)?.auth?.user || null;
  const isAuthenticated = Boolean(user);

  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<AuthModalOptions>({});
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const openModal = useCallback((options?: AuthModalOptions) => {
    if (options) {
      setModalOptions(options);
    } else {
      setModalOptions({});
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  const requireAuth = useCallback(
    (action: () => void, options?: AuthModalOptions) => {
      if (isAuthenticated) {
        action();
      } else {
        setPendingAction(() => action);
        openModal(options);
      }
    },
    [isAuthenticated, openModal]
  );

  const handleSuccess = useCallback(() => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        requireAuth,
        isAuthenticated,
        user,
      }}
    >
      {children}
      <MandatoryLoginModal
        show={isOpen}
        onClose={closeModal}
        title={modalOptions.title}
        description={modalOptions.description}
        badgeText={modalOptions.badgeText}
        redirectUrl={
          modalOptions.redirectUrl ||
          (typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : undefined)
        }
        onSuccess={handleSuccess}
      />
    </AuthModalContext.Provider>
  );
}

/**
 * Hook useAuthModal
 * Memungkinkan pemanggilan requireAuth(action) dari komponen manapun.
 */
export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    // Fallback jika dipanggil di luar AuthModalProvider
    return {
      isOpen: false,
      openModal: () => {},
      closeModal: () => {},
      requireAuth: (action: () => void) => action(),
      isAuthenticated: false,
      user: null,
    };
  }
  return context;
}
