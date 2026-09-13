import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-sec-900 bg-sec-50 text-sec-900 focus:border-sec-800 focus:bg-sec-100 focus:text-sec-900'
                    : 'border-transparent text-neu-600 hover:border-neu-300 hover:bg-neu-50 hover:text-neu-800 focus:border-neu-300 focus:bg-neu-50 focus:text-neu-800'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
