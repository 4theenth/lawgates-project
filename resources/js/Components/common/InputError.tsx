import { HTMLAttributes } from 'react';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={'text-xs sm:text-sm text-dan-700 ' + className}
        >
            {message}
        </p>
    ) : null;
}
