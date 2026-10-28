import React from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from '@/Components/ui/icon';

export interface ExpiredResetLinkCardProps {
    email?: string;
    className?: string;
}

export function ExpiredResetLinkCard({ email, className }: ExpiredResetLinkCardProps) {
    const requestUrl = email
        ? `${route('password.request')}?email=${encodeURIComponent(email)}`
        : route('password.request');

    return (
        <div
            className={`w-full max-w-[440px] rounded-[24px] sm:rounded-[28px] border border-neu-50 bg-[#FFFFFF] p-7 sm:p-9 shadow-[0px_4px_16px_rgba(12,12,13,0.05)] text-center transition-all ${className || ''}`}
        >
            {/* Icon Banner */}
            <div className="w-16 h-16 rounded-full bg-dan-50 border border-dan-100 flex items-center justify-center mx-auto mb-5 text-dan-700 shadow-2xs">
                <Icon name="clock-alert" className="h-8 w-8 text-dan-700" strokeWidth={1.75} />
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-h4 font-bold leading-tight text-neu-900">
                    Tautan Reset Password Kedaluwarsa
                </h1>
                <p className="mt-2 text-sm text-neu-500 font-normal leading-relaxed">
                    Tautan untuk mengatur ulang kata sandi ini sudah kedaluwarsa atau tidak valid lagi demi keamanan akun Anda.
                </p>
            </div>

            {/* Info Box Panduan */}
            <div className="mb-6 rounded-2xl bg-neu-50/70 border border-neu-100 p-4 text-left space-y-2.5">
                <div className="flex items-start gap-2.5">
                    <Icon name="shield-alert" className="h-4 w-4 text-neu-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-neu-600 leading-relaxed">
                        Tautan reset kata sandi hanya berlaku selama <strong>15 menit</strong> dan hanya dapat digunakan satu kali.
                    </p>
                </div>
                <div className="flex items-start gap-2.5">
                    <Icon name="mail-check" className="h-4 w-4 text-neu-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-neu-600 leading-relaxed">
                        Silakan kirim ulang permintaan untuk mendapatkan tautan baru melalui email Anda.
                    </p>
                </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-3">
                <Link
                    href={requestUrl}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-pr-900 py-3.5 px-4 text-md font-bold text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 text-center cursor-pointer"
                >
                    <Icon name="rotate-ccw" className="h-4 w-4" />
                    <span>Kirim Ulang Tautan Reset Password</span>
                </Link>

                <div>
                    <Link
                        href={route('login')}
                        className="text-xs sm:text-sm font-semibold text-neu-600 hover:text-neu-900 transition-colors inline-flex items-center gap-1.5 py-1"
                    >
                        <Icon name="arrow-left" className="h-3.5 w-3.5" />
                        <span>Kembali ke Halaman Masuk</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ExpiredResetLinkCard;
