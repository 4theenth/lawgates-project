import React, { useState } from 'react';
import { User } from '@/types';
import { ProfileInfoForm } from './ProfileInfoForm';
import { ProfilePasswordForm } from './ProfilePasswordForm';

interface ProfileFormCardProps {
  user: User;
  className?: string;
  defaultTab?: 'info' | 'password';
}

export function ProfileFormCard({
  user,
  className = '',
  defaultTab = 'info',
}: ProfileFormCardProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'password'>(defaultTab);

  return (
    <div
      className={`w-full md:flex-1 md:max-w-[681px] min-w-0 min-h-[307px] bg-white border border-neu-50 rounded-[12px] p-5 lg:p-6 shadow-2xs flex flex-col ${activeTab === 'info' ? 'justify-between' : ''} ${className}`}
    >
      {/* Tab Navigation Header */}
      <div className="border-b border-neu-50 mb-4">
        <div className="flex items-center gap-6">
          {/* Tab 1: Informasi Pribadi */}
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`w-[114px] text-left transition-colors relative pb-3 cursor-pointer font-sans text-[14px] leading-[20px] ${
              activeTab === 'info'
                ? 'font-medium text-neu-900'
                : 'font-normal text-neu-600 hover:text-neu-900'
            }`}
          >
            Informasi Pribadi
            {activeTab === 'info' && (
              <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-pr-900 rounded-full" />
            )}
          </button>

          {/* Tab 2: Reset Password */}
          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`w-[114px] text-left transition-colors relative pb-3 cursor-pointer font-sans text-[14px] leading-[20px] ${
              activeTab === 'password'
                ? 'font-medium text-neu-900'
                : 'font-normal text-neu-600 hover:text-neu-900'
            }`}
          >
            Reset Password
            {activeTab === 'password' && (
              <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-pr-900 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' ? (
        <ProfileInfoForm user={user} />
      ) : (
        <ProfilePasswordForm user={user} />
      )}
    </div>
  );
}
