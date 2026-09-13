import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-sec-900 text-neu-900 focus:border-sec-800'
                    : 'border-transparent text-neu-500 hover:border-neu-300 hover:text-neu-700 focus:border-neu-300 focus:text-neu-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
