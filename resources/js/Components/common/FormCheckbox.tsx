import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import InputError from './InputError';

export interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
    description?: string;
    error?: string;
    containerClassName?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
    (
        {
            id,
            name,
            label,
            description,
            error,
            className,
            containerClassName,
            checked,
            disabled,
            ...props
        },
        ref
    ) => {
        const checkboxId = id || name;

        return (
            <div className={cn('flex flex-col', containerClassName)}>
                <label
                    htmlFor={checkboxId}
                    className={cn(
                        'inline-flex items-center select-none cursor-pointer group',
                        disabled && 'opacity-60 cursor-not-allowed'
                    )}
                >
                    <div className="relative flex items-center">
                        <input
                            ref={ref}
                            id={checkboxId}
                            name={name}
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            className={cn(
                                'h-4 w-4 rounded border-neu-300 text-pr-900 focus:ring-pr-900 focus:ring-offset-0 focus:ring-1 transition-colors cursor-pointer',
                                disabled && 'cursor-not-allowed',
                                className
                            )}
                            {...props}
                        />
                    </div>

                    {label && (
                        <span className="ml-2.5 text-sm font-medium text-neu-800 group-hover:text-neu-900 transition-colors">
                            {label}
                        </span>
                    )}
                </label>

                {description && (
                    <p className="ml-6.5 mt-0.5 text-xs text-neu-500">{description}</p>
                )}

                {error && <InputError message={error} className="mt-1" />}
            </div>
        );
    }
);

FormCheckbox.displayName = 'FormCheckbox';
export default FormCheckbox;
