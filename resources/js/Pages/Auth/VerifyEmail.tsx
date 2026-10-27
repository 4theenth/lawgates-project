import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard } from '@/Components/common';
import { Info, Mail } from 'lucide-react';
import type { PageProps } from '@/types';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});
    const { auth } = usePage<PageProps>().props;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('verification.send'), { preserveScroll: true });
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <AuthCard
                title="Email Anda Belum Diverifikasi"
                subtitle="Akun Anda sudah terdaftar, tetapi alamat email belum diverifikasi. Silakan lakukan verifikasi terlebih dahulu sebelum melanjutkan."
            >
                {/*
                 * Semua jarak vertikal dipegang satu container `space-y-4`
                 * (16px) supaya antar-blok selalu seragam dan tidak ada margin
                 * yang menumpuk dengan `space-y` milik form. Banner status
                 * bersifat kondisional, jadi ritmenya ikut container ini alih-alih
                 * membawa `mb-4` sendiri.
                 */}
                <div className="space-y-4">
                    {status === 'verification-link-sent' && (
                        <div className="rounded-xl bg-suc-50 p-3 text-xs sm:text-sm font-medium text-suc-800 border border-suc-200">
                            Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda daftarkan.
                        </div>
                    )}

                    <div className="flex items-start gap-3 rounded-xl border border-neu-100 bg-neu-50/60 p-3">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-pr-900" strokeWidth={1.75} />
                        <div className="min-w-0 text-left">
                            <p className="text-xs text-neu-600">Tautan verifikasi dikirim ke</p>
                            <p className="truncate text-sm font-medium text-neu-900">{auth.user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl border border-sec-200 bg-sec-50 p-3 text-left">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sec-700" strokeWidth={2} />
                        <p className="text-xs font-medium leading-relaxed text-neu-900">
                            Belum menerima email? Periksa folder <strong>Spam</strong> atau{' '}
                            <strong>Promosi</strong>, lalu kirim ulang tautan verifikasi.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-normal text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Mengirim Ulang...' : 'Kirim Ulang Email Verifikasi'}
                        </button>

                        {/* Link sekunder dirapatkan ke tombol utama; jarak 16px
                            dipegang `space-y-4` milik form, jadi tidak perlu
                            padding tambahan. */}
                        <div className="text-center">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-xs sm:text-sm font-medium text-neu-600 hover:text-dan-700 hover:underline transition-colors"
                            >
                                Keluar (Log Out)
                            </Link>
                        </div>
                    </form>
                </div>
            </AuthCard>
        </GuestLayout>
    );
}
