import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Icon } from '@/Components/ui/icon';
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
                            aria-invalid={error ? true : undefined}
                            className={cn(
                                'peer h-5 w-5 shrink-0 appearance-none rounded border bg-white transition-colors duration-150 cursor-pointer',
                                'checked:border-pr-900 checked:bg-pr-900',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-pr-900/30 focus-visible:ring-offset-1',
                                error ? 'border-dan-700' : 'border-neu-300',
                                disabled && 'cursor-not-allowed opacity-60',
                                className
                            )}
                            {...props}
                        />
                        <Icon
                            name="check"
                            className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                            strokeWidth={3}
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
