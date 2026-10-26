import React from 'react';
import { ChartColumn } from 'lucide-react';

interface TimelineEmptyStateProps {
  className?: string;
}

export function TimelineEmptyState({ className = '' }: TimelineEmptyStateProps) {
  return (
    <div
      className={`w-full bg-white rounded-[15px] border border-dashed border-neu-200 py-12 px-4 sm:px-8 flex flex-col items-center justify-center text-center transition-all duration-200 ${className}`}
    >
      {/* Icon Capsule Box Sesuai Figma #3124:56242 (Icon / chart-column) */}
      <div className="w-[50px] h-[50px] rounded-[15px] border border-neu-50 bg-white shadow-2xs flex items-center justify-center mb-3">
        <ChartColumn className="w-6 h-6 text-neu-300 stroke-[1.8]" />
      </div>

      {/* Text Info */}
      <div className="space-y-1 max-w-[380px]">
        <h4 className="text-sm font-medium text-neu-900">
          Pilih periode untuk melihat peraturan
        </h4>
        <p className="text-xs text-neu-400 leading-relaxed">
          Klik salah satu bulan pada grafik di atas untuk menampilkan daftar peraturan yang berlaku dan dicabut.
        </p>
      </div>
    </div>
  );
}
