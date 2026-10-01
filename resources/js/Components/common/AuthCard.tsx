import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import SocialAuthButton from './SocialAuthButton';

export interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    dividerText?: string;
    showSocialAuth?: boolean;
    onSocialClick?: () => void;
    footerText?: string;
    footerLinkText?: string;
    footerLinkHref?: string;
    className?: string;
}

export function AuthCard({
    title,
    subtitle,
    children,
    dividerText = 'Atau masuk dengan',
    showSocialAuth = false,
    onSocialClick,
    footerText,
    footerLinkText,
    footerLinkHref,
    className,
}: AuthCardProps) {
    return (
        <div
            className={cn(
                'w-full max-w-[440px] rounded-[24px] sm:rounded-[28px] border border-neu-50 bg-[#FFFFFF] p-7 sm:p-9 shadow-[0px_4px_16px_rgba(12,12,13,0.05)] transition-all',
                className
            )}
        >
            {/* Header */}
            <div className="mb-6 sm:mb-8 text-center">
                <h1 className="text-h4 font-bold leading-tight text-neu-900">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-2 text-sm text-neu-500 font-normal leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Form Content */}
            <div>{children}</div>

            {/* Divider & Social Auth */}
            {showSocialAuth && (
                <>
                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neu-50" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-[#FFFFFF] px-3 text-neu-400 font-normal">
                                {dividerText}
                            </span>
                        </div>
                    </div>

                    <div>
                        <SocialAuthButton
                            provider="google"
                            onClick={onSocialClick}
                        />
                    </div>
                </>
            )}

            {/* Footer Navigation Link */}
            {footerText && footerLinkText && footerLinkHref && (
                <div className="mt-6 sm:mt-7 text-center text-sm text-neu-600">
                    {footerText}{' '}
                    <Link
                        href={footerLinkHref}
                        className="text-sm font-semibold text-pr-900 hover:text-pr-700 hover:underline transition-colors"
                    >
                        {footerLinkText}
                    </Link>
                </div>
            )}
        </div>
    );
}

export default AuthCard;
