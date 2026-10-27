import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface ActionMenuItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

export interface ActionMenuProps {
  /** Elemen pemicu yang diklik untuk membuka menu (misal: tombol titik tiga) */
  trigger?: React.ReactNode;
  /** Daftar aksi menu */
  items: ActionMenuItem[];
  /** Judul header menu (default: "Aksi") */
  title?: string;
  /** Posisi dropdown relatif terhadap trigger (default: "right") */
  align?: 'left' | 'right';
  className?: string;
  /** Controlled state (opsional jika dikontrol dari luar) */
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Komponen Universal Action Menu Popover
 * Sesuai Figma node #3190:74296
 *
 * Dimensi lebar 138px, rounded 10px, border Neutral/50, shadow 0px 1px 6.4px rgba(0,0,0,0.11).
 * Reusable untuk:
 * - Aksi folder koleksi bookmark (Ganti Nama, Hapus Folder)
 * - Aksi tabel admin
 */
export function ActionMenu({
  trigger,
  items,
  title = 'Aksi',
  align = 'right',
  className = '',
  isOpen: controlledOpen,
  onClose: controlledClose,
}: ActionMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = typeof controlledOpen === 'boolean';
  const open = isControlled ? controlledOpen : internalOpen;

  const handleClose = useCallback(() => {
    if (isControlled) {
      controlledClose?.();
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, controlledClose]);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isControlled) {
      if (open) controlledClose?.();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  // Close on outside click and ESC key
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleClose]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {trigger && (
        <div onClick={toggleOpen} className="cursor-pointer">
          {trigger}
        </div>
      )}

      {open && (
        <div
          className={`absolute z-50 mt-1.5 w-[138px] bg-white border border-neu-50 rounded-[10px] p-[5px_12px] shadow-[0px_2px_10px_rgba(0,0,0,0.08)] select-none transition-all duration-200 ease-out animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 ${
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Title */}
          {title && (
            <>
              <div className="font-sans text-[12px] font-medium text-neu-900 py-1">
                {title}
              </div>
              <div className="border-b border-neu-50 -mx-[12px] my-1" />
            </>
          )}

          {/* List Action Items */}
          <div className="flex flex-col gap-0.5">
            {items.map((item, idx) => {
              const Icon = item.icon;
              const isDanger = item.variant === 'danger';

              return (
                <React.Fragment key={item.label || idx}>
                  {/* Jika item danger dan bukan item pertama, beri divider pembatas */}
                  {isDanger && idx > 0 && (
                    <div className="border-b border-neu-50 -mx-[12px] my-1" />
                  )}

                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      handleClose();
                      item.onClick();
                    }}
                    className={`w-full flex items-center gap-2 py-1 text-left font-sans text-[12px] font-normal leading-[18px] transition-colors cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDanger
                        ? 'text-dan-900 hover:text-dan-800'
                        : 'text-neu-800 hover:text-neu-900'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isDanger ? 'text-dan-900' : 'text-neu-800'
                        }`}
                      />
                    )}
                    <span className="truncate">{item.label}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ActionMenuPortal
 * Versi fixed portal untuk tabel dengan overflow-hidden
 */
export function ActionMenuPortal({
  isOpen,
  onClose,
  anchorRect,
  items,
  title = 'Aksi',
  width = 138,
}: {
  isOpen: boolean;
  onClose: () => void;
  anchorRect?: DOMRect | { top: number; left: number; bottom: number; right: number } | null;
  items: ActionMenuItem[];
  title?: string;
  width?: number;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleScroll = () => onClose();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('touchstart', handlePointerDown, true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
      document.removeEventListener('touchstart', handlePointerDown, true);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !anchorRect || typeof document === 'undefined') return null;

  const top = anchorRect.bottom + 4;
  const left = Math.max(8, Math.min(window.innerWidth - width - 8, anchorRect.left - (width - 32)));

  return createPortal(
    <div
      ref={menuRef}
      style={{ top: `${top}px`, left: `${left}px`, width: `${width}px` }}
      className="fixed z-50 bg-white border border-neu-50 rounded-[10px] p-[5px_12px] shadow-[0px_1px_6.4px_0px_rgba(0,0,0,0.11)] select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      {title && (
        <>
          <div className="font-sans text-[12px] font-medium text-neu-900 py-1">
            {title}
          </div>
          <div className="border-b border-neu-50 -mx-[12px] my-1" />
        </>
      )}

      <div className="flex flex-col gap-0.5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isDanger = item.variant === 'danger';

          return (
            <React.Fragment key={item.label || idx}>
              {isDanger && idx > 0 && (
                <div className="border-b border-neu-50 -mx-[12px] my-1" />
              )}

              <button
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  onClose();
                  item.onClick();
                }}
                className={`w-full flex items-center gap-2 py-1 text-left font-sans text-[12px] font-normal leading-[18px] transition-colors cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDanger
                    ? 'text-dan-900 hover:text-dan-800'
                    : 'text-neu-800 hover:text-neu-900'
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isDanger ? 'text-dan-900' : 'text-neu-800'
                    }`}
                  />
                )}
                <span className="truncate">{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>,
    document.body
  );
}

export default ActionMenu;
