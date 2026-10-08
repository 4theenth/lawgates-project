import React, { useState } from 'react';

interface SubscriptionData {
  premiumCount: number;
  freeCount: number;
  totalUsers: number;
}

interface SubscriptionDonutChartProps {
  data?: SubscriptionData;
  className?: string;
}

const DEFAULT_SUBSCRIPTION_DATA: SubscriptionData = {
  premiumCount: 1020,
  freeCount: 2380,
  totalUsers: 3400,
};

export function SubscriptionDonutChart({
  data = DEFAULT_SUBSCRIPTION_DATA,
  className = '',
}: SubscriptionDonutChartProps) {
  // State untuk segmen yang sedang di-hover: null | 'premium' | 'free'
  const [activeSegment, setActiveSegment] = useState<'premium' | 'free' | null>(null);

  const { premiumCount, freeCount, totalUsers } = data;
  const premiumPct = Math.round((premiumCount / totalUsers) * 100);
  const freePct = 100 - premiumPct;

  // Dimensi SVG
  const cx = 110;
  const cy = 110;
  const innerR = 48;
  const normalOuterR = 88;
  const activeOuterR = 98; // Membesar keluar saat hover (191px -> 211px)

  // Helper untuk membuat SVG path busur donat
  const getArcPath = (
    startAngleDeg: number,
    endAngleDeg: number,
    rIn: number,
    rOut: number
  ) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const startRad = toRad(startAngleDeg);
    const endRad = toRad(endAngleDeg);

    const x1Out = cx + rOut * Math.cos(startRad);
    const y1Out = cy + rOut * Math.sin(startRad);
    const x2Out = cx + rOut * Math.cos(endRad);
    const y2Out = cy + rOut * Math.sin(endRad);

    const x2In = cx + rIn * Math.cos(endRad);
    const y2In = cy + rIn * Math.sin(endRad);
    const x1In = cx + rIn * Math.cos(startRad);
    const y1In = cy + rIn * Math.sin(startRad);

    const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

    return `
      M ${x1Out} ${y1Out}
      A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2Out} ${y2Out}
      L ${x2In} ${y2In}
      A ${rIn} ${rIn} 0 ${largeArc} 0 ${x1In} ${y1In}
      Z
    `;
  };

  // Sudut rotasi:
  // Mulai dari -90 derajat (atas)
  // Premium: 30% -> 0.3 * 360 = 108 derajat -> dari -90 ke 18
  // Free: 70% -> 0.7 * 360 = 252 derajat -> dari 18 ke 270 (-90)
  const premiumStart = -90;
  const premiumEnd = -90 + (premiumPct / 100) * 360;
  const freeStart = premiumEnd;
  const freeEnd = premiumStart + 360;

  // Radius dinamis tergantung hover
  const isPremiumActive = activeSegment === 'premium';
  const isFreeActive = activeSegment === 'free';

  const rOutPremium = isPremiumActive ? activeOuterR : normalOuterR;
  const rOutFree = isFreeActive ? activeOuterR : normalOuterR;

  const pathPremium = getArcPath(premiumStart, premiumEnd, innerR, rOutPremium);
  const pathFree = getArcPath(freeStart, freeEnd, innerR, rOutFree);

  // Koordinat teks persentase di tengah busur
  const getMidPoint = (startDeg: number, endDeg: number, r: number) => {
    const midDeg = (startDeg + endDeg) / 2;
    const rad = (midDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const midPremium = getMidPoint(premiumStart, premiumEnd, (innerR + rOutPremium) / 2);
  const midFree = getMidPoint(freeStart, freeEnd, (innerR + rOutFree) / 2);

  // Teks tengah:
  // Default: "3400" dan "Users"
  // Hover Premium: "30%" dan "Users"
  // Hover Free: "70%" dan "Users"
  const centerValue = isPremiumActive
    ? `${premiumPct}%`
    : isFreeActive
    ? `${freePct}%`
    : totalUsers.toLocaleString('id-ID');

  const centerColor = isPremiumActive
    ? 'text-pr-900'
    : isFreeActive
    ? 'text-sec-900'
    : 'text-neu-900';

  return (
    <div
      className={`bg-white rounded-xl border border-neu-50 p-4 sm:p-5 flex flex-col justify-between shadow-2xs ${className}`}
    >
      {/* 1. Header Card */}
      <div className="pb-2 border-b border-neu-50/60">
        <h3 className="text-[16px] font-medium leading-[24px] text-neu-900 tracking-tight">
          Komposisi Paket Langganan
        </h3>
      </div>

      {/* 2. Donut Visual Area */}
      <div className="relative flex items-center justify-center my-3 sm:my-4">
        <div className="relative w-[210px] h-[210px] flex items-center justify-center">
          <svg
            viewBox="0 0 220 220"
            className="w-full h-full overflow-visible select-none drop-shadow-2xs"
            onMouseLeave={() => setActiveSegment(null)}
          >
            {/* Slice 1: Pengguna Gratis (70% - Gold) */}
            <path
              d={pathFree}
              fill="var(--color-sec-900)"
              className="cursor-pointer transition-all duration-300 ease-out"
              opacity={isPremiumActive ? 0.35 : 1}
              onMouseEnter={() => setActiveSegment('free')}
            />

            {/* Slice 2: Pengguna Premium (30% - Navy) */}
            <path
              d={pathPremium}
              fill="var(--color-pr-900)"
              className="cursor-pointer transition-all duration-300 ease-out"
              opacity={isFreeActive ? 0.35 : 1}
              onMouseEnter={() => setActiveSegment('premium')}
            />

            {/* Label 70% di atas busur gratis */}
            <text
              x={midFree.x}
              y={midFree.y + 4}
              textAnchor="middle"
              className="text-[12px] font-medium fill-white pointer-events-none select-none"
            >
              {freePct}%
            </text>

            {/* Label 30% di atas busur premium */}
            <text
              x={midPremium.x}
              y={midPremium.y + 4}
              textAnchor="middle"
              className="text-[12px] font-medium fill-white pointer-events-none select-none"
            >
              {premiumPct}%
            </text>
          </svg>

          {/* Teks Tengah Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span
              className={`text-[20px] sm:text-[22px] font-bold leading-tight tracking-tight transition-colors duration-200 ${centerColor}`}
            >
              {centerValue}
            </span>
            <span className="text-[12px] font-normal text-neu-600 mt-0.5">
              Users
            </span>
          </div>
        </div>
      </div>

      {/* 3. Legend List Bawah */}
      <div className="flex flex-col gap-2 pt-3 border-t border-neu-50/60 text-[12px]">
        {/* Row 1: Pengguna Premium */}
        <div
          className={`flex items-center justify-between p-1 rounded-md transition-colors cursor-pointer ${
            isPremiumActive ? 'bg-neu-50/70' : 'hover:bg-neu-50/40'
          }`}
          onMouseEnter={() => setActiveSegment('premium')}
          onMouseLeave={() => setActiveSegment(null)}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pr-900 shrink-0" />
            <span className="text-neu-600 font-normal">Pengguna Premium</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-pr-900 font-semibold">{premiumCount.toLocaleString('id-ID')}</span>
            <span className="text-neu-600">({premiumPct}%)</span>
          </div>
        </div>

        {/* Row 2: Pengguna Gratis */}
        <div
          className={`flex items-center justify-between p-1 rounded-md transition-colors cursor-pointer ${
            isFreeActive ? 'bg-neu-50/70' : 'hover:bg-neu-50/40'
          }`}
          onMouseEnter={() => setActiveSegment('free')}
          onMouseLeave={() => setActiveSegment(null)}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sec-900 shrink-0" />
            <span className="text-neu-600 font-normal">Pengguna Gratis</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-pr-900 font-semibold">{freeCount.toLocaleString('id-ID')}</span>
            <span className="text-neu-600">({freePct}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDonutChart;
