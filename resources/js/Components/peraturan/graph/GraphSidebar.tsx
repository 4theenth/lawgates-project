import React from 'react';
import {
    CheckCircle,
    X,
    AlertCircle,
    Search,
    ChevronRight,
    Layers,
} from 'lucide-react';
import { FilterCategoryType, GraphNode } from './types';
import { getNodeTheme, getShortCode, isDocumentAvailable } from './graphTheme';

interface GraphSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    connectedNodes: GraphNode[];
    filteredNodes: GraphNode[];
    searchQuery: string;
    onSearchQueryChange: (q: string) => void;
    filterCategory: FilterCategoryType;
    onFilterCategoryChange: (cat: FilterCategoryType) => void;
    selectedNodeId?: string | number | null;
    onSelectNode: (node: GraphNode) => void;
}

export default function GraphSidebar({
    isOpen,
    onClose,
    connectedNodes,
    filteredNodes,
    searchQuery,
    onSearchQueryChange,
    filterCategory,
    onFilterCategoryChange,
    selectedNodeId,
    onSelectNode,
}: GraphSidebarProps) {
    return (
        <div
            className={`absolute top-0 left-0 bottom-0 z-40 w-80 max-w-[85vw] bg-white/95 backdrop-blur-md border-r border-slate-200/90 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-200/80 bg-slate-50/70 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-slate-900 text-white rounded-lg">
                            <Layers className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 leading-none">Daftar Relasi</h3>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                {connectedNodes.length} Peraturan Terkait
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                        title="Tutup Sidebar"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Search Input Filter */}
                <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => onSearchQueryChange(e.target.value)}
                        placeholder="Cari nomor, tahun, judul..."
                        className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => onSearchQueryChange('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </div>

                {/* Filter Category Tabs */}
                <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-200/60 rounded-xl text-[10.5px] font-semibold text-slate-600">
                    <button
                        type="button"
                        onClick={() => onFilterCategoryChange('all')}
                        className={`px-2 py-0.5 rounded-lg text-center transition-all cursor-pointer ${
                            filterCategory === 'all'
                                ? 'bg-white text-slate-900 shadow-xs font-bold'
                                : 'hover:text-slate-900'
                        }`}
                    >
                        Semua ({connectedNodes.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => onFilterCategoryChange('merujuk')}
                        className={`px-2 py-0.5 rounded-lg text-center transition-all cursor-pointer ${
                            filterCategory === 'merujuk'
                                ? 'bg-white text-emerald-700 shadow-xs font-bold'
                                : 'hover:text-slate-900'
                        }`}
                    >
                        Merujuk
                    </button>
                    <button
                        type="button"
                        onClick={() => onFilterCategoryChange('dirujuk')}
                        className={`px-2 py-0.5 rounded-lg text-center transition-all cursor-pointer ${
                            filterCategory === 'dirujuk'
                                ? 'bg-white text-sky-700 shadow-xs font-bold'
                                : 'hover:text-slate-900'
                        }`}
                    >
                        Dirujuk
                    </button>
                    <button
                        type="button"
                        onClick={() => onFilterCategoryChange('mengubah')}
                        className={`px-2 py-0.5 rounded-lg text-center transition-all cursor-pointer ${
                            filterCategory === 'mengubah'
                                ? 'bg-white text-amber-700 shadow-xs font-bold'
                                : 'hover:text-slate-900'
                        }`}
                    >
                        Mengubah
                    </button>
                    <button
                        type="button"
                        onClick={() => onFilterCategoryChange('diubah')}
                        className={`px-2 py-0.5 rounded-lg text-center transition-all cursor-pointer ${
                            filterCategory === 'diubah'
                                ? 'bg-white text-purple-700 shadow-xs font-bold'
                                : 'hover:text-slate-900'
                        }`}
                    >
                        Diubah
                    </button>
                    <button
                        type="button"
                        onClick={() => onFilterCategoryChange('mencabut')}
                        className={`px-2 py-0.5 rounded-lg text-center transition-all cursor-pointer ${
                            filterCategory === 'mencabut'
                                ? 'bg-white text-rose-700 shadow-xs font-bold'
                                : 'hover:text-slate-900'
                        }`}
                    >
                        Mencabut
                    </button>
                    <button
                        type="button"
                        onClick={() => onFilterCategoryChange('dicabut')}
                        className={`px-2 py-0.5 rounded-lg text-center transition-all cursor-pointer ${
                            filterCategory === 'dicabut'
                                ? 'bg-white text-fuchsia-700 shadow-xs font-bold'
                                : 'hover:text-slate-900'
                        }`}
                    >
                        Dicabut
                    </button>
                </div>
            </div>

            {/* Scrollable List of Related Regulations */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2.5">
                {filteredNodes.length === 0 ? (
                    <div className="py-12 text-center px-4">
                        <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs text-slate-500 font-medium">Tidak ada relasi yang cocok dengan pencarian.</p>
                    </div>
                ) : (
                    filteredNodes.map(node => {
                        const theme = getNodeTheme(node);
                        const isSelected = selectedNodeId === node.id;
                        const shortCode = getShortCode(node);
                        const relLabel = node.relCategory || node.relType || 'Merujuk';
                        const hasDoc = isDocumentAvailable(node);

                        return (
                            <div
                                key={node.id}
                                onClick={() => onSelectNode(node)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer group ${
                                    isSelected
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                                        : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 hover:border-slate-300 hover:shadow-xs'
                                }`}
                            >
                                {/* Card Header: Category Badge & Document Availability */}
                                <div className="flex items-center justify-between mb-1.5">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                            isSelected
                                                ? 'bg-white/15 text-white'
                                                : 'bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: theme.core }}
                                        ></span>
                                        {relLabel}
                                    </span>

                                    {hasDoc ? (
                                        <span className={`text-[10px] font-semibold flex items-center gap-1 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`}>
                                            <CheckCircle className="w-3 h-3" />
                                            Tersedia
                                        </span>
                                    ) : (
                                        <span className={`text-[10px] font-medium ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                                            Draft
                                        </span>
                                    )}
                                </div>

                                {/* Short Code & Title */}
                                <h4 className={`text-xs font-bold leading-snug mb-1 line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-slate-950'}`}>
                                    {shortCode}
                                </h4>
                                <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                                    {node.judul}
                                </p>

                                {/* Card Footer: Focus Trigger */}
                                <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10.5px] font-semibold ${
                                    isSelected ? 'border-white/10 text-slate-200' : 'border-slate-100 text-slate-500 group-hover:text-slate-700'
                                }`}>
                                    <span>Fokus pada Graph</span>
                                    <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
