import React, { useEffect, useRef, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Maximize2, CheckCircle, Calendar, FileText, X } from 'lucide-react';
import { router } from '@inertiajs/react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface GraphNode {
    id: string | number;
    judul: string;
    nomor: string;
    tahun: number;
    jenis: string;
    unique_id?: string;
    status?: string;
    tanggal_penetapan?: string;
    isCenter: boolean;
    relType?: string;
    relCategory?: string;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

interface GraphLink {
    source: any;
    target: any;
    type: string;
    relCategory?: string;
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

interface RegulationGraphProps {
    peraturanId: number;
    onClose?: () => void;
    onExpand?: () => void;
    isMini?: boolean;
}

// ─────────────────────────────────────────────
// Design Tokens (Sesuai Figma)
// ─────────────────────────────────────────────

// Warna utama dari desain Figma
const FILL_CENTER = '#0f172a';       // Biru gelap/navy untuk node pusat
const FILL_DIRUJUK = '#1e3a5f';      // Biru navy untuk "Dirujuk Oleh"
const FILL_MERUJUK = '#16a34a';      // Hijau untuk "Merujuk"
const LINE_COLOR = '#334155';        // Warna garis penghubung (gelap netral, sesuai Figma)
const TEXT_MAIN = '#1e293b';         // Warna teks label

// Badge
const BADGE_MERUJUK_BG = '#dcfce7';
const BADGE_MERUJUK_TEXT = '#166534';
const BADGE_DIRUJUK_BG = '#e2e8f0';
const BADGE_DIRUJUK_TEXT = '#334155';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const formatTanggal = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

// Potong teks jika terlalu panjang
const truncate = (text: string, maxLen: number) => {
    if (!text) return '';
    return text.length > maxLen ? text.substring(0, maxLen - 3) + '...' : text;
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function RegulationGraph({ peraturanId, onClose, onExpand, isMini = false }: RegulationGraphProps) {
    const graphRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
    const [clickedNode, setClickedNode] = useState<GraphNode | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    
    // Melacak apakah grafik sudah pernah di-center saat pertama kali dimuat
    const initialCenterDone = useRef(false);

    // ─────────────────────────────────────────────
    // Data Fetching
    // ─────────────────────────────────────────────

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                const response = await fetch(`/api/peraturan/${peraturanId}/graph`);
                const data = await response.json();

                // Posisi awal acak dekat pusat
                data.nodes = data.nodes.map((n: any) => ({
                    ...n,
                    x: n.isCenter ? 0 : (Math.random() - 0.5) * 80,
                    y: n.isCenter ? 0 : (Math.random() - 0.5) * 80,
                }));

                setGraphData(data);
                setLoading(false);
                // Reset tracker jika data berubah
                initialCenterDone.current = false;
            } catch (error) {
                console.error('Gagal memuat data graph:', error);
                setLoading(false);
            }
        };

