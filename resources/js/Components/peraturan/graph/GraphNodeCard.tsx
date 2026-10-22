import React from 'react';
import {
    CheckCircle,
    Calendar,
    FileText,
    X,
    AlertCircle,
} from 'lucide-react';
import { router } from '@inertiajs/react';
import { GraphNode } from './types';
import { formatTanggal, getNodeTheme, isDocumentAvailable } from './graphTheme';

interface GraphNodeCardProps {
    cardNode: GraphNode;
    cardPos: { x: number; y: number };
    onCloseCard: () => void;
    onParentClose?: () => void;
}

export default function GraphNodeCard({
    cardNode,
    cardPos,
    onCloseCard,
    onParentClose,
}: GraphNodeCardProps) {
    const theme = getNodeTheme(cardNode);
    const hasDoc = isDocumentAvailable(cardNode);

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute z-30 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
            style={{
                left: cardPos.x,
                top: cardPos.y,
                maxWidth: 320,
            }}
        >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 p-4.5 w-[310px] text-slate-900">
                {/* Header: Badge + Close */}
                <div className="flex items-start justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                                backgroundColor: theme.core,
                            }}
                        ></span>
                        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                            {cardNode.isCenter ? 'Dokumen Utama' : (cardNode.relType || cardNode.relCategory || 'Merujuk')}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onCloseCard();
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title="Tutup Card Info"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-900 mb-3 leading-snug line-clamp-3">
                    {cardNode.judul ||
                        `${cardNode.jenis || 'Undang-Undang'} Nomor ${cardNode.nomor} Tahun ${cardNode.tahun}`}
                </h4>

                {/* Status & Tanggal */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200/80">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {cardNode.status || 'Berlaku'}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/80">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatTanggal(cardNode.tanggal_penetapan)}
                    </div>
                </div>

                {/* CTA Button: Active if document exists, Disabled if document not yet in database */}
                {hasDoc ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onParentClose) onParentClose();
                            if (cardNode.unique_id) {
                                router.visit(`/peraturan/${cardNode.unique_id}`);
                            }
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow cursor-pointer"
                    >
                        <FileText className="w-3.5 h-3.5" />
                        LIHAT DOKUMEN HUKUM
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-400 border border-slate-200 rounded-xl text-xs font-bold tracking-wide cursor-not-allowed select-none"
                    >
                        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                        DOKUMEN BELUM TERSEDIA
                    </button>
                )}
            </div>
        </div>
    );
}
