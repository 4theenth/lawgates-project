import React from 'react';

export type IconButtonVariant = 'default' | 'ghost' | 'outline' | 'primary';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  badge?: React.ReactNode;
  title?: string;
  className?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default:
    'bg-white border border-neu-100 text-neu-800 hover:bg-neu-50 hover:text-black shadow-2xs',
  ghost:
    'bg-transparent border-transparent text-neu-600 hover:bg-neu-50 hover:text-neu-900',
  outline:
    'bg-transparent border border-neu-200 text-neu-700 hover:bg-neu-50 hover:text-neu-900 shadow-2xs',
  primary:
    'bg-pr-900 border border-pr-900 text-white hover:bg-pr-800 shadow-2xs',
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'w-[28px] h-[28px] rounded-[8px]',
  md: 'w-[34px] h-[34px] rounded-[10px]',
  lg: 'w-[40px] h-[40px] rounded-[12px]',
};

export function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  badge,
  title,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      title={title}
      aria-label={title}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center transition-colors cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon}
      {badge && <span className="absolute">{badge}</span>}
    </button>
  );
}

export default IconButton;
