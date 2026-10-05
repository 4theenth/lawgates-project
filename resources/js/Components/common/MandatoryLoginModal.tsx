import React from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import { useGoogleLogin } from '@react-oauth/google';
import { Icon } from '@/Components/ui/icon';
import { GoogleLogo } from '@/Components/common/SocialAuthButton';
import { useToast } from '@/hooks/useToast';

export interface MandatoryLoginModalProps {
  show: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  badgeText?: string;
  redirectUrl?: string;
  closeable?: boolean;
  onSuccess?: () => void;
}

/**
 * MandatoryLoginModal
 *
 * Komponen modal mandatory login sesuai spesifikasi desain LawGates:
 * - Ukuran panel: width: 392px, height: 450px, border-radius: 20px, padding: 34px 21px, bg: #FFFFFF
 * - Ukuran konten: width: 350px, height: 382px, gap: 29px
 * - Icon: lock-keyhole di dalam kontainer Primary / 50 (bg-pr-50)
 * - Badge: "PORTAL RELASI HUKUM INDONESIA" warna background Primary / 50 (bg-pr-50)
 * - Tipografi Judul & Deskripsi presisi (Inter, font-size, line-height)
 * - Opsi Login langsung (Email & Google OAuth) serta pendaftaran akun baru
 */
export default function MandatoryLoginModal({
  show = false,
  onClose = () => {},
  title = 'Akses Dibatasi Silakan Login',
  description = 'Silakan login untuk menelusuri jutaan peraturan dari tingkat UUD hingga Perda. Gunakan fitur pencarian canggih memahami hierarki hukum secara utuh.',
  badgeText = 'PORTAL RELASI HUKUM INDONESIA',
  redirectUrl,
  closeable = true,
  onSuccess,
}: MandatoryLoginModalProps) {
  const { toast } = useToast();

  const handleClose = () => {
    if (closeable && onClose) {
      onClose();
    }
  };

  const handleGoToLogin = () => {
    const loginPath = typeof route !== 'undefined' ? route('login') : '/login';
    const targetUrl = redirectUrl
      ? `${loginPath}?redirect=${encodeURIComponent(redirectUrl)}`
      : loginPath;

    router.visit(targetUrl);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      router.post(
        '/auth/google/callback',
        {
          access_token: tokenResponse.access_token,
          remember: true,
          redirect: redirectUrl || undefined,
        },
        {
          onSuccess: () => {
            toast.success('Berhasil', 'Berhasil login dengan Google');
            if (onClose) onClose();
            if (onSuccess) onSuccess();
          },
          onError: () => {
            toast.error('Gagal', 'Terjadi kesalahan saat verifikasi login Google');
          },
        }
      );
    },
    onError: () => {
      toast.error('Gagal', 'Login dengan Google dibatalkan atau gagal');
    },
  });

  return (
    <Transition show={show} leave="duration-200">
      <Dialog
        as="div"
        id="mandatory-login-modal"
        className="relative z-[9999]"
        onClose={handleClose}
      >
        {/* ── BACKDROP GELAP & BLUR DI BELAKANG MODAL (Figma: #000000 50%, Background blur) ── */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
        </TransitionChild>

        {/* ── CONTAINER TENGAH LAYAR ── */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* ── CARD MODAL: 392 x 450, RADIUS 20, PADDING 34 21, BG #FFFFFF ── */}
              <DialogPanel
                className="relative w-[392px] max-w-[calc(100vw-32px)] h-[450px] min-h-[450px] rounded-[20px] pt-[34px] pb-[34px] px-[21px] bg-[#FFFFFF] shadow-[0px_20px_50px_rgba(0,0,0,0.35)] border border-neu-100 flex flex-col items-center justify-between text-center select-none"
                style={{ opacity: 1 }}
              >
                {/* Tombol Tutup (Silang) Halus di Sudut Kanan Atas */}
                {closeable && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-1.5 rounded-full text-neu-400 hover:text-neu-700 hover:bg-pr-50 transition-colors cursor-pointer"
                    aria-label="Tutup"
                  >
                    <Icon name="x" className="w-4 h-4" />
                  </button>
                )}

                {/* ── INNER CONTENT: 350 x 382, GAP 29 ── */}
                <div className="w-[350px] max-w-full h-[382px] flex flex-col justify-between items-center text-center">
                  {/* BAGIAN ATAS: ICON, BADGE, JUDUL, SUBTITLE */}
                  <div className="flex flex-col items-center w-full">
                    {/* 1. Icon Container (Lock Keyhole) - Warna Primary / 50 */}
                    <div className="w-[52px] h-[52px] rounded-[14px] bg-pr-50 flex items-center justify-center mb-3">
                      <Icon name="lock-keyhole" className="w-5 h-5 text-pr-900" />
                    </div>

                    {/* 2. Badge Portal Relasi - Warna Primary / 50 */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pr-50 text-pr-900 mb-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pr-900" />
                      <span className="font-sans font-medium text-[10px] leading-[16px] tracking-normal text-pr-900 uppercase">
                        {badgeText}
                      </span>
                    </div>

                    {/* 3. Akses Dibatasi Silakan Login - Font 20px, Bold, Line-height 130% */}
                    <h2 className="font-sans font-bold text-[20px] leading-[130%] tracking-normal text-center text-pr-900 max-w-[270px] mb-2">
                      {title}
                    </h2>

                    {/* 4. Deskripsi Subtitle - Font 12px, Regular, Line-height 18px */}
                    <p className="font-sans font-normal text-[12px] leading-[18px] tracking-normal text-center text-neu-500 max-w-[325px]">
                      {description}
                    </p>
                  </div>

                  {/* BAGIAN BAWAH: TOMBOL LOGIN, GOOGLE, & REGISTER */}
                  <div className="flex flex-col gap-2.5 w-full">
                    {/* Tombol Login Sekarang */}
                    <button
                      type="button"
                      onClick={handleGoToLogin}
                      className="w-full h-[42px] bg-pr-900 hover:bg-pr-800 text-white rounded-[10px] font-sans font-medium text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-sm"
                    >
                      <span>Login Sekarang</span>
                      <Icon name="log-in" className="w-4 h-4" />
                    </button>

                    {/* Tombol Lanjutkan dengan Google */}
                    <button
                      type="button"
                      onClick={() => handleGoogleLogin()}
                      className="w-full h-[42px] bg-[#FFFFFF] hover:bg-neu-50/80 border border-neu-100 text-neu-800 rounded-[10px] font-sans font-medium text-[14px] flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] cursor-pointer shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
                    >
                      <GoogleLogo className="w-4 h-4" />
                      <span>Lanjutkan dengan Google</span>
                    </button>

                    {/* Link Daftar Akun Baru */}
                    <div className="text-[12px] text-neu-500 text-center mt-1">
                      Belum punya akun?{' '}
                      <Link
                        href={
                          redirectUrl
                            ? `${typeof route !== 'undefined' ? route('register') : '/register'}?redirect=${encodeURIComponent(redirectUrl)}`
                            : typeof route !== 'undefined'
                            ? route('register')
                            : '/register'
                        }
                        className="font-sans font-semibold text-pr-900 hover:underline transition-colors"
                      >
                        Buat akun baru
                      </Link>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
