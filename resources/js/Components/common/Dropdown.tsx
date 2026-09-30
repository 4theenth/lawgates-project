import { Transition } from '@headlessui/react';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

interface DropdownContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}

const DropDownContext = createContext<DropdownContextType>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

interface DropdownProps extends PropsWithChildren {
    closeOnScroll?: boolean;
}

const Dropdown = ({ children, closeOnScroll = true }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    // Close on outside click, window scroll, and Escape key
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleScroll = () => {
            if (closeOnScroll) {
                setOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside, true);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
            document.removeEventListener('touchstart', handleClickOutside, true);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, closeOnScroll]);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div ref={containerRef} className="relative">
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: PropsWithChildren) => {
    const { toggleOpen } = useContext(DropDownContext);

    return (
        <div onClick={toggleOpen} className="cursor-pointer">
            {children}
        </div>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white border border-neu-200 rounded-xl shadow-lg',
    children,
}: PropsWithChildren<{
    align?: 'left' | 'right';
    width?: '48' | '56' | '64' | string;
    contentClasses?: string;
}>) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = 'w-48';
    if (width === '56') {
        widthClasses = 'w-56';
    } else if (width === '64') {
        widthClasses = 'w-64';
    } else if (width.startsWith('w-')) {
        widthClasses = width;
    }

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className={`absolute z-50 mt-2 pointer-events-auto ${alignmentClasses} ${widthClasses}`}
                onClick={() => setOpen(false)}
            >
                <div className={contentClasses}>
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({
    className = '',
    children,
    ...props
}: InertiaLinkProps) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-neu-700 transition duration-150 ease-in-out hover:bg-neu-50 focus:bg-neu-50 focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
