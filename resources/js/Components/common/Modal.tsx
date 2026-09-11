import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { PropsWithChildren } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
    backdropClassName = '',
    backdropStyle,
    panelClassName = '',
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'status';
    closeable?: boolean;
    onClose: CallableFunction;
    backdropClassName?: string;
    backdropStyle?: React.CSSProperties;
    panelClassName?: string;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        status: 'sm:max-w-[454px]',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="relative z-50"
                onClose={close}
            >
                {/* 1. Backdrop Gelap Hanya di Belakang Modal */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className={`fixed inset-0 transition-opacity ${backdropClassName || ''}`}
                        style={backdropStyle || { backgroundColor: 'rgba(55, 55, 55, 0.60)' }}
                        aria-hidden="true"
                    />
                </TransitionChild>

                {/* 2. Container Centered Modal di Depan Backdrop */}
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
                            {/* 3. Panel Form Modal Putih Bersih Solid (Bukan Transparan/Burem) */}
                            <DialogPanel
                                className={`relative transform rounded-[16px] text-left shadow-2xl transition-all sm:my-8 sm:w-full border border-neu-100 ${maxWidthClass} ${panelClassName}`}
                                style={{ backgroundColor: '#ffffff', opacity: 1 }}
                            >
                                {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
