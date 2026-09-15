import React from 'react';

export type BadgeVariant =
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral'
  | 'primary';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-[#EAF5ED] text-[#16A34A]',
  danger: 'bg-[#FDE8E8] text-[#DC2626]',
  warning: 'bg-[#FFF3E0] text-[#D97706]',
  info: 'bg-[#EBF8FF] text-[#2563EB]',
  neutral: 'bg-neu-50 text-neu-700',
  primary: 'bg-[#E9EEF4] text-[#1E3A8A]',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-[11px] leading-tight',
  md: 'px-3 py-1 text-[12px] leading-normal',
};

export function Badge({
  variant = 'neutral',
  size = 'sm',
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium select-none transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
