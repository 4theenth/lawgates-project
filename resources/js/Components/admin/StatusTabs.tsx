import React from 'react';

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
}

interface StatusTabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeTab?: T | string;
  onChange: (tabId: T) => void;
  className?: string;
}

export function StatusTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
}: StatusTabsProps<T>) {
  return (
    <div
      className={`inline-flex items-center rounded-[10px] border border-neu-100 bg-white p-1 shadow-2xs font-sans text-[12px] font-normal leading-[18px] ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <React.Fragment key={tab.id}>
            {index > 0 && (
              <div className="w-[1px] h-[14px] bg-neu-200 mx-1 shrink-0" />
            )}
            <button
              type="button"
              onClick={() => onChange(tab.id)}
              className={`px-3 py-1.5 rounded-[8px] transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-gray-100 text-black font-medium'
                  : 'text-neu-800 hover:text-black hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
