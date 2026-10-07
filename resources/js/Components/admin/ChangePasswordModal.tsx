import React, { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/common/Modal';
import { FormInput } from '@/Components/common/FormInput';
import { useToast } from '@/hooks/useToast';
import { Lock, X, Check, Loader2, ShieldCheck } from 'lucide-react';

interface ChangePasswordModalProps {
  show: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ show, onClose }: ChangePasswordModalProps) {
  const { toast } = useToast();

  const {
    data,
    setData,
    put,
    processing,
    errors,
    reset,
    setError,
    clearErrors,
  } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  // Validasi kriteria kata sandi (persis sesuai logic login & register)
  const hasCapital = /[A-Z]/.test(data.password);
  const hasMinLength = data.password.length >= 8;
  const hasNumberOrSymbol = /[0-9]/.test(data.password) || /[^a-zA-Z0-9]/.test(data.password);

  const handleClose = () => {
    reset();
    clearErrors();
    onClose();
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!data.current_password) {
      setError('current_password', 'Kata sandi saat ini wajib diisi.');
      hasError = true;
    }

    if (!data.password) {
      setError('password', 'Kata sandi baru wajib diisi.');
      hasError = true;
    } else if (!hasCapital || !hasMinLength || !hasNumberOrSymbol) {
      setError('password', 'Kata sandi belum memenuhi ketentuan.');
      hasError = true;
    }

    if (!data.password_confirmation) {
      setError('password_confirmation', 'Konfirmasi kata sandi wajib diisi.');
      hasError = true;
    } else if (data.password !== data.password_confirmation) {
      setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
      hasError = true;
    }

    if (hasError) return;

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        clearErrors();
        toast.success('Kata sandi berhasil diperbarui');
        onClose();
      },
      onError: (errs) => {
        if (errs.current_password) {
          setError('current_password', 'Kata sandi saat ini tidak cocok.');
        }
        if (errs.password) {
          setError('password', errs.password);
        }
      },
    });
  };

  return (
    <Modal
      show={show}
      onClose={processing ? () => {} : handleClose}
      maxWidth="md"
      panelClassName="rounded-[20px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.12)] border border-neu-100 bg-white"
    >
      <div className="p-6 sm:p-7 text-left">
        {/* Header Modal */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neu-50 border border-neu-100 flex items-center justify-center shrink-0 text-neu-700">
              <Lock className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-neu-900 tracking-tight">
                Ganti Kata Sandi
              </h3>
              <p className="text-[12px] text-neu-500 mt-0.5 leading-normal">
                Perbarui kata sandi akun Anda untuk menjaga keamanan akses.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={processing}
            className="p-1 text-neu-400 hover:text-neu-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0 ml-2"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Kata Sandi Saat Ini */}
          <div>
            <FormInput
              id="current_password"
              name="current_password"
              type="password"
              label="Kata Sandi Saat Ini"
              placeholder="Masukkan kata sandi saat ini"
              icon="lock"
              value={data.current_password}
              onChange={(e) => {
                setData('current_password', e.target.value);
                if (errors.current_password) clearErrors('current_password');
              }}
              error={errors.current_password}
              disabled={processing}
              required
            />
          </div>

          {/* 2. Kata Sandi Baru */}
          <div>
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Kata Sandi Baru"
              placeholder="Masukkan kata sandi baru"
              icon="lock"
              value={data.password}
              onChange={(e) => {
                setData('password', e.target.value);
                if (errors.password) clearErrors('password');
                if (data.password_confirmation && e.target.value !== data.password_confirmation) {
                  setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
                } else if (data.password_confirmation) {
                  clearErrors('password_confirmation');
                }
              }}
              error={errors.password}
              disabled={processing}
              required
            />

            {/* Checklist Ketentuan Kata Sandi (Persis Sesuai Logic Register) */}
            <div className="mt-2.5 pt-1 space-y-1.5 bg-neu-50/60 border border-neu-100/80 rounded-xl p-3">
              <p className="text-[11px] font-semibold text-neu-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-pr-900" />
                Ketentuan Kata Sandi:
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {hasCapital ? (
                    <Check className="h-3.5 w-3.5 text-suc-800 shrink-0 stroke-[2.5]" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-neu-400 shrink-0 stroke-[2.5]" />
                  )}
                  <span className={hasCapital ? 'text-[11px] font-medium text-neu-700' : 'text-[11px] text-neu-500'}>
                    Menggunakan huruf Kapital
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasMinLength ? (
                    <Check className="h-3.5 w-3.5 text-suc-800 shrink-0 stroke-[2.5]" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-neu-400 shrink-0 stroke-[2.5]" />
                  )}
                  <span className={hasMinLength ? 'text-[11px] font-medium text-neu-700' : 'text-[11px] text-neu-500'}>
                    Minimal 8 karakter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNumberOrSymbol ? (
                    <Check className="h-3.5 w-3.5 text-suc-800 shrink-0 stroke-[2.5]" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-neu-400 shrink-0 stroke-[2.5]" />
                  )}
                  <span className={hasNumberOrSymbol ? 'text-[11px] font-medium text-neu-700' : 'text-[11px] text-neu-500'}>
                    Menggunakan angka atau simbol
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Konfirmasi Kata Sandi Baru */}
          <div>
            <FormInput
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              label="Konfirmasi Kata Sandi Baru"
              placeholder="Ulangi kata sandi baru"
              icon="lock"
              value={data.password_confirmation}
              onChange={(e) => {
                setData('password_confirmation', e.target.value);
                if (data.password && e.target.value !== data.password) {
                  setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
                } else {
                  clearErrors('password_confirmation');
                }
              }}
              error={errors.password_confirmation}
              disabled={processing}
              required
            />
          </div>

          {/* Action Buttons Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neu-100">
            <button
              type="button"
              onClick={handleClose}
              disabled={processing}
              className="px-4 py-2 text-[13px] font-medium text-neu-800 bg-white border border-neu-200 hover:bg-neu-50 rounded-[10px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-pr-900 hover:bg-pr-800 rounded-[10px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {processing ? 'Menyimpan...' : 'Ganti Kata Sandi'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
