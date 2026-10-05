import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Maximize2, CheckCircle, Calendar, FileText, X, RotateCcw, ZoomIn, ZoomOut, Sparkles, AlertCircle, ListFilter, Search, ChevronRight, Layers } from 'lucide-react';
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
    has_data?: boolean;
    relType?: string;
    relCategory?: string;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
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
// Color Tokens & Themes (Modern Light Constellation Style)
// ─────────────────────────────────────────────

const ORB_THEMES = {
    center: {
        core: '#0284c7',
        glow: 'rgba(2, 132, 199, 0.35)',
        halo: 'rgba(2, 132, 199, 0.15)',
        ring: '#ffffff',
        line: '#0284c7',
        text: '#0369a1',
    },
    merujuk: {
        core: '#10b981',
        glow: 'rgba(16, 185, 129, 0.35)',
        halo: 'rgba(16, 185, 129, 0.15)',
        ring: '#ffffff',
        line: '#059669',
        text: '#047857',
    },
    dirujuk: {
        core: '#0284c7',
        glow: 'rgba(2, 132, 199, 0.35)',
        halo: 'rgba(2, 132, 199, 0.15)',
        ring: '#ffffff',
        line: '#0284c7',
        text: '#0369a1',
    },
    diubah: {
        core: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.35)',
        halo: 'rgba(245, 158, 11, 0.15)',
        ring: '#ffffff',
        line: '#d97706',
        text: '#b45309',
    },
    mencabut: {
        core: '#e11d48',
        glow: 'rgba(225, 29, 72, 0.35)',
        halo: 'rgba(225, 29, 72, 0.15)',
        ring: '#ffffff',
        line: '#be123c',
        text: '#9f1239',
    },
    default: {
        core: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.35)',
        halo: 'rgba(139, 92, 246, 0.15)',
        ring: '#ffffff',
        line: '#7c3aed',
        text: '#6d28d9',
    },
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const isDocumentAvailable = (node: GraphNode): boolean => {
    if (node.isCenter) return true;
    if (node.has_data === true) return true;
    if (node.has_data === false) return false;

    // Fallback heuristic
    const uid = node.unique_id || '';
    const judul = (node.judul || '').toLowerCase();
    if (!uid || uid.includes('menunggu') || judul.includes('menunggu import')) {
        return false;
    }
    return true;
};

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

// Format short code e.g. "UU 9/2005"
const getShortCode = (node: GraphNode) => {
    let prefix = 'REG';
    const jenis = (node.jenis || '').toLowerCase();
    if (jenis.includes('undang-undang dasar') || jenis.includes('uud')) prefix = 'UUD';
    else if (jenis.includes('undang-undang') || jenis.includes('uu')) prefix = 'UU';
    else if (jenis.includes('pemerintah pengganti') || jenis.includes('perppu')) prefix = 'Perppu';
    else if (jenis.includes('pemerintah') || jenis.includes('pp')) prefix = 'PP';
    else if (jenis.includes('presiden') || jenis.includes('perpres')) prefix = 'Perpres';
    else if (jenis.includes('menteri') || jenis.includes('permen')) prefix = 'Permen';
    else if (jenis.includes('daerah') || jenis.includes('perda')) prefix = 'Perda';

    const nomor = node.nomor || '-';
    const tahun = node.tahun || '-';
    return `${prefix} ${nomor}/${tahun}`;
};

// Determine theme based on node relationship
const getNodeTheme = (node: GraphNode) => {
    if (node.isCenter) return ORB_THEMES.center;

    const rel = (node.relType || node.relCategory || '').toLowerCase();
    if (rel.includes('cabut')) return ORB_THEMES.mencabut;
    if (rel.includes('ubah')) return ORB_THEMES.diubah;
    if (node.relCategory === 'Dirujuk Oleh') return ORB_THEMES.dirujuk;
    if (node.relCategory === 'Merujuk' || rel.includes('ingat') || rel.includes('rujuk')) return ORB_THEMES.merujuk;
    return ORB_THEMES.default;
};

