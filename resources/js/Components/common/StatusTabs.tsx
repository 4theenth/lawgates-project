import React from 'react';

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  activeClass?: string;
}

export interface StatusTabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeTab?: T | string;
  onChange: (tabId: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

const DEFAULT_STATUS_STYLES: Record<string, string> = {
  berlaku: 'bg-suc-50 text-suc-900 border border-suc-200 font-semibold shadow-2xs',
  aktif: 'bg-suc-50 text-suc-900 border border-suc-200 font-semibold shadow-2xs',
  tidak_berlaku: 'bg-dan-50 text-dan-900 border border-dan-200 font-semibold shadow-2xs',
  non_aktif: 'bg-dan-50 text-dan-900 border border-dan-200 font-semibold shadow-2xs',
  pending: 'bg-sec-50 text-sec-900 border border-sec-200 font-semibold shadow-2xs',
  expired: 'bg-neu-50 text-neu-900 border border-neu-200 font-semibold shadow-2xs',
  draft: 'bg-neu-50 text-neu-900 border border-neu-200 font-semibold shadow-2xs',
};

export function StatusTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
  size = 'md',
}: StatusTabsProps<T>) {
  const isSm = size === 'sm';

  const containerClasses = isSm
    ? 'p-0.5 rounded-[8px] text-[11px] leading-[16px]'
    : 'p-1 rounded-[10px] text-[12px] font-normal leading-[18px]';

  const buttonClasses = isSm
    ? 'px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[6px] text-[11px]'
    : 'px-2.5 sm:px-3 py-1.5 rounded-[8px] text-[12px]';

  const dividerHeight = isSm ? 'h-[11px]' : 'h-[14px]';

  return (
    <div
      className={`inline-flex items-center border border-neu-100 bg-white shadow-2xs font-sans max-w-full ${containerClasses} ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        const activeClass =
          tab.activeClass ||
          DEFAULT_STATUS_STYLES[tab.id] ||
          'bg-neu-50 text-neu-900 border border-neu-200 font-semibold shadow-2xs';

        const showDivider = index > 0 && !isActive && activeTab !== tabs[index - 1].id;

        return (
          <React.Fragment key={tab.id}>
            {index > 0 && (
              <div
                className={`w-[1px] ${dividerHeight} mx-0.5 shrink-0 transition-opacity duration-150 ${
                  showDivider ? 'bg-neu-200 opacity-100' : 'bg-transparent opacity-0'
                }`}
                aria-hidden="true"
              />
            )}
            <button
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none border focus:outline-none focus-visible:outline-none focus:ring-0 whitespace-nowrap text-center ${buttonClasses} ${
                isActive
                  ? activeClass
                  : 'border-transparent text-neu-800 hover:text-black hover:bg-gray-50'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default StatusTabs;
