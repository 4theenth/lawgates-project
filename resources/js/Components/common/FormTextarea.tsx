import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { Icon } from '@/Components/ui/icon';
import { cn } from '@/lib/utils';
import InputError from './InputError';

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    icon?: string | React.ReactNode;
    error?: string;
    helperText?: string;
    containerClassName?: string;
    textareaClassName?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    (
        {
            id,
            name,
            label,
            icon,
            error,
            helperText,
            className,
            containerClassName,
            textareaClassName,
            rows = 4,
            disabled,
            required,
            ...props
        },
        ref
    ) => {
        const inputId = id || name;

        const renderIcon = (iconContent: string | React.ReactNode) => {
            if (!iconContent) return null;
            if (typeof iconContent === 'string') {
                return (
                    <Icon
                        name={iconContent}
                        className="h-5 w-5 text-neu-400 group-focus-within:text-pr-900 transition-colors"
                    />
                );
            }
            return <span className="text-neu-400 group-focus-within:text-pr-900 transition-colors">{iconContent}</span>;
        };

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
                        'group relative flex w-full rounded-xl border bg-white px-3.5 py-2.5 sm:py-3 transition-all duration-150',
                        error
                            ? 'border-dan-500 focus-within:border-dan-700 focus-within:ring-1 focus-within:ring-dan-600'
                            : 'border-neu-50 hover:border-neu-200 focus-within:border-pr-900 focus-within:ring-1 focus-within:ring-pr-900',
                        disabled && 'bg-neu-100 opacity-60 cursor-not-allowed',
                        className
                    )}
                >
                    {icon && (
                        <div className="mr-3 mt-0.5 flex items-start shrink-0">
                            {renderIcon(icon)}
                        </div>
                    )}

                    <textarea
                        ref={ref}
                        id={inputId}
                        name={name}
                        rows={rows}
                        disabled={disabled}
                        required={required}
                        className={cn(
                            'w-full resize-y border-none bg-transparent p-0 text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none focus:ring-0',
                            disabled && 'cursor-not-allowed',
                            textareaClassName
                        )}
                        {...props}
                    />
                </div>

                {error && <InputError message={error} className="mt-1.5" />}

                {!error && helperText && (
                    <p className="mt-1.5 text-xs text-neu-500">{helperText}</p>
                )}
            </div>
        );
    }
);

FormTextarea.displayName = 'FormTextarea';
export default FormTextarea;
