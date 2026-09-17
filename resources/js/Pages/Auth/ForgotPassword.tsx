import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput } from '@/Components/common';

export interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        email: '',
    });

    const validateEmail = (val: string) => {
        const trimmed = val.trim();
        if (!trimmed) {
            setError('email', 'Email wajib diisi.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setError('email', 'Format email tidak valid (harus user@domain.com)');
            return false;
        }
        clearErrors('email');
        return true;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!validateEmail(data.email)) {
            return;
        }

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi" />

            <AuthCard
                title="Lupa kata sandi"
                subtitle="Masukkan email yang terdaftar, kami akan kirim link untuk reset kata sandi"
                footerText="Sudah ingat kata sandi?"
                footerLinkText="Kembali ke Login"
                footerLinkHref={route('login')}
            >
                {status && (
                    <div className="mb-4 rounded-xl bg-suc-50 p-3 text-xs sm:text-sm font-medium text-suc-800 border border-suc-200">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} noValidate className="space-y-4">
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        icon="mail"
                        placeholder="Masukkan email anda"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        error={errors.email}
                        onChange={(e) => {
                            const val = e.target.value;
                            setData('email', val);
                            if (errors.email) {
                                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
                                    clearErrors('email');
                                }
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value.trim()) {
                                validateEmail(e.target.value);
                            }
                        }}
                    />

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-normal text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Mengirim...' : 'Kirim link reset'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
