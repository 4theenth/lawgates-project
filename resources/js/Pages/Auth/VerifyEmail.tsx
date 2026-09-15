import React, { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard } from '@/Components/common';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <AuthCard
                title="Verifikasi Email Anda"
                subtitle="Terima kasih telah mendaftar! Sebelum mulai, silakan verifikasi alamat email Anda melalui tautan yang baru saja kami kirimkan."
            >
                {status === 'verification-link-sent' && (
                    <div className="mb-4 rounded-xl bg-suc-50 p-3 text-xs sm:text-sm font-medium text-suc-800 border border-suc-200">
                        Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda daftarkan.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-normal text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Mengirim Ulang...' : 'Kirim Ulang Email Verifikasi'}
                    </button>

                    <div className="pt-2 text-center">
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
            </AuthCard>
        </GuestLayout>
    );
}
