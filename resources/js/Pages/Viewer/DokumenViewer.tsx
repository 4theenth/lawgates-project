import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/Components/layout/Navbar';
import { ArrowLeft, Download } from 'lucide-react';

interface DokumenViewerProps {
    peraturan: any;
    pdfUrl: string;
}

export default function DokumenViewer({ peraturan, pdfUrl }: DokumenViewerProps) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Head title={`Dokumen ${peraturan.judul}`} />
            
            <Navbar isScrolled={false} />
            
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl flex flex-col">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={`/peraturan/${peraturan.unique_id}`}
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-700" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 line-clamp-1">{peraturan.judul}</h1>
                            <p className="text-sm text-slate-500">
                                {peraturan.jenis_peraturan?.nama} Nomor {peraturan.nomor} Tahun {peraturan.tahun}
                            </p>
                        </div>
                    </div>
                    
                    {/* Tombol fallback jika user ingin benar-benar mendownloadnya */}
                    <a 
                        href={pdfUrl} 
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                    </a>
                </div>
                
                {/* PDF Viewer Iframe */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200 relative" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <iframe 
                        src={pdfUrl} 
                        className="w-full h-full border-none absolute inset-0"
                        title={`Dokumen PDF ${peraturan.judul}`}
                    />
                </div>
            </main>
        </div>
    );
}
