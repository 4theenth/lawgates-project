import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

export type RelationType = 'mengubah' | 'diubah' | 'mencabut' | 'dicabut';

export interface RelationOption {
  value: RelationType;
  label: string;
  dotColor: string;
}

const RELATION_OPTIONS: RelationOption[] = [
  {
    value: 'mengubah',
    label: 'Mengubah',
    dotColor: 'bg-amber-500',
  },
  {
    value: 'diubah',
    label: 'Diubah oleh',
    dotColor: 'bg-blue-500',
  },
  {
    value: 'mencabut',
    label: 'Mencabut',
    dotColor: 'bg-dan-700',
  },
  {
    value: 'dicabut',
    label: 'Dicabut oleh',
    dotColor: 'bg-neu-400',
  },
];

export interface RelationTypeDropdownProps {
  value: RelationType;
  onChange: (newValue: RelationType) => void;
  disabled?: boolean;
  className?: string;
}

export function RelationTypeDropdown({
  value,
  onChange,
  disabled = false,
  className = '',
}: RelationTypeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  const activeOption = RELATION_OPTIONS.find((opt) => opt.value === value) || RELATION_OPTIONS[0];

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuHeight = 150;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpwards = spaceBelow < menuHeight && rect.top > menuHeight;

    setMenuPosition({
      top: openUpwards ? rect.top - menuHeight - 4 : rect.bottom + 4,
      left: Math.max(8, Math.min(window.innerWidth - 150, rect.left)),
      width: Math.max(135, rect.width),
    });
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleScroll = (e: Event) => {
      // Jangan tutup saat yang di-scroll adalah area di dalam menu itu sendiri,
      // karena hal itu membuat menu tampak berkedip lalu hilang.
      const target = e.target as Node | null;
      if (target && menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      // Kontainer dokumen (bukan elemen) tetap diperlakukan sebagai scroll halaman.
      setIsOpen(false);
    };

    const handleResize = () => setIsOpen(false);

    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('touchstart', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
      document.removeEventListener('touchstart', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-neu-800 bg-white border border-neu-100 rounded-[8px] hover:bg-neu-50/60 hover:border-neu-200 transition-all cursor-pointer shadow-2xs focus:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 disabled:opacity-50 disabled:cursor-not-allowed select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${activeOption.dotColor} shrink-0`} />
        <span className="truncate">{activeOption.label}</span>
        <ChevronDown
          className={`w-3 h-3 text-neu-400 transition-transform duration-150 shrink-0 ${
            isOpen ? 'rotate-180 text-neu-700' : ''
          }`}
        />
      </button>

      {/* Floating Menu Popover via Portal */}
      {isOpen &&
        menuPosition &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              minWidth: `${menuPosition.width}px`,
              zIndex: 9999,
            }}
            role="listbox"
            className="bg-white border border-neu-100 rounded-[10px] p-1 shadow-[0px_4px_16px_rgba(0,0,0,0.08)] animate-in fade-in zoom-in-95 duration-100 select-none flex flex-col gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {RELATION_OPTIONS.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[12px] transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-neu-50 text-pr-900 font-semibold'
                      : 'text-neu-700 hover:text-neu-900 hover:bg-neu-50/70 font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${opt.dotColor} shrink-0`} />
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-pr-900 stroke-[2.5] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}

export default RelationTypeDropdown;