        fetchGraph();
    }, [peraturanId]);

    // ─────────────────────────────────────────────
    // Resize Observer
    // ─────────────────────────────────────────────

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(() => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        });
        
        // Set initial size
        setDimensions({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
        });
        observer.observe(containerRef.current);
        
        return () => observer.disconnect();
    }, [loading, graphData.nodes.length]);

    // ─────────────────────────────────────────────
    // D3 Force Configuration
    // ─────────────────────────────────────────────

    useEffect(() => {
        if (!graphRef.current) return;

        // Charge: tolakan lembut antar node agar tidak saling tumpuk
        graphRef.current.d3Force('charge').strength(-250).distanceMax(600);

        // Link: tarikan pegas yang lembut & kalem (tidak bouncy/memantul)
        const linkForce = graphRef.current.d3Force('link');
        
        linkForce.distance((link: any) => {
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            const hash = (targetId * 7 + 13) % 60;
            return 160 + hash; 
        });
        
        // Link strength 0.25 sangat kalem dan luwes tanpa getaran/bouncing
        linkForce.strength(0.25);

        // Matikan force center agar tidak menggeser node lain
        graphRef.current.d3Force('center', null);
    }, [graphData]);

    // ─────────────────────────────────────────────
    // Event Handlers
    // ─────────────────────────────────────────────

    const handleNodeHover = useCallback((node: any) => {
        setHoverNode(node || null);
        document.body.style.cursor = node ? 'pointer' : 'default';
    }, []);

    const handleNodeClick = useCallback((node: any, event: MouseEvent) => {
        if (!node || node.isCenter) {
            setClickedNode(null);
            return;
        }
        setClickedNode(node);
        if (graphRef.current) {
            const screenCoords = graphRef.current.graph2ScreenCoords(node.x, node.y);
            setTooltipPos(screenCoords);
        }
    }, []);

    // Node dragging: saat dilepas, kunci posisinya di tempat terakhir agar STAY di situ
    const handleNodeDragEnd = useCallback((node: any) => {
        node.fx = node.x;
        node.fy = node.y;
        if (graphRef.current) {
            graphRef.current.d3ReheatSimulation();
        }
    }, []);

    // Saat sedang drag node
    const handleNodeDrag = useCallback((node: any) => {
        if (!graphRef.current) return;

        // Simulasi berjalan lembut selama kursor digerakkan
        graphRef.current.d3ReheatSimulation();

        if (node.isCenter) return;
        const coords = graphRef.current.graph2ScreenCoords(node.x, node.y);
        const margin = 60;
        if (
            coords.x < margin ||
            coords.x > dimensions.width - margin ||
            coords.y < margin ||
            coords.y > dimensions.height - margin
        ) {
            // Zoom out sedikit supaya node tidak keluar layar
            const currentZoom = graphRef.current.zoom();
            if (currentZoom > 0.4) {
                graphRef.current.zoom(currentZoom * 0.97, 100);
            }
        }
    }, [dimensions]);

    // Tooltip tracking: selalu ikuti pergerakan node (karena pan/zoom atau fisika)
    useEffect(() => {
        let animationFrameId: number;

        const updateTooltipPos = () => {
            if (clickedNode && graphRef.current) {
                // Ambil koordinat terbaru dari node
                const node = graphData.nodes.find(n => n.id === clickedNode.id) || clickedNode;
                const coords = graphRef.current.graph2ScreenCoords(node.x, node.y);
                setTooltipPos(coords);
            }
            animationFrameId = requestAnimationFrame(updateTooltipPos);
        };

        if (clickedNode) {
            updateTooltipPos();
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [clickedNode, graphData.nodes]);

    // ─────────────────────────────────────────────
    // Canvas: Custom Node Rendering (Sesuai Figma)
    // ─────────────────────────────────────────────

    const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const isCenter = node.isCenter;
        const isHovered = hoverNode?.id === node.id;
        const isClicked = clickedNode?.id === node.id;

        // Ukuran node: center jauh lebih besar
        const baseR = isCenter ? 30 : 14;
        // Hover: sedikit membesar
        const r = (isHovered || isClicked) && !isCenter ? baseR * 1.2 : baseR;

        // Warna fill sesuai relCategory (persis Figma)
        const fillColor = isCenter
            ? FILL_CENTER
            : node.relCategory === 'Merujuk'
                ? FILL_MERUJUK
                : FILL_DIRUJUK;

        // ── Gambar lingkaran node ──
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();

        // Hover/Click: ring halus di luar (efek interaktif)
        if ((isHovered || isClicked) && !isCenter) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
            ctx.strokeStyle = fillColor + '40'; // 25% opacity
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        // ── Teks label (nama peraturan) ──
        const labelFontSize = isCenter ? 12 : 10;
        ctx.font = `600 ${labelFontSize}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const labelY = node.y + r + 8;

        // Teks label: ambil dari data backend (node.judul), bukan hardcoded
        const labelText = truncate(node.judul || `${node.jenis || ''} Nomor ${node.nomor} Tahun ${node.tahun}`, isCenter ? 55 : 30);

        // Outline putih agar terbaca di atas garis
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ffffff';
        ctx.strokeText(labelText, node.x, labelY);

        ctx.fillStyle = TEXT_MAIN;
        ctx.fillText(labelText, node.x, labelY);

        // ── Badge relasi (hanya untuk node cabang) ──
        if (!isCenter && node.relCategory) {
            const badgeText = node.relCategory;
            const badgeFontSize = 8;
            ctx.font = `700 ${badgeFontSize}px Inter, system-ui, sans-serif`;

            const tw = ctx.measureText(badgeText).width;
            const padX = 8;
            const padY = 4;
            const bw = tw + padX * 2;
            const bh = badgeFontSize + padY * 2;
            const bx = node.x - bw / 2;
            const by = labelY + labelFontSize + 4;
            const br = bh / 2; // Radius untuk pill

            // Pill shape
            ctx.beginPath();
            ctx.moveTo(bx + br, by);
            ctx.lineTo(bx + bw - br, by);
            ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + br);
            ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - br, by + bh);
            ctx.lineTo(bx + br, by + bh);
            ctx.quadraticCurveTo(bx, by + bh, bx, by + br);
            ctx.quadraticCurveTo(bx, by, bx + br, by);
            ctx.closePath();

            const isMerujuk = node.relCategory === 'Merujuk';
            ctx.fillStyle = isMerujuk ? BADGE_MERUJUK_BG : BADGE_DIRUJUK_BG;
            ctx.fill();

            ctx.fillStyle = isMerujuk ? BADGE_MERUJUK_TEXT : BADGE_DIRUJUK_TEXT;
            ctx.textBaseline = 'middle';
            ctx.fillText(badgeText, node.x, by + bh / 2);
        }
    }, [hoverNode, clickedNode]);

    // ─────────────────────────────────────────────
    // Rendering
    // ─────────────────────────────────────────────

    if (loading) {
        return (
            <div className={`w-full h-full flex flex-col items-center justify-center bg-white ${isMini ? 'p-4 min-h-[300px]' : 'h-[600px] rounded-2xl border border-gray-100'}`}>
                <div className="w-8 h-8 border-4 border-[#0f172a] border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-gray-500 font-medium text-sm">Memuat Peta Relasi...</span>
            </div>
        );
    }

    if (graphData.nodes.length <= 1) {
        return (
            <div className={`w-full h-full flex items-center justify-center bg-white ${isMini ? 'p-4 min-h-[200px]' : 'h-[600px] rounded-2xl border border-gray-100'}`}>
                <span className="text-gray-500 text-xs text-center">Tidak ada relasi terkait untuk peraturan ini.</span>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`w-full relative bg-white overflow-hidden flex flex-col ${isMini ? 'h-full' : 'rounded-2xl border border-gray-200 shadow-sm'}`}
            style={{ 
                fontFamily: "'Inter', system-ui, sans-serif", 
                height: isMini ? '100%' : 'calc(100vh - 120px)', 
                minHeight: isMini ? '300px' : '500px' 
            }}
        >
            {/* ── Legend (Kiri Atas, sesuai Figma) ── */}
            <div className={`absolute top-0 left-0 w-full ${isMini ? 'p-3' : 'p-5'} flex justify-between items-start pointer-events-none z-10`}>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 pointer-events-auto space-y-1.5 shadow-2xs border border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FILL_MERUJUK }}></div>
                        <span className={`${isMini ? 'text-[11px]' : 'text-sm'} font-medium text-gray-700`}>Merujuk</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FILL_DIRUJUK }}></div>
                        <span className={`${isMini ? 'text-[11px]' : 'text-sm'} font-medium text-gray-700`}>Dirujuk Oleh</span>
                    </div>
                </div>

                {!isMini && (
                    <span className="text-sm font-bold text-gray-500 tracking-widest mt-1">RELASI</span>
                )}

                {/* Fullscreen Button (hanya tampil jika bukan mini, karena mini sudah ada di header floating) */}
                {!isMini && (
                    <button
                        type="button"
                        onClick={() => {
                            if (containerRef.current) {
                                if (document.fullscreenElement) document.exitFullscreen();
                                else containerRef.current.requestFullscreen();
                            }
                        }}
                        title="Fullscreen"
                        className="p-2 bg-white hover:bg-gray-50 shadow-sm border border-gray-200 rounded-lg pointer-events-auto transition-colors text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* ── Zoom Buttons (Kanan Bawah) ── */}
            <div className={`absolute ${isMini ? 'bottom-4 right-3' : 'bottom-6 right-6'} flex flex-col bg-white border border-gray-200 shadow-sm rounded-lg pointer-events-auto z-10 overflow-hidden`}>
                <button
                    type="button"
                    onClick={() => {
                        if (graphRef.current) {
                            graphRef.current.zoom(graphRef.current.zoom() * 1.5, 300);
                        }
                    }}
                    className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors border-b border-gray-100 text-gray-600 text-xs font-medium cursor-pointer"
                >
                    +
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (graphRef.current) {
                            graphRef.current.zoom(graphRef.current.zoom() / 1.5, 300);
                        }
                    }}
                    className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-600 text-xs font-medium cursor-pointer"
                >
                    −
                </button>
            </div>

            {/* ── Force Graph Canvas ── */}
            <div className="flex-1 w-full relative min-h-0">
                <ForceGraph2D
                    ref={graphRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={graphData}
                    nodeRelSize={1}
                    d3VelocityDecay={0.65}

                    // Link styling: warna gelap netral, sesuai Figma
                    linkColor={() => LINE_COLOR}
                    linkWidth={1.5}
                    linkDirectionalArrowLength={0}

                    // Zoom (scroll zoom tetap aktif)
                    minZoom={0.3}
                    maxZoom={4}

                    // Pan: aktif agar bisa geser-geser layar
                    enablePanInteraction={true}

                    // Interaksi
                    onNodeHover={handleNodeHover}
                    onNodeClick={handleNodeClick}
                    onNodeDrag={handleNodeDrag}
                    onNodeDragEnd={handleNodeDragEnd}
                    onBackgroundClick={() => setClickedNode(null)}
                    enableNodeDrag={true}

                    // Custom node render
                    nodeCanvasObject={drawNode}

                    // KUNCI: Area sentuh node (tanpa ini, klik & drag TIDAK akan bekerja
                    // karena library tidak tahu batas lingkaran custom kita)
                    nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
                        const r = node.isCenter ? 45 : 22;
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
                        ctx.fill();
                    }}

                    // Simulasi
                    warmupTicks={30}
                    onEngineStop={() => {
                        if (!graphRef.current) return;
                        
                        // Hanya lakukan auto-center sekali saat pertama kali graph dimuat!
                        if (initialCenterDone.current) return;
                        initialCenterDone.current = true;

                        // Hitung jarak terjauh node dari pusat (0,0)
                        let maxDist = 0;
                        graphData.nodes.forEach((node: any) => {
                            const dist = Math.sqrt((node.x || 0) ** 2 + (node.y || 0) ** 2);
                            if (dist > maxDist) maxDist = dist;
                        });

                        // Tambah ruang untuk label + badge (~40px)
                        maxDist += 40;

                        // Hitung zoom agar graph mengisi seluruh kotak (padding minimal)
                        const halfW = dimensions.width / 2;
                        const halfH = dimensions.height / 2;
                        const fitSize = Math.min(halfW, halfH);
                        const padding = isMini ? 25 : 40;
                        const idealZoom = (fitSize - padding) / maxDist;
                        const clampedZoom = Math.max(0.3, Math.min(idealZoom, 2.5));

                        // Center di (0,0) dan set zoom agar mengisi kotak penuh
                        graphRef.current.centerAt(0, 0, 800);
                        graphRef.current.zoom(clampedZoom, 800);
                    }}
                />
            </div>

            {/* ── Tooltip Card (Muncul Saat Klik Node, sesuai Figma) ── */}
            {clickedNode && !clickedNode.isCenter && (
                <div
                    className="absolute z-50 pointer-events-auto"
                    style={{
                        left: Math.min(tooltipPos.x + 20, dimensions.width - 340),
                        top: Math.max(tooltipPos.y - 30, 10),
                        maxWidth: 320,
                    }}
                >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-[300px]">
                        {/* Header: badge + close */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{
                                        backgroundColor: clickedNode.relCategory === 'Merujuk' ? FILL_MERUJUK : FILL_DIRUJUK,
                                    }}
                                ></div>
                                <span className="text-xs font-semibold text-gray-500">
                                    {clickedNode.relCategory}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setClickedNode(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-gray-900 mb-3 leading-snug line-clamp-3">
                            {clickedNode.judul ||
                                `${clickedNode.jenis || 'Undang-Undang'} Nomor ${clickedNode.nomor} Tahun ${clickedNode.tahun}`}
                        </h4>

                        {/* Status & Tanggal */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium border border-emerald-200">
                                <CheckCircle className="w-3 h-3" />
                                {clickedNode.status || 'Berlaku'}
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                                <Calendar className="w-3 h-3" />
                                Ditetapkan: {formatTanggal(clickedNode.tanggal_penetapan)}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onClose) onClose();
                                if (clickedNode.unique_id) {
                                    router.visit(`/peraturan/${clickedNode.unique_id}`);
                                }
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                            <FileText className="w-3.5 h-3.5" />
                            Lihat Dokumen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
