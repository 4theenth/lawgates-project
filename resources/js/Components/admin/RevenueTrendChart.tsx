import React, { useState, useId } from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';

export interface DayRevenue {
  day: number;
  bulanIni: number;
  bulanLalu: number;
}

interface RevenueTrendChartProps {
  data?: DayRevenue[];
  className?: string;
}

// Data dummy realistis untuk 31 hari
const DEFAULT_REVENUE_DATA: DayRevenue[] = [
  { day: 1, bulanIni: 12000000, bulanLalu: 8000000 },
  { day: 2, bulanIni: 18000000, bulanLalu: 11000000 },
  { day: 3, bulanIni: 15000000, bulanLalu: 14000000 },
  { day: 4, bulanIni: 22000000, bulanLalu: 19000000 },
  { day: 5, bulanIni: 28000000, bulanLalu: 21000000 },
  { day: 6, bulanIni: 25000000, bulanLalu: 24000000 },
  { day: 7, bulanIni: 34000000, bulanLalu: 26000000 },
  { day: 8, bulanIni: 31000000, bulanLalu: 29000000 },
  { day: 9, bulanIni: 42000000, bulanLalu: 33000000 },
  { day: 10, bulanIni: 39000000, bulanLalu: 36000000 },
  { day: 11, bulanIni: 45000000, bulanLalu: 38000000 },
  { day: 12, bulanIni: 48000000, bulanLalu: 42000000 },
  { day: 13, bulanIni: 44000000, bulanLalu: 46000000 },
  { day: 14, bulanIni: 55000000, bulanLalu: 49000000 },
  { day: 15, bulanIni: 52000000, bulanLalu: 51000000 },
  { day: 16, bulanIni: 61000000, bulanLalu: 53000000 },
  { day: 17, bulanIni: 58000000, bulanLalu: 57000000 },
  { day: 18, bulanIni: 67000000, bulanLalu: 59000000 },
  { day: 19, bulanIni: 64000000, bulanLalu: 62000000 },
  { day: 20, bulanIni: 72000000, bulanLalu: 65000000 },
  { day: 21, bulanIni: 69000000, bulanLalu: 67000000 },
  { day: 22, bulanIni: 78000000, bulanLalu: 71000000 },
  { day: 23, bulanIni: 75000000, bulanLalu: 73000000 },
  { day: 24, bulanIni: 83000000, bulanLalu: 76000000 },
  { day: 25, bulanIni: 80000000, bulanLalu: 79000000 },
  { day: 26, bulanIni: 88000000, bulanLalu: 82000000 },
  { day: 27, bulanIni: 85000000, bulanLalu: 84000000 },
  { day: 28, bulanIni: 92000000, bulanLalu: 87000000 },
  { day: 29, bulanIni: 89000000, bulanLalu: 89000000 },
  { day: 30, bulanIni: 96000000, bulanLalu: 92000000 },
  { day: 31, bulanIni: 100000000, bulanLalu: 94000000 },
];

