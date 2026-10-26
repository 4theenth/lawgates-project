import React from 'react';
import {
    Maximize2,
    RotateCcw,
    ZoomIn,
    ZoomOut,
    Sparkles,
    ListFilter,
    Shuffle,
    Eye,
    EyeOff,
} from 'lucide-react';
import { RELATION_LEGEND_ITEMS } from './graphTheme';

interface GraphControlsProps {
    isMini?: boolean;
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
    connectedNodesCount: number;
    totalNodesCount: number;
    showLines: boolean;
    onToggleLines: () => void;
    activeFocusCategory: string | null;
    enabledLineCategories: Record<string, boolean>;
    onCategoryPillClick: (catKey: string) => void;
    onRandomizeLayout: () => void;
    onResetCamera: () => void;
    onToggleFullscreen: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

export default function GraphControls({
    isMini = false,
    isSidebarOpen,
    onToggleSidebar,
    connectedNodesCount,
    totalNodesCount,
    showLines,
    onToggleLines,
    activeFocusCategory,
    enabledLineCategories,
    onCategoryPillClick,
    onRandomizeLayout,
    onResetCamera,
    onToggleFullscreen,
    onZoomIn,
    onZoomOut,
}: GraphControlsProps) {
    return (
        <>
            {/* ── Top Floating Legend & Sidebar Toggle Toolbar ── */}
            <div
                className={`absolute top-0 left-0 w-full ${isMini ? 'p-2 sm:p-3' : 'p-2.5 sm:p-4.5'} flex flex-col gap-2 pointer-events-none z-30 transition-[padding] duration-300 ease-in-out ${
                    isSidebarOpen ? 'md:pl-[336px]' : ''
                }`}
            >
                {/* 1. Baris Atas: Toggle Sidebar & Garis di kiri, Quick Actions di kanan */}
                <div className="flex items-center justify-between w-full gap-2">
                    {/* Sisi Kiri: Tombol Sidebar & Toggle Garis */}
                    <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0 flex-wrap">
                        {/* Toggle Sidebar Button */}
                        <button
                            type="button"
                            onClick={onToggleSidebar}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border shrink-0 ${
                                isSidebarOpen
                                    ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900/20'
                                    : 'bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200/90'
                            }`}
                            title="Buka Sidebar Daftar Relasi"
                        >
                            <ListFilter className="w-3.5 h-3.5" />
                            <span>Daftar Relasi</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                isSidebarOpen ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                            }`}>
                                {connectedNodesCount}
                            </span>
                        </button>

                        {/* Toggle Line Visibility ON / OFF Button */}
                        <button
                            type="button"
                            onClick={onToggleLines}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border shrink-0 ${
                                showLines
                                    ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-600/20'
                                    : 'bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200/90'
                            }`}
                            title="Tampilkan / Sembunyikan Semua Garis Relasi"
                        >
                            {showLines ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>Garis: {showLines ? 'ON' : 'OFF'}</span>
                        </button>
                    </div>

                    {/* Sisi Kanan: Quick Actions (Shuffle, Reset, Fullscreen) */}
                    {!isMini && (
                        <div className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto shrink-0 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-0.5 sm:p-1 shadow-xs">
                            <button
                                type="button"
                                onClick={onRandomizeLayout}
                                title="Acak Layout Bintang (Randomize)"
                                className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                                <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                            </button>
                            <button
                                type="button"
                                onClick={onResetCamera}
                                title="Reset Posisi Kamera"
                                className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={onToggleFullscreen}
                                title="Layar Penuh (Fullscreen)"
                                className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* 2. Baris Bawah: Filter Kategori Relasi (Horizontal scrollable pill strip) */}
                <div className="pointer-events-auto max-w-full">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 sm:p-1.5 flex items-center gap-1 sm:gap-1.5 shadow-xs border border-slate-200/90 overflow-x-auto no-scrollbar w-fit max-w-full">
                        {RELATION_LEGEND_ITEMS.map((cat) => {
                            const isFocused = activeFocusCategory === cat.key;
                            const isLineActive = showLines && (activeFocusCategory === null ? enabledLineCategories[cat.key] !== false : isFocused);

                            return (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => onCategoryPillClick(cat.key)}
                                    className={`flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
                                        isFocused
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-1 ring-slate-900/10'
                                            : isLineActive
                                            ? 'bg-slate-100 border-slate-300/80 shadow-2xs'
                                            : 'opacity-50 bg-transparent border-transparent hover:opacity-90 hover:bg-slate-50'
                                    }`}
                                    title={`Klik untuk fokus garis relasi ${cat.label}`}
                                >
                                    <span
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: cat.color }}
                                    />
                                    <span className={isFocused ? 'text-white font-bold' : cat.textColor}>{cat.label}</span>
                                </button>
                            );
                        })}

                        {!isMini && (
                            <div className="hidden md:flex items-center gap-1.5 pl-2 pr-1 border-l border-slate-200 text-slate-400 text-[11px] font-medium shrink-0 whitespace-nowrap">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-slate-600 font-medium">{totalNodesCount} Entitas</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Bottom Right Floating Zoom Pill ── */}
            <div className={`absolute ${isMini ? 'bottom-2.5 right-2.5' : 'bottom-3 right-3 sm:bottom-5 sm:right-5'} flex flex-col bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-xl pointer-events-auto z-20 overflow-hidden`}>
                <button
                    type="button"
                    onClick={onZoomIn}
                    title="Perbesar (Zoom In)"
                    className="p-1.5 sm:p-2 hover:bg-slate-100 transition-colors border-b border-slate-200/60 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                    type="button"
                    onClick={onZoomOut}
                    title="Perkecil (Zoom Out)"
                    className="p-1.5 sm:p-2 hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                    <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
            </div>
        </>
    );
}
