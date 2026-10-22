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
                className={`absolute top-0 left-0 w-full ${isMini ? 'p-3' : 'p-5'} flex justify-between items-start pointer-events-none z-30 transition-[padding] duration-300 ease-in-out`}
                style={{
                    paddingLeft: isSidebarOpen ? 'calc(min(320px, 85vw) + 16px)' : (isMini ? '12px' : '20px'),
                }}
            >
                <div className="flex items-center gap-2 pointer-events-auto flex-wrap max-w-[calc(100%-140px)]">
                    {/* Toggle Sidebar Button */}
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border shrink-0 ${
                            isSidebarOpen
                                ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900/20'
                                : 'bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200/80'
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
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border shrink-0 ${
                            showLines
                                ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-600/20'
                                : 'bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200/80'
                        }`}
                        title="Tampilkan / Sembunyikan Semua Garis Relasi"
                    >
                        {showLines ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>Garis: {showLines ? 'ON' : 'OFF'}</span>
                    </button>

                    {/* Interactive Legend & Category Line Filter Pills */}
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 flex flex-wrap items-center gap-1.5 shadow-sm border border-slate-200/80 max-w-full">
                        {RELATION_LEGEND_ITEMS.map((cat) => {
                            const isFocused = activeFocusCategory === cat.key;
                            const isLineActive = showLines && (activeFocusCategory === null ? enabledLineCategories[cat.key] !== false : isFocused);

                            return (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => onCategoryPillClick(cat.key)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                                        isFocused
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                                            : isLineActive
                                            ? 'bg-slate-100 border-slate-300 shadow-xs'
                                            : 'opacity-40 bg-transparent border-transparent hover:opacity-80'
                                    }`}
                                    title={`Klik 1x untuk fokus langsung pada garis relasi ${cat.label}`}
                                >
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
                                        style={{ backgroundColor: cat.color }}
                                    ></span>
                                    <span className={isFocused ? 'text-white font-bold' : cat.textColor}>{cat.label}</span>
                                </button>
                            );
                        })}

                        {!isMini && (
                            <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-slate-200 text-slate-400 text-[11px] font-medium shrink-0">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-slate-600 font-medium">{totalNodesCount} Entitas</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Fullscreen / Reset / Shuffle Toolbar */}
                {!isMini && (
                    <div className="flex items-center gap-2 pointer-events-auto shrink-0">
                        <button
                            type="button"
                            onClick={onRandomizeLayout}
                            title="Acak Layout Bintang (Randomize)"
                            className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-slate-50 shadow-sm border border-slate-200/80 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                        >
                            <Shuffle className="w-4 h-4 text-amber-500" />
                        </button>
                        <button
                            type="button"
                            onClick={onResetCamera}
                            title="Reset Posisi Kamera"
                            className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-slate-50 shadow-sm border border-slate-200/80 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={onToggleFullscreen}
                            title="Fullscreen"
                            className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-slate-50 shadow-sm border border-slate-200/80 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* ── Bottom Right Floating Zoom Pill ── */}
            <div className={`absolute ${isMini ? 'bottom-3 right-3' : 'bottom-6 right-6'} flex flex-col bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md rounded-xl pointer-events-auto z-30 overflow-hidden`}>
                <button
                    type="button"
                    onClick={onZoomIn}
                    title="Zoom In"
                    className="p-2 hover:bg-slate-100 transition-colors border-b border-slate-200/60 text-slate-600 cursor-pointer"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={onZoomOut}
                    title="Zoom Out"
                    className="p-2 hover:bg-slate-100 transition-colors text-slate-600 cursor-pointer"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
            </div>
        </>
    );
}
