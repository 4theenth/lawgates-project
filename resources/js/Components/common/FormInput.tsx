import React, { forwardRef, useState, InputHTMLAttributes } from 'react';
import { Icon } from '@/Components/ui/icon';
import { cn } from '@/lib/utils';
import InputError from './InputError';

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    icon?: string | React.ReactNode;
    iconPosition?: 'left' | 'right';
    rightIcon?: string | React.ReactNode;
    error?: string;
    helperText?: string;
    containerClassName?: string;
    inputClassName?: string;
    isPasswordToggle?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            name,
            label,
            type = 'text',
            icon,
            iconPosition = 'left',
            rightIcon,
            error,
            helperText,
            className,
            containerClassName,
            inputClassName,
            isPasswordToggle = type === 'password',
            disabled,
            required,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const inputId = id || name;

        // Tentukan tipe aktual jika password toggle aktif
        const actualType = type === 'password' && isPasswordToggle
            ? (showPassword ? 'text' : 'password')
            : type;

        // Render helper untuk ikon
        const renderIcon = (iconContent: string | React.ReactNode, extraClass?: string) => {
            if (!iconContent) return null;
            if (typeof iconContent === 'string') {
                return (
                    <Icon
                        name={iconContent}
                        className={cn('h-5 w-5 text-neu-400 group-focus-within:text-pr-900 transition-colors', extraClass)}
                    />
                );
            }
            return <span className={cn('text-neu-400 group-focus-within:text-pr-900 transition-colors', extraClass)}>{iconContent}</span>;
        };

        const hasLeftIcon = icon && iconPosition === 'left';
        const hasRightIcon = (icon && iconPosition === 'right') || rightIcon;

        return (
            <div className={cn('w-full flex flex-col', containerClassName)}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-sm font-medium text-neu-800"
                    >
                        {label}
                        {required && <span className="ml-1 text-dan-700">*</span>}
                    </label>
                )}

                <div
                    className={cn(
                        'group relative flex w-full items-center rounded-xl border bg-white px-3.5 py-2.5 sm:py-3 transition-all duration-150',
                        error
                            ? 'border-red-500 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-500'
                            : 'border-neu-50 hover:border-neu-200 focus-within:border-pr-900 focus-within:ring-1 focus-within:ring-pr-900',
                        disabled && 'bg-neu-100 opacity-60 cursor-not-allowed',
                        className
                    )}
                >
                    {/* Left Icon */}
                    {hasLeftIcon && (
                        <div className="mr-3 flex items-center justify-center shrink-0">
                            {renderIcon(
                                icon,
                                error ? 'text-red-400 group-focus-within:text-red-500' : undefined
                            )}
                        </div>
                    )}

                    {/* Input Field */}
                    <input
                        ref={ref}
                        id={inputId}
                        name={name}
                        type={actualType}
                        disabled={disabled}
                        required={required}
                        className={cn(
                            'w-full border-none bg-transparent p-0 text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none focus:ring-0',
                            disabled && 'cursor-not-allowed',
                            inputClassName
                        )}
                        {...props}
                    />

                    {/* Right Icon / Password Toggle */}
                    {isPasswordToggle && type === 'password' ? (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                            className="ml-2.5 flex items-center justify-center text-neu-400 hover:text-neu-700 focus:outline-none transition-colors"
                        >
                            <Icon
                                name={showPassword ? 'eye' : 'eye-off'}
                                className="h-5 w-5"
                            />
                        </button>
                    ) : (
                        hasRightIcon && (
                            <div className="ml-2.5 flex items-center justify-center shrink-0">
                                {renderIcon(rightIcon || icon)}
                            </div>
                        )
                    )}
                </div>

                {/* Error Message */}
                {error && <InputError message={error} className="mt-1.5" />}

                {/* Helper Text */}
                {!error && helperText && (
                    <p className="mt-1.5 text-xs text-neu-500">{helperText}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';
export default FormInput;
