import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F9FA] p-4 sm:p-6 md:p-8">
            {children}
        </div>
    );
}