export function RevenueTrendChart({
  data = DEFAULT_REVENUE_DATA,
  className = '',
}: RevenueTrendChartProps) {
  // Mode tampilan: 'line' (default di figma 2258-37915) atau 'bar' (figma 2198-37670)
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const gradientId = useId();

  // Dimensi SVG internal (viewBox)
  const svgWidth = 660;
  const svgHeight = 180;
  const paddingX = 14;
  const paddingY = 12;

  const maxVal = 100000000;
  const yAxisTicks = [
    { label: '100.000.000', value: 100000000 },
    { label: '10.000.000', value: 10000000 },
    { label: '5.000.000', value: 5000000 },
    { label: '1.000.000', value: 1000000 },
    { label: '0', value: 0 },
  ];

  // Fungsi helper kalkulasi posisi koordinat X dan Y
  const getX = (index: number) => {
    const totalPoints = data.length;
    const availableWidth = svgWidth - paddingX * 2;
    return paddingX + (index / (totalPoints - 1)) * availableWidth;
  };

  const getY = (val: number) => {
    const availableHeight = svgHeight - paddingY * 2;
    // Normalisasi posisi Y
    const ratio = Math.min(Math.max(val / maxVal, 0), 1);
    return svgHeight - paddingY - ratio * availableHeight;
  };

  // Format rupiah helper
  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Buat path SVG untuk garis halus (smooth curve)
  const createSmoothLinePath = (values: number[]) => {
    if (values.length === 0) return '';
    const points = values.map((val, idx) => ({ x: getX(idx), y: getY(val) }));

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePathBulanIni = createSmoothLinePath(data.map((d) => d.bulanIni));
  const linePathBulanLalu = createSmoothLinePath(data.map((d) => d.bulanLalu));

  // Area path untuk gradient bawah bulan ini
  const areaPathBulanIni = `${linePathBulanIni} L ${getX(data.length - 1)} ${svgHeight - paddingY} L ${getX(0)} ${svgHeight - paddingY} Z`;

  const hoveredItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div
      className={`bg-white rounded-xl border border-neu-50 p-4 sm:p-5 flex flex-col justify-between shadow-2xs ${className}`}
    >
      {/* 1. Header Card & Switcher Tipe Chart */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neu-50/60">
        <h3 className="text-[16px] font-medium leading-[24px] text-neu-900 tracking-tight">
          Tren Pendapatan Bulanan
        </h3>

        {/* Toggle Bar / Line */}
        <div className="bg-neu-50 p-1 rounded-md flex items-center gap-1">
          {/* Tombol Kiri: Bar Chart */}
          <button
            type="button"
            onClick={() => setChartType('bar')}
            title="Tampilkan Diagram Batang"
            className={`w-[26px] h-[26px] rounded flex items-center justify-center transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-white shadow-2xs text-pr-900'
                : 'text-neu-500 hover:text-neu-900'
            }`}
          >
            <BarChart2 className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Tombol Kanan: Line Chart */}
          <button
            type="button"
            onClick={() => setChartType('line')}
            title="Tampilkan Diagram Garis"
            className={`w-[26px] h-[26px] rounded flex items-center justify-center transition-all cursor-pointer ${
              chartType === 'line'
                ? 'bg-white shadow-2xs text-pr-900'
                : 'text-neu-500 hover:text-neu-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 2. Chart Visual Area */}
      <div className="relative pt-4 sm:pt-6">
        <div className="flex items-stretch gap-2 sm:gap-3">
          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between items-end pb-7 pr-1 text-[11px] sm:text-[12px] text-neu-500 font-normal select-none shrink-0 w-[72px] sm:w-[84px] h-[190px]">
            {yAxisTicks.map((tick, i) => (
              <span key={i} className="leading-none whitespace-nowrap">
                {tick.label}
              </span>
            ))}
          </div>

          {/* SVG Canvas Area */}
          <div className="flex-1 min-w-0 relative h-[190px]">
            {/* Gridlines Horizontal */}
            <div className="absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between pointer-events-none">
              {yAxisTicks.map((_, i) => (
                <div
                  key={i}
                  className="w-full border-b border-neu-50 border-dashed"
                />
              ))}
            </div>

            {/* SVG Content */}
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-[155px] overflow-visible"
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <defs>
                <linearGradient id={`${gradientId}-pr`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-pr-900)" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="var(--color-pr-900)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill for line chart */}
              {chartType === 'line' && (
                <>
                  <path
                    d={areaPathBulanIni}
                    fill={`url(#${gradientId}-pr)`}
                    className="transition-all duration-300"
                  />
                  {/* Line Bulan Lalu (Gold - Secondary/900) */}
                  <path
                    d={linePathBulanLalu}
                    fill="none"
                    stroke="var(--color-sec-900)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                  {/* Line Bulan Ini (Navy - Primary/900) */}
                  <path
                    d={linePathBulanIni}
                    fill="none"
                    stroke="var(--color-pr-900)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                </>
              )}

              {/* Bar mode */}
              {chartType === 'bar' &&
                data.map((item, idx) => {
                  const cx = getX(idx);
                  const barWidth = Math.max(
                    3,
                    (svgWidth / data.length) * 0.3
                  );
                  const hLalu = svgHeight - paddingY - getY(item.bulanLalu);
                  const hIni = svgHeight - paddingY - getY(item.bulanIni);

                  return (
                    <g key={idx} className="transition-opacity duration-150">
                      {/* Bar Bulan Lalu (Gold - Secondary/900) */}
                      <rect
                        x={cx - barWidth - 1}
                        y={getY(item.bulanLalu)}
                        width={barWidth}
                        height={Math.max(1, hLalu)}
                        rx="2"
                        fill="var(--color-sec-900)"
                        opacity={hoveredIndex !== null && hoveredIndex !== idx ? 0.4 : 0.9}
                      />
                      {/* Bar Bulan Ini (Navy - Primary/900) */}
                      <rect
                        x={cx + 1}
                        y={getY(item.bulanIni)}
                        width={barWidth}
                        height={Math.max(1, hIni)}
                        rx="2"
                        fill="var(--color-pr-900)"
                        opacity={hoveredIndex !== null && hoveredIndex !== idx ? 0.4 : 1}
                      />
                    </g>
                  );
                })}

              {/* Hover crosshair line & dot for line chart */}
              {hoveredIndex !== null && chartType === 'line' && (
                <>
                  <line
                    x1={getX(hoveredIndex)}
                    y1={paddingY}
                    x2={getX(hoveredIndex)}
                    y2={svgHeight - paddingY}
                    stroke="var(--color-neu-500)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  {/* Dot Bulan Lalu */}
                  <circle
                    cx={getX(hoveredIndex)}
                    cy={getY(data[hoveredIndex].bulanLalu)}
                    r="4"
                    fill="var(--color-sec-900)"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  {/* Dot Bulan Ini */}
                  <circle
                    cx={getX(hoveredIndex)}
                    cy={getY(data[hoveredIndex].bulanIni)}
                    r="5"
                    fill="var(--color-pr-900)"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                </>
              )}

              {/* Invisible interactive hover columns */}
              {data.map((_, idx) => {
                const totalPoints = data.length;
                const colWidth = svgWidth / totalPoints;
                const colX = Math.max(0, getX(idx) - colWidth / 2);

                return (
                  <rect
                    key={`interactive-${idx}`}
                    x={colX}
                    y={0}
                    width={colWidth}
                    height={svgHeight}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                  />
                );
              })}
            </svg>

            {/* X-Axis labels (1..31) */}
            <div className="absolute inset-x-0 bottom-0 h-6 flex justify-between items-center px-1 text-[10px] sm:text-[11px] text-neu-500 font-normal select-none pointer-events-none">
              {data.map((item, idx) => (
                <span
                  key={idx}
                  className={`text-center transition-colors ${
                    hoveredIndex === idx
                      ? 'text-pr-900 font-bold scale-110'
                      : 'text-neu-500'
                  }`}
                  style={{ width: `${100 / data.length}%` }}
                >
                  {item.day}
                </span>
              ))}
            </div>

            {/* Tooltip Overlay */}
            {hoveredIndex !== null && hoveredItem && (
              <div
                className="absolute z-20 pointer-events-none bg-neu-900 text-white rounded-lg px-2.5 py-1.5 shadow-md text-xs -translate-x-1/2 transition-all duration-75 whitespace-nowrap"
                style={{
                  left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
                  top: '10px',
                }}
              >
                <div className="font-semibold text-neu-100 mb-1 border-b border-neu-700/60 pb-0.5">
                  Tanggal {hoveredItem.day}
                </div>
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <span className="w-2 h-2 rounded-full bg-sec-900 shrink-0" />
                  <span>Bulan lalu: {formatRupiah(hoveredItem.bulanLalu)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <span className="w-2 h-2 rounded-full bg-pr-200 shrink-0" />
                  <span>Bulan ini: {formatRupiah(hoveredItem.bulanIni)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Legend Row */}
      <div className="flex items-center justify-center gap-5 pt-3 sm:pt-4 border-t border-neu-50/60 text-[12px] text-neu-900">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-sec-900 shrink-0" />
          <span className="font-normal text-neu-700">Bulan lalu</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-pr-900 shrink-0" />
          <span className="font-medium text-neu-900">Bulan ini</span>
        </div>
      </div>
    </div>
  );
}

export default RevenueTrendChart;
