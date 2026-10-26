import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { GraphNode } from './types';
import { getNodeTheme } from './graphTheme';

export interface GraphHoverCardProps {
    cardRef?: React.Ref<HTMLDivElement>;
    node: GraphNode;
    pos: { x: number; y: number };
}

export default function GraphHoverCard({
    cardRef,
    node,
    pos,
}: GraphHoverCardProps) {
    const theme = getNodeTheme(node);
    const statusLabel = node.status || 'Berlaku';
    const statusLower = statusLabel.toLowerCase();
    const isBerlaku = !statusLower.includes('tidak') && !statusLower.includes('cabut');

    const displayTitle = node.judul || `${node.jenis || 'Undang-Undang'} Nomor ${node.nomor} Tahun ${node.tahun}`;

    const safeX = typeof pos?.x === 'number' && !isNaN(pos.x) ? Math.round(pos.x) : 0;
    const safeY = typeof pos?.y === 'number' && !isNaN(pos.y) ? Math.round(pos.y) : 0;

    return (
        <div
            ref={cardRef}
            className="absolute z-30 pointer-events-none select-none"
            style={{
                transform: `translate3d(${safeX}px, ${safeY}px, 0)`,
                left: 0,
                top: 0,
                transition: 'none',
                willChange: 'transform',
            }}
        >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/80 p-3 w-[270px] text-slate-900">
                {/* Header: Kategori / Relasi + Status Keberlakuan */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: theme.core }}
                        />
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 truncate">
                            {node.isCenter ? 'Dokumen Utama' : (node.relType || node.relCategory || 'Merujuk')}
                        </span>
                    </div>

                    {/* Status Keberlakuan */}
                    <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 border ${
                            isBerlaku
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                                : 'bg-rose-50 text-rose-700 border-rose-200/80'
                        }`}
                    >
                        {isBerlaku ? (
                            <CheckCircle className="w-3 h-3" />
                        ) : (
                            <AlertCircle className="w-3 h-3" />
                        )}
                        <span>{statusLabel}</span>
                    </span>
                </div>

                {/* Judul Peraturan */}
                <h5 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 mb-2">
                    {displayTitle}
                </h5>

                {/* Nomor dan Tahun */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1.5 border-t border-slate-100">
                    <span>Nomor: <strong className="text-slate-700 font-semibold">{node.nomor || '-'}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Tahun: <strong className="text-slate-700 font-semibold">{node.tahun || '-'}</strong></span>
                </div>
            </div>
        </div>
    );
}
