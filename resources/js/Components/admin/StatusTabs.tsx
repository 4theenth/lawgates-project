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

        let activeClass = 'bg-gray-100 text-black font-medium';
        if (tab.id === 'berlaku') {
          activeClass = 'bg-[#E8F2EC] text-[#15803D] border border-[#B9D9C5] font-semibold shadow-2xs';
        } else if (tab.id === 'tidak_berlaku') {
          activeClass = 'bg-[#F8E9E9] text-[#B72121] border border-[#E9BCBC] font-semibold shadow-2xs';
        }

        return (
          <React.Fragment key={tab.id}>
            {index > 0 && !isActive && activeTab !== tabs[index - 1].id && (
              <div className="w-[1px] h-[14px] bg-neu-200 mx-1 shrink-0" />
            )}
            <button
              type="button"
              onClick={() => onChange(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] transition-all duration-150 cursor-pointer ${
                isActive
                  ? activeClass
                  : 'text-neu-800 hover:text-black hover:bg-gray-50'
              }`}
            >
              {isActive && tab.id === 'berlaku' && (
                <span className="w-2 h-2 rounded-full bg-[#15803D] shrink-0" />
              )}
              {isActive && tab.id === 'tidak_berlaku' && (
                <span className="w-2 h-2 rounded-full bg-[#B72121] shrink-0" />
              )}
              <span>{tab.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
