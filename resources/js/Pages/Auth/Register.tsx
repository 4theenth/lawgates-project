import React, { FormEventHandler } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput } from '@/Components/common';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@/hooks/useToast';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
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

    const validatePassword = (val: string) => {
        if (!val) {
            setError('password', 'Kata sandi wajib diisi.');
            return false;
        }
        if (val.length < 8) {
            setError('password', 'Panjang kata sandi minimal 8 karakter.');
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
        if (!data.name.trim()) {
            setError('name', 'Nama wajib diisi.');
            hasError = true;
        }

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

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const { toast } = useToast();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            router.post('/auth/google/callback', {
                access_token: tokenResponse.access_token,
                remember: true
            }, {
                onSuccess: () => {
                    toast.success('Berhasil', 'Berhasil mendaftar / masuk dengan Google');
                },
                onError: () => {
                    toast.error('Gagal', 'Terjadi kesalahan saat verifikasi login Google');
                }
            });
        },
        onError: () => {
            toast.error('Gagal', 'Pendaftaran dengan Google dibatalkan atau gagal');
        }
    });

    return (
        <GuestLayout>
            <Head title="Daftar Akun" />

            <AuthCard
                title="Daftar Akun"
                subtitle="Lengkapi formulir di bawah ini untuk mendaftar akun LawGates"
                showSocialAuth={true}
                dividerText="Atau daftar dengan"
                onSocialClick={handleGoogleLogin}
                footerText="Sudah punya akun?"
                footerLinkText="Login"
                footerLinkHref={route('login')}
            >
                <form onSubmit={submit} noValidate className="space-y-4">
                    {/* Nama Field with User Icon */}
                    <FormInput
                        id="name"
                        name="name"
                        label="Nama"
                        icon="user"
                        placeholder="Masukkan nama anda"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        error={errors.name}
                        onChange={(e) => {
                            setData('name', e.target.value);
                            if (errors.name && e.target.value.trim()) clearErrors('name');
                        }}
                        onBlur={(e) => {
                            if (!e.target.value.trim()) setError('name', 'Nama wajib diisi.');
                        }}
                    />

                    {/* Email Field with Mail Icon */}
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        icon="mail"
                        placeholder="Masukkan email anda"
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

                    {/* No Telepon Field with Phone Icon */}
                    <FormInput
                        id="phone"
                        type="tel"
                        name="phone"
                        label="No Telepon"
                        icon="phone"
                        placeholder="Masukkan nomor telepon"
                        value={data.phone}
                        autoComplete="tel"
                        error={errors.phone}
                        onChange={(e) => {
                            setData('phone', e.target.value);
                            if (errors.phone) clearErrors('phone');
                        }}
                    />

                    {/* Kata Sandi Field with Shield Icon and Password Toggle */}
                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Kata Sandi"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password}
                        autoComplete="new-password"
                        isPasswordToggle={true}
                        error={errors.password}
                        onChange={(e) => {
                            const val = e.target.value;
                            setData('password', val);
                            if (val.length >= 8) {
                                clearErrors('password');
                            } else if (errors.password) {
                                setError('password', 'Panjang kata sandi minimal 8 karakter.');
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

                    {/* Konfirmasi Kata Sandi Field with Shield Icon and Password Toggle */}
                    <FormInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        label="Konfirmasi Kata Sandi"
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

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-wider text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                        >
                            {processing ? 'Mendaftar...' : 'DAFTAR'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