// Helper: draw rounded rectangle
const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function RegulationGraph({ peraturanId, onClose, onExpand, isMini = false }: RegulationGraphProps) {
    const graphRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    const [isGraphReady, setIsGraphReady] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
    const [clickedNode, setClickedNode] = useState<GraphNode | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    // Sidebar States
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<'all' | 'merujuk' | 'dirujuk'>('all');

    const initialCenterDone = useRef(false);

    // Find center node ID
    const centerNodeId = useMemo(() => {
        const center = graphData.nodes.find(n => n.isCenter);
        return center ? center.id : null;
    }, [graphData.nodes]);

    // Connected nodes (excluding center node)
    const connectedNodes = useMemo(() => {
        return graphData.nodes.filter(n => !n.isCenter);
    }, [graphData.nodes]);

    // Filtered nodes for sidebar list based on search and category
    const filteredSidebarNodes = useMemo(() => {
        return connectedNodes.filter(node => {
            if (filterCategory === 'merujuk' && node.relCategory !== 'Merujuk') {
                return false;
            }
            if (filterCategory === 'dirujuk' && node.relCategory !== 'Dirujuk Oleh') {
                return false;
            }

            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            const judul = (node.judul || '').toLowerCase();
            const nomor = (node.nomor || '').toString().toLowerCase();
            const tahun = (node.tahun || '').toString().toLowerCase();
            const shortCode = getShortCode(node).toLowerCase();

            return judul.includes(query) || nomor.includes(query) || tahun.includes(query) || shortCode.includes(query);
        });
    }, [connectedNodes, filterCategory, searchQuery]);

    // Focus graph view on selected node from sidebar
    const handleSelectFromSidebar = useCallback((node: GraphNode) => {
        setClickedNode(node);
        if (graphRef.current) {
            const targetX = node.x || 0;
            const targetY = node.y || 0;
            graphRef.current.centerAt(targetX, targetY, 400);
            graphRef.current.zoom(1.35, 400);

            const screenCoords = graphRef.current.graph2ScreenCoords(targetX, targetY);
            setTooltipPos(screenCoords);
        }
    }, []);

    // Set of active/focused node IDs (Center Node + Clicked/Hovered Node)
    const activeNodeIds = useMemo(() => {
        const active = clickedNode || hoverNode;
        if (!active) return null;
        const set = new Set<string | number>();
        set.add(active.id);
        if (centerNodeId !== null) set.add(centerNodeId);
        return set;
    }, [clickedNode, hoverNode, centerNodeId]);

    // ─────────────────────────────────────────────
    // Data Fetching & Constellation Scattering
    // ─────────────────────────────────────────────

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                const response = await fetch(`/api/peraturan/${peraturanId}/graph`);
                const data = await response.json();

                // Scatter nodes organically in full 360 degrees
                data.nodes = (data.nodes || []).map((n: any) => {
                    if (n.isCenter) {
                        return { ...n, x: 0, y: 0, fx: 0, fy: 0 };
                    }
                    const angle = Math.random() * Math.PI * 2;
                    const randomDist = 130 + Math.random() * 220;

                    return {
                        ...n,
                        x: Math.cos(angle) * randomDist,
                        y: Math.sin(angle) * randomDist,
                    };
                });

                setGraphData(data);
                setLoading(false);
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

        setDimensions({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
        });
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [loading, graphData.nodes.length]);

    // ─────────────────────────────────────────────
    // D3 Force Configuration (Organic Constellation Mesh)
    // ─────────────────────────────────────────────

    useEffect(() => {
        if (!graphRef.current) return;

        // Repulsion force to spread nodes
        graphRef.current.d3Force('charge').strength(-320).distanceMax(800);

        // Dynamic link spring distances
        const linkForce = graphRef.current.d3Force('link');
        if (linkForce) {
            linkForce.distance((link: any) => {
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                const hash = (Number(targetId || 1) * 73 + 19) % 160;
                return 140 + hash;
            });
            linkForce.strength(0.2);
        }

        graphRef.current.d3Force('center', null);
    }, [graphData]);

    // ─────────────────────────────────────────────
    // Event Handlers
    // ─────────────────────────────────────────────

    const handleNodeHover = useCallback((node: any) => {
        setHoverNode(node || null);
        document.body.style.cursor = node ? 'pointer' : 'default';
    }, []);

    const handleNodeClick = useCallback((node: any) => {
        if (!node) {
            setClickedNode(null);
            return;
        }

        // SEMUA node bisa diklik untuk melihat fokus & kartu relasi!
        setClickedNode(node);
        if (graphRef.current) {
            const screenCoords = graphRef.current.graph2ScreenCoords(node.x, node.y);
            setTooltipPos(screenCoords);
        }
    }, []);

    const handleNodeDragEnd = useCallback((node: any) => {
        node.fx = node.x;
        node.fy = node.y;
        if (graphRef.current) {
            graphRef.current.d3ReheatSimulation();
        }
    }, []);

    const handleNodeDrag = useCallback((node: any) => {
        if (!graphRef.current) return;
        graphRef.current.d3ReheatSimulation();

        const coords = graphRef.current.graph2ScreenCoords(node.x, node.y);
        const margin = 50;
        if (
            coords.x < margin ||
            coords.x > dimensions.width - margin ||
            coords.y < margin ||
            coords.y > dimensions.height - margin
        ) {
            const currentZoom = graphRef.current.zoom();
            if (currentZoom > 0.35) {
                graphRef.current.zoom(currentZoom * 0.98, 100);
            }
        }
    }, [dimensions]);

    // Track clicked node position for tooltip positioning
    useEffect(() => {
        let animationFrameId: number;
        const updateTooltipPos = () => {
            if (clickedNode && graphRef.current) {
                const node = graphData.nodes.find(n => n.id === clickedNode.id) || clickedNode;
                const coords = graphRef.current.graph2ScreenCoords(node.x, node.y);
                setTooltipPos(coords);
            }
            animationFrameId = requestAnimationFrame(updateTooltipPos);
        };

        if (clickedNode) updateTooltipPos();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [clickedNode, graphData.nodes]);

    // ─────────────────────────────────────────────
    // Custom Canvas Rendering: Modern Jewel Dots on White / Light Canvas
    // ─────────────────────────────────────────────

    const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
        const isCenter = node.isCenter;
        const isHovered = hoverNode?.id === node.id;
        const isClicked = clickedNode?.id === node.id;
        const isFocused = isHovered || isClicked;

        // Dimming when another node is active
        const isDimmed = activeNodeIds !== null && !activeNodeIds.has(node.id);
        const alpha = isDimmed ? 0.18 : 1;

        ctx.save();
        ctx.globalAlpha = alpha;

        const x = node.x || 0;
        const y = node.y || 0;
        const theme = getNodeTheme(node);

        // Breathing pulse animation
        const pulse = Math.sin(Date.now() / 280) * 1.5;

        if (isCenter) {
            // ─────────────────────────────────────────
            // CENTER NODE: Primary Hub Jewel Dot
            // ─────────────────────────────────────────
            const coreRadius = 11;
            const auraRadius = coreRadius + 8 + pulse;

            // Outer Radiant Sky Halo
            ctx.beginPath();
            ctx.arc(x, y, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.halo;
            ctx.fill();

            // Inner Ring Aura
            ctx.beginPath();
            ctx.arc(x, y, coreRadius + 4, 0, Math.PI * 2);
            ctx.fillStyle = theme.glow;
            ctx.fill();

            // Core Solid Electric Indigo Dot
            ctx.beginPath();
            ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.core;
            ctx.fill();

            // Crisp Pure White Outline
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Monospace Label Below Hub
            const shortCode = getShortCode(node);
            ctx.font = '700 10.5px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            // Background pill for label clarity
            const textW = ctx.measureText(shortCode).width;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
            drawRoundedRect(ctx, x - textW / 2 - 6, y + coreRadius + 5, textW + 12, 16, 4);
            ctx.fill();
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#0f172a';
            ctx.fillText(shortCode, x, y + coreRadius + 7);

        } else {
            // ─────────────────────────────────────────
            // SATELLITE NODE: Luminous Jewel Bead
            // ─────────────────────────────────────────
            const coreRadius = isFocused ? 7.5 : 5.5;
            const auraRadius = isFocused ? coreRadius + 7 + pulse : coreRadius + 3 + pulse;

            // Outer Glowing Halo
            ctx.beginPath();
            ctx.arc(x, y, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.glow;
            ctx.fill();

            // Core Solid Jewel Bead
            ctx.beginPath();
            ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.core;
            ctx.fill();

            // High-Contrast Crisp White Border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = isFocused ? 2 : 1.5;
            ctx.stroke();

            // Short Label Below Dot
            const shortCode = getShortCode(node);
            ctx.font = isFocused ? '700 9.5px Inter, system-ui, sans-serif' : '600 8.5px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            const labelY = y + coreRadius + 5;
            const textW = ctx.measureText(shortCode).width;

            // Clean white pill behind text
            ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
            drawRoundedRect(ctx, x - textW / 2 - 4, labelY - 1, textW + 8, 14, 3);
            ctx.fill();
            ctx.strokeStyle = '#f1f5f9';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            ctx.fillStyle = isFocused ? '#0f172a' : '#334155';
            ctx.fillText(shortCode, x, labelY);
        }

        ctx.restore();
    }, [hoverNode, clickedNode, activeNodeIds]);

    // ─────────────────────────────────────────────
    // Custom Link Render: Hairline Links & Midpoint Relation Badge
    // ─────────────────────────────────────────────

    const drawLinkOverlay = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        const isClickedLink = clickedNode && (
            (sourceId === clickedNode.id && targetId === centerNodeId) ||
            (targetId === clickedNode.id && sourceId === centerNodeId)
        );

        if (!isClickedLink) return;

        const startX = link.source.x || 0;
        const startY = link.source.y || 0;
        const endX = link.target.x || 0;
        const endY = link.target.y || 0;

        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        const theme = getNodeTheme(clickedNode);
        const relText = (clickedNode.relType || clickedNode.relCategory || 'MERUJUK').replace(/_/g, ' ').toUpperCase();

        ctx.save();
        ctx.globalAlpha = 1;

        // Draw Relation Badge Pill at Link Midpoint
        ctx.font = '700 8.5px Inter, system-ui, sans-serif';
        const textW = ctx.measureText(relText).width;
        const pillW = textW + 16;
        const pillH = 18;
        const px = midX - pillW / 2;
        const py = midY - pillH / 2;

        // Drop shadow for badge
        ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;

        // White Pill with Colored Border
        drawRoundedRect(ctx, px, py, pillW, pillH, 9);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        ctx.strokeStyle = theme.line;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = theme.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(relText, midX, midY);

        ctx.restore();
    }, [clickedNode, centerNodeId]);

    // Link Color & Width Logic
    const getLinkColor = useCallback((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        const isClickedLink = clickedNode && (
            (sourceId === clickedNode.id && targetId === centerNodeId) ||
            (targetId === clickedNode.id && sourceId === centerNodeId)
        );

        if (isClickedLink) {
            const theme = getNodeTheme(clickedNode);
            return theme.line;
        }

        if (activeNodeIds !== null) {
            const isConnected = activeNodeIds.has(sourceId) && activeNodeIds.has(targetId);
            if (!isConnected) return 'rgba(226, 232, 240, 0.3)';
        }

        return 'rgba(148, 163, 184, 0.38)'; // Hairline slate line
    }, [clickedNode, activeNodeIds, centerNodeId]);

    const getLinkWidth = useCallback((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        const isClickedLink = clickedNode && (
            (sourceId === clickedNode.id && targetId === centerNodeId) ||
            (targetId === clickedNode.id && sourceId === centerNodeId)
        );

        return isClickedLink ? 2.5 : 0.85;
    }, [clickedNode, centerNodeId]);

    // ─────────────────────────────────────────────
    // Rendering
    // ─────────────────────────────────────────────

    if (loading) {
        return (
            <div
                className={`w-full relative bg-[#fafafa] flex flex-col items-center justify-center ${isMini ? 'h-full' : 'rounded-2xl border border-slate-200/80 shadow-sm'}`}
                style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    height: isMini ? '100%' : 'calc(100vh - 120px)',
                    minHeight: isMini ? '300px' : '500px'
                }}
            >
                <div className="w-9 h-9 border-3 border-slate-300 border-t-slate-800 rounded-full animate-spin mb-4"></div>
                <span className="text-slate-600 font-semibold text-xs tracking-wider">MEMUAT PETA RELASI...</span>
            </div>
        );
    }

    if (graphData.nodes.length === 0) {
        return (
            <div
                className={`w-full relative bg-[#fafafa] flex items-center justify-center ${isMini ? 'h-full' : 'rounded-2xl border border-slate-200/80 shadow-sm'}`}
                style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    height: isMini ? '100%' : 'calc(100vh - 120px)',
                    minHeight: isMini ? '300px' : '500px'
                }}
            >
                <span className="text-slate-400 text-xs font-medium">Tidak ada data relasi hukum untuk peraturan ini.</span>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`w-full relative bg-[#fafafa] overflow-hidden flex flex-col ${isMini ? 'h-full' : 'rounded-2xl border border-slate-200/80 shadow-sm'}`}
            style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                height: isMini ? '100%' : 'calc(100vh - 120px)',
                minHeight: isMini ? '300px' : '500px',
                backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
                backgroundSize: '24px 24px',
            }}
        >
            {/* ── Top Floating Legend & Sidebar Toggle Toolbar ── */}
            <div className={`absolute top-0 left-0 w-full ${isMini ? 'p-3' : 'p-5'} flex justify-between items-start pointer-events-none z-20`}>
                <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Toggle Sidebar Button */}
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border ${
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
                            {connectedNodes.length}
                        </span>
                    </button>

                    {/* Legend Pill */}
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 flex items-center gap-3.5 shadow-sm border border-slate-200/80">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-xs ring-2 ring-emerald-100"></span>
                            <span className={`${isMini ? 'text-[11px]' : 'text-xs'} font-semibold text-slate-700`}>Merujuk</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shadow-xs ring-2 ring-sky-100"></span>
                            <span className={`${isMini ? 'text-[11px]' : 'text-xs'} font-semibold text-slate-700`}>Dirujuk</span>
                        </div>
                        {!isMini && (
                            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200 text-slate-400 text-[11px] font-medium">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-slate-600 font-medium">{graphData.nodes.length} Entitas</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Fullscreen / Reset Toolbar */}
                {!isMini && (
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button
                            type="button"
                            onClick={() => {
                                if (graphRef.current) {
                                    graphRef.current.centerAt(0, 0, 400);
                                    graphRef.current.zoom(1.1, 400);
                                }
                            }}
                            title="Reset Posisi Kamera"
                            className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-slate-50 shadow-sm border border-slate-200/80 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (containerRef.current) {
                                    if (document.fullscreenElement) document.exitFullscreen();
                                    else containerRef.current.requestFullscreen();
                                }
                            }}
                            title="Fullscreen"
                            className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-slate-50 shadow-sm border border-slate-200/80 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* ── Slide-in Sidebar Panel (Left Side) ── */}
            <div
                className={`absolute top-0 left-0 bottom-0 z-30 w-80 max-w-[85vw] bg-white/95 backdrop-blur-md border-r border-slate-200/90 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                            onClick={() => setIsSidebarOpen(false)}
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
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Cari nomor, tahun, judul..."
                            className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                    {/* Filter Category Tabs */}
                    <div className="flex items-center p-1 bg-slate-200/60 rounded-xl text-[11px] font-semibold text-slate-600">
                        <button
                            type="button"
                            onClick={() => setFilterCategory('all')}
                            className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                                filterCategory === 'all'
                                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                                    : 'hover:text-slate-900'
                            }`}
                        >
                            Semua ({connectedNodes.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterCategory('merujuk')}
                            className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                                filterCategory === 'merujuk'
                                    ? 'bg-white text-emerald-700 shadow-xs font-bold'
                                    : 'hover:text-slate-900'
                            }`}
                        >
                            Merujuk
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterCategory('dirujuk')}
                            className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                                filterCategory === 'dirujuk'
                                    ? 'bg-white text-sky-700 shadow-xs font-bold'
                                    : 'hover:text-slate-900'
                            }`}
                        >
                            Dirujuk
                        </button>
                    </div>
                </div>

                {/* Scrollable List of Related Regulations */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                    {filteredSidebarNodes.length === 0 ? (
                        <div className="py-12 text-center px-4">
                            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 font-medium">Tidak ada relasi yang cocok dengan pencarian.</p>
                        </div>
                    ) : (
                        filteredSidebarNodes.map(node => {
                            const theme = getNodeTheme(node);
                            const isSelected = clickedNode?.id === node.id;
                            const shortCode = getShortCode(node);
                            const relLabel = node.relCategory || node.relType || 'Merujuk';
                            const hasDoc = isDocumentAvailable(node);

                            return (
                                <div
                                    key={node.id}
                                    onClick={() => handleSelectFromSidebar(node)}
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

            {/* ── Bottom Right Floating Zoom Pill ── */}
            <div className={`absolute ${isMini ? 'bottom-3 right-3' : 'bottom-6 right-6'} flex flex-col bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md rounded-xl pointer-events-auto z-10 overflow-hidden`}>
                <button
                    type="button"
                    onClick={() => {
                        if (graphRef.current) {
                            graphRef.current.zoom(graphRef.current.zoom() * 1.4, 300);
                        }
                    }}
                    title="Zoom In"
                    className="p-2 hover:bg-slate-100 transition-colors border-b border-slate-200/60 text-slate-600 cursor-pointer"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (graphRef.current) {
                            graphRef.current.zoom(graphRef.current.zoom() / 1.4, 300);
                        }
                    }}
                    title="Zoom Out"
                    className="p-2 hover:bg-slate-100 transition-colors text-slate-600 cursor-pointer"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
            </div>

            {/* ── Smooth Initial Loading Overlay ── */}
            {!isGraphReady && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs">
                    <div className="w-7 h-7 border-3 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-3"></div>
                    <span className="text-slate-500 font-semibold text-xs tracking-wider">Menata konstelasi relasi...</span>
                </div>
            )}

            {/* ── Force Graph Canvas Engine ── */}
            <div className="flex-1 w-full relative min-h-0" style={{ opacity: isGraphReady ? 1 : 0, transition: 'opacity 0.25s ease-in' }}>
                <ForceGraph2D
                    ref={graphRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={graphData}
                    nodeRelSize={1}
                    d3VelocityDecay={0.65}

                    // Links
                    linkColor={getLinkColor}
                    linkWidth={getLinkWidth}
                    linkCurvature={0.06}
                    linkCanvasObjectMode={() => 'after'}
                    linkCanvasObject={drawLinkOverlay}

                    // Zoom & Pan
                    minZoom={0.2}
                    maxZoom={4}
                    enablePanInteraction={true}
                    enableNodeDrag={true}

                    // Interactivity Handlers
                    onNodeHover={handleNodeHover}
                    onNodeClick={handleNodeClick}
                    onNodeDrag={handleNodeDrag}
                    onNodeDragEnd={handleNodeDragEnd}
                    onBackgroundClick={() => setClickedNode(null)}

                    // Custom Orb Node Render
                    nodeCanvasObject={drawNode}

                    // Pointer Touch Boundary Area for Easy Clicking (Generous 28px hit radius for all nodes)
                    nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(node.x || 0, node.y || 0, 28, 0, Math.PI * 2);
                        ctx.fill();
                    }}

                    // Warmup & Auto-fit framing
                    warmupTicks={100}
                    cooldownTicks={100}
                    onEngineStop={() => {
                        if (!graphRef.current) return;
                        if (initialCenterDone.current) return;
                        initialCenterDone.current = true;

                        let maxDist = 0;
                        graphData.nodes.forEach((node: any) => {
                            const dist = Math.sqrt((node.x || 0) ** 2 + (node.y || 0) ** 2);
                            if (dist > maxDist) maxDist = dist;
                        });

                        maxDist += 80;

                        const halfW = dimensions.width / 2;
                        const halfH = dimensions.height / 2;
                        const fitSize = Math.min(halfW, halfH);
                        const padding = isMini ? 30 : 50;
                        const idealZoom = (fitSize - padding) / maxDist;
                        const clampedZoom = Math.max(0.35, Math.min(idealZoom, 1.4));

                        graphRef.current.centerAt(0, 0, 0);
                        graphRef.current.zoom(clampedZoom, 0);

                        requestAnimationFrame(() => {
                            setIsGraphReady(true);
                        });
                    }}
                />
            </div>

            {/* ── Floating Interactive Detail Tooltip (Beside Clicked Node) ── */}
            {clickedNode && (
                <div
                    className="absolute z-50 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
                    style={{
                        left: Math.min(Math.max(tooltipPos.x + 24, 16), dimensions.width - 330),
                        top: Math.min(Math.max(tooltipPos.y - 30, 16), dimensions.height - 240),
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
                                        backgroundColor: getNodeTheme(clickedNode).core,
                                    }}
                                ></span>
                                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                                    {clickedNode.isCenter ? 'Dokumen Utama' : (clickedNode.relType || clickedNode.relCategory || 'Merujuk')}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setClickedNode(null);
                                }}
                                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-slate-900 mb-3 leading-snug line-clamp-3">
                            {clickedNode.judul ||
                                `${clickedNode.jenis || 'Undang-Undang'} Nomor ${clickedNode.nomor} Tahun ${clickedNode.tahun}`}
                        </h4>

                        {/* Status & Tanggal */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200/80">
                                <CheckCircle className="w-3.5 h-3.5" />
                                {clickedNode.status || 'Berlaku'}
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/80">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatTanggal(clickedNode.tanggal_penetapan)}
                            </div>
                        </div>

                        {/* CTA Button: Active if document exists, Disabled if document not yet in database */}
                        {isDocumentAvailable(clickedNode) ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onClose) onClose();
                                    if (clickedNode.unique_id) {
                                        router.visit(`/peraturan/${clickedNode.unique_id}`);
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
            )}
        </div>
    );
}
