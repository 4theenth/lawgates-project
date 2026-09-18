import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Icon } from '@/Components/ui/icon';
import profileAvatar from '@/assets/profile-avatar.webp';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@/hooks/useToast';

export interface GoogleSyncProps {
    email?: string;
    accessToken?: string;
    remember?: boolean;
    isRegisterFlow?: boolean;
    error?: string;
}

export default function GoogleSync({
    email = 'Mangadi@gmail.com',
    accessToken,
    remember = true,
    isRegisterFlow = false,
    error,
}: GoogleSyncProps) {
    const [processing, setProcessing] = useState(false);
    const { toast } = useToast();

    const triggerGooglePopup = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setProcessing(true);
            router.post(
                '/auth/google/callback',
                {
                    access_token: tokenResponse.access_token,
                    confirm_link: true,
                    remember: remember,
                },
                {
                    onFinish: () => setProcessing(false),
                    onError: () => {
                        toast.error('Gagal', 'Gagal memverifikasi akun Google.');
                    },
                }
            );
        },
        onError: () => {
            toast.error('Batal', 'Verifikasi Google dibatalkan.');
            setProcessing(false);
        },
    });

    const handleConfirm = () => {
        // Jika alur registrasi atau belum ada accessToken, buka pop-up Google OAuth untuk konfirmasi kepemilikan
        if (isRegisterFlow || !accessToken) {
            triggerGooglePopup();
            return;
        }

        // Jika accessToken sudah ada (alur login biasa), langsung kirim konfirmasi
        setProcessing(true);
        router.post(
            '/auth/google/callback',
            {
                access_token: accessToken,
                confirm_link: true,
                remember: remember,
            },
            {
                onFinish: () => setProcessing(false),
                onError: () => {
                    toast.error('Gagal', 'Terjadi kesalahan saat menghubungkan akun.');
                },
            }
        );
    };

    const handleCancel = () => {
        if (isRegisterFlow) {
            router.get(route('register'));
        } else {
            router.get(route('login'));
        }
    };

    return (
        <GuestLayout>
            <Head title="Sinkronisasi Akun" />

            <div className="w-full max-w-[440px] rounded-[24px] sm:rounded-[28px] border border-neu-50 bg-[#FFFFFF] p-7 sm:p-9 shadow-[0px_4px_16px_rgba(12,12,13,0.05)] text-center transition-all">
                {/* Error Banner jika akun google tidak cocok */}
                {error && (
                    <div className="mb-4 rounded-xl bg-dan-50/80 p-3.5 border border-dan-100/60 flex items-start gap-2.5 text-left">
                        <Icon name="circle-x" className="h-5 w-5 text-dan-700 shrink-0 mt-0.5" />
                        <p className="text-xs text-dan-700 leading-snug">{error}</p>
                    </div>
                )}
                {/* Header Subtitle */}
                <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-neu-800 mb-6">
                    <Icon name="repeat" className="h-4 w-4 text-neu-700" />
                    <span>Singkronisasi Akun</span>
                </div>

                {/* Graphic Box */}
                <div className="rounded-2xl bg-neu-50/70 p-5 mb-5">
                    <div className="flex items-center justify-between relative">
                        {/* Google Side */}
                        <div className="flex flex-col items-center z-10">
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-neu-100">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                            </div>
                            <span className="text-xs font-medium text-neu-600 mt-2">Google</span>
                        </div>

                        {/* Middle Connector */}
                        <div className="flex-1 flex flex-col items-center px-2">
                            <div className="w-full h-[1px] bg-neu-300 absolute top-6 left-0 right-0 z-0" />
                            <div className="w-7 h-7 rounded-full bg-pr-900 flex items-center justify-center text-white shadow-sm z-10">
                                <Icon name="arrow-left-right" className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[10px] font-semibold text-neu-500 tracking-wider uppercase mt-2 z-10">
                                HUBUNGKAN
                            </span>
                        </div>

                        {/* User Side */}
                        <div className="flex flex-col items-center z-10">
                            <div className="w-12 h-12 rounded-full bg-neu-200 shadow-sm flex items-center justify-center border border-neu-100 overflow-hidden">
                                <img
                                    src={profileAvatar}
                                    alt="Akun Anda"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xs font-medium text-neu-600 mt-2">Akun Anda</span>
                        </div>
                    </div>
                </div>

                {/* Email Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neu-100 text-neu-700 text-xs font-medium mb-4">
                    <Icon name="at-sign" className="w-3.5 h-3.5 text-neu-500" />
                    <span>{email}</span>
                </div>

                {/* Title & Description */}
                <h2 className="text-lg sm:text-xl font-bold text-neu-900 mb-2">
                    Hubungkan Akun?
                </h2>
                <p className="text-xs sm:text-sm text-neu-500 leading-relaxed max-w-xs mx-auto mb-6">
                    Email Google Anda cocok dengan akun yang sudah terdaftar. Hubungkan akun Google ini dengan akun yang sudah ada?
                </p>

                {/* Buttons */}
                <div className="space-y-2.5">
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={processing}
                        className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-semibold text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Icon name="repeat" className="h-4 w-4" />
                        <span>{processing ? 'Menghubungkan...' : 'Ya, Hubungkan'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={processing}
                        className="w-full rounded-xl border border-neu-300 bg-white py-3 px-4 text-md font-semibold text-neu-800 shadow-sm transition-all duration-150 hover:bg-neu-50 active:scale-[0.99] disabled:opacity-60"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}
