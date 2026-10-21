import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput } from '@/Components/common';
import { Icon } from '@/Components/ui/icon';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const hasCapital = /[A-Z]/.test(data.password);
    const hasMinLength = data.password.length >= 8;
    const hasNumberOrSymbol = /[0-9]/.test(data.password) || /[^a-zA-Z0-9]/.test(data.password);

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

    const validatePassword = (val: string) => {
        if (!val) {
            setError('password', 'Kata sandi wajib diisi.');
            return false;
        }
        if (val.length < 8) {
            setError('password', 'Panjang kata sandi minimal 8 karakter.');
            return false;
        }
        const capital = /[A-Z]/.test(val);
        const minLength = val.length >= 8;
        const numOrSym = /[0-9]/.test(val) || /[^a-zA-Z0-9]/.test(val);
        if (!capital || !minLength || !numOrSym) {
            setError('password', 'Kata sandi belum memenuhi ketentuan.');
            return false;
        }
        clearErrors('password');
        return true;
    };

    const validatePasswordConfirmation = (confirmVal: string, passVal: string) => {
        if (!confirmVal) {
            setError('password_confirmation', 'Konfirmasi kata sandi wajib diisi.');
            return false;
        }
        if (confirmVal !== passVal) {
            setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
            return false;
        }
        clearErrors('password_confirmation');
        return true;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        let hasError = false;

        if (!validateEmail(data.email)) {
            hasError = true;
        }

        if (!validatePassword(data.password)) {
            hasError = true;
        }

        if (!validatePasswordConfirmation(data.password_confirmation, data.password)) {
            hasError = true;
        }

        if (hasError) return;

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Atur Ulang Kata Sandi" />

            <AuthCard
                title="Atur Ulang Kata Sandi"
                subtitle="Masukkan kata sandi baru untuk akun Anda"
                footerText="Ingat kata sandi Anda?"
                footerLinkText="Kembali ke Login"
                footerLinkHref={route('login')}
            >
                <form onSubmit={submit} noValidate className="space-y-4">
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        icon="mail"
                        value={data.email}
                        autoComplete="username"
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

                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Kata Sandi Baru"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password}
                        autoComplete="new-password"
                        autoFocus
                        isPasswordToggle={true}
                        error={errors.password}
                        onChange={(e) => {
                            const val = e.target.value;
                            setData('password', val);
                            const capital = /[A-Z]/.test(val);
                            const minLength = val.length >= 8;
                            const numOrSym = /[0-9]/.test(val) || /[^a-zA-Z0-9]/.test(val);

                            if (capital && minLength && numOrSym) {
                                clearErrors('password');
                            } else if (errors.password) {
                                if (!val) {
                                    setError('password', 'Kata sandi wajib diisi.');
                                } else if (!minLength) {
                                    setError('password', 'Panjang kata sandi minimal 8 karakter.');
                                } else {
                                    setError('password', 'Kata sandi belum memenuhi ketentuan.');
                                }
                            }

                            if (data.password_confirmation) {
                                if (data.password_confirmation === val) {
                                    clearErrors('password_confirmation');
                                } else {
                                    setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
                                }
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value) {
                                validatePassword(e.target.value);
                            }
                        }}
                    />

                    <FormInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        label="Konfirmasi Kata Sandi Baru"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        isPasswordToggle={true}
                        error={errors.password_confirmation}
                        onChange={(e) => {
                            const val = e.target.value;
                            setData('password_confirmation', val);
                            if (val) {
                                if (val !== data.password) {
                                    setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
                                } else {
                                    clearErrors('password_confirmation');
                                }
                            } else {
                                clearErrors('password_confirmation');
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value) {
                                validatePasswordConfirmation(e.target.value, data.password);
                            }
                        }}
                    />

                    {/* Ketentuan Kata Sandi */}
                    <div className="pt-1 space-y-1.5">
                        <p className="text-xs font-semibold text-neu-800">Ketentuan Kata Sandi:</p>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                {hasCapital ? (
                                    <Icon name="check" className="h-3.5 w-3.5 text-suc-800 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Icon name="x" className="h-3.5 w-3.5 text-neu-400 shrink-0" strokeWidth={2.5} />
                                )}
                                <span className={hasCapital ? 'text-xs text-neu-700' : 'text-xs text-neu-500'}>
                                    Menggunakan huruf Kapital
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {hasMinLength ? (
                                    <Icon name="check" className="h-3.5 w-3.5 text-suc-800 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Icon name="x" className="h-3.5 w-3.5 text-neu-400 shrink-0" strokeWidth={2.5} />
                                )}
                                <span className={hasMinLength ? 'text-xs text-neu-700' : 'text-xs text-neu-500'}>
                                    Minimal 8 karakter
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {hasNumberOrSymbol ? (
                                    <Icon name="check" className="h-3.5 w-3.5 text-suc-800 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Icon name="x" className="h-3.5 w-3.5 text-neu-400 shrink-0" strokeWidth={2.5} />
                                )}
                                <span className={hasNumberOrSymbol ? 'text-xs text-neu-700' : 'text-xs text-neu-500'}>
                                    Menggunakan angka atau simbol
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-normal text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Menyimpan...' : 'Atur Ulang Kata Sandi'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}

