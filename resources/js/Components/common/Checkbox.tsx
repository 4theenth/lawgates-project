import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-neu-300 text-sec-900 shadow-sm focus:ring-sec-900 ' +
                className
            }
        />
    );
}
