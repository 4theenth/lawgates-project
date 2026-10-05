import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Maximize2, CheckCircle, Calendar, FileText, X, RotateCcw, ZoomIn, ZoomOut, Sparkles, AlertCircle, ListFilter, Search, ChevronRight, Layers, Shuffle, Eye, EyeOff } from 'lucide-react';
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
    targetDistance?: number;
    targetAngle?: number;
    baseX?: number;
    baseY?: number;
    driftSpeedX?: number;
    driftSpeedY?: number;
    driftAmpX?: number;
    driftAmpY?: number;
    phaseX?: number;
    phaseY?: number;
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
        label: 'Pusat',
    },
    merujuk: {
        core: '#10b981',
        glow: 'rgba(16, 185, 129, 0.35)',
        halo: 'rgba(16, 185, 129, 0.15)',
        ring: '#ffffff',
        line: '#059669',
        text: '#047857',
        label: 'Merujuk',
    },
    dirujuk: {
        core: '#0284c7',
        glow: 'rgba(2, 132, 199, 0.35)',
        halo: 'rgba(2, 132, 199, 0.15)',
        ring: '#ffffff',
        line: '#0284c7',
        text: '#0369a1',
        label: 'Dirujuk Oleh',
    },
    mengubah: {
        core: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.35)',
        halo: 'rgba(245, 158, 11, 0.15)',
        ring: '#ffffff',
        line: '#d97706',
        text: '#b45309',
        label: 'Mengubah',
    },
    diubah: {
        core: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.35)',
        halo: 'rgba(139, 92, 246, 0.15)',
        ring: '#ffffff',
        line: '#7c3aed',
        text: '#6d28d9',
        label: 'Diubah Oleh',
    },
    mencabut: {
        core: '#e11d48',
        glow: 'rgba(225, 29, 72, 0.35)',
        halo: 'rgba(225, 29, 72, 0.15)',
        ring: '#ffffff',
        line: '#be123c',
        text: '#9f1239',
        label: 'Mencabut',
    },
    dicabut: {
        core: '#d946ef',
        glow: 'rgba(217, 70, 239, 0.35)',
        halo: 'rgba(217, 70, 239, 0.15)',
        ring: '#ffffff',
        line: '#c026d3',
        text: '#a21caf',
        label: 'Dicabut Oleh',
    },
    default: {
        core: '#64748b',
        glow: 'rgba(100, 116, 139, 0.35)',
        halo: 'rgba(100, 116, 139, 0.15)',
        ring: '#ffffff',
        line: '#475569',
        text: '#334155',
        label: 'Relasi Lain',
    },
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const isDocumentAvailable = (node: GraphNode): boolean => {
    if (node.isCenter) return true;
    if (node.has_data === true) return true;
    if (node.has_data === false) return false;

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

// Determine precise category key for a node
const getNodeCategoryKey = (node: GraphNode): string => {
    if (node.isCenter) return 'center';

    const relCat = (node.relCategory || '').toLowerCase();
    const relType = (node.relType || '').toLowerCase();

    if (relCat === 'dicabut oleh' || relType === 'dicabut_oleh' || relCat.includes('dicabut oleh')) return 'dicabut';
    if (relCat === 'mencabut' || relType === 'mencabut') return 'mencabut';
    if (relCat === 'diubah oleh' || relType === 'diubah_oleh' || relCat.includes('diubah oleh')) return 'diubah';
    if (relCat === 'mengubah' || relType === 'mengubah') return 'mengubah';
    if (relCat === 'dirujuk oleh' || relType === 'dirujuk_oleh' || relCat.includes('dirujuk oleh')) return 'dirujuk';
    if (relCat === 'merujuk' || relType === 'merujuk') return 'merujuk';

    // Secondary fallback checks if exact strings missing
    if (relCat.includes('dicabut') || relType.includes('dicabut')) return 'dicabut';
    if (relCat.includes('mencabut')) return 'mencabut';
    if (relCat.includes('diubah') || relType.includes('diubah')) return 'diubah';
    if (relCat.includes('mengubah')) return 'mengubah';
    if (relCat.includes('dirujuk') || relType.includes('dirujuk')) return 'dirujuk';
    if (relCat.includes('merujuk')) return 'merujuk';

    return 'default';
};

// Determine theme based on node relationship
const getNodeTheme = (node: GraphNode) => {
    if (node.isCenter) return ORB_THEMES.center;

    const catKey = getNodeCategoryKey(node);
    if (catKey === 'dicabut') return ORB_THEMES.dicabut;
    if (catKey === 'mencabut') return ORB_THEMES.mencabut;
    if (catKey === 'diubah') return ORB_THEMES.diubah;
    if (catKey === 'mengubah') return ORB_THEMES.mengubah;
    if (catKey === 'dirujuk') return ORB_THEMES.dirujuk;
    if (catKey === 'merujuk') return ORB_THEMES.merujuk;

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

// Helper: apply organic randomized starburst positions to nodes with floating drift parameters
const applyRandomStarPositions = (nodes: GraphNode[]): GraphNode[] => {
    if (!nodes || nodes.length === 0) return [];

    const numSectors = Math.floor(Math.random() * 4) + 7; // 7 to 10 sectors
    const baseAngleOffset = Math.random() * Math.PI * 2;

    const sectorSpikes = Array.from({ length: numSectors }, () => {
        return Math.random() > 0.4
            ? 550 + Math.random() * 450
            : 220 + Math.random() * 250;
    });

    const nonCenterNodes = nodes.filter(n => !n.isCenter);

    nodes.forEach((n, idx) => {
        if (n.isCenter) {
            n.x = 0;
            n.y = 0;
            n.fx = 0;
            n.fy = 0;
            n.baseX = 0;
            n.baseY = 0;
            n.targetDistance = 0;
            return;
        }

        const nonCenterIdx = nonCenterNodes.findIndex(item => item.id === n.id);
        const itemIdx = nonCenterIdx >= 0 ? nonCenterIdx : idx;

        const sectorIdx = itemIdx % numSectors;
        const maxDist = sectorSpikes[sectorIdx];

        const angleJitter = (Math.random() - 0.5) * 0.75;
        const angle = baseAngleOffset + (sectorIdx / numSectors) * Math.PI * 2 + angleJitter;

        const depthRatio = Math.pow(Math.random(), 0.65);
        const targetDistance = 160 + depthRatio * (maxDist - 160);

        const x = Math.cos(angle) * targetDistance;
        const y = Math.sin(angle) * targetDistance;

        n.x = x;
        n.y = y;
        n.baseX = x;
        n.baseY = y;
        n.fx = null;
        n.fy = null;
        n.targetDistance = targetDistance;
        n.driftSpeedX = 0.00008 + Math.random() * 0.00014;
        n.driftSpeedY = 0.00008 + Math.random() * 0.00014;
        n.driftAmpX = 6 + Math.random() * 8;
        n.driftAmpY = 6 + Math.random() * 8;
        n.phaseX = Math.random() * Math.PI * 2;
        n.phaseY = Math.random() * Math.PI * 2;
    });

    return nodes;
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function RegulationGraph({ peraturanId, onClose, onExpand: _onExpand, isMini = false }: RegulationGraphProps) {
    const graphRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    const [isGraphReady, setIsGraphReady] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
    const [clickedNode, setClickedNode] = useState<GraphNode | null>(null);
    const [cardNode, setCardNode] = useState<GraphNode | null>(null);

    // Lines & Relation Filter Controls
    const [showLines, setShowLines] = useState(false);
    const [activeFocusCategory, setActiveFocusCategory] = useState<string | null>(null);
    const [enabledLineCategories] = useState<Record<string, boolean>>({
        merujuk: true,
        dirujuk: true,
        mengubah: true,
        diubah: true,
        mencabut: true,
        dicabut: true,
    });

    const catAnimStatesRef = useRef<Record<string, { startTime: number; startVal: number; targetVal: number }>>({});

    const getAnimProgress = useCallback((key: string, targetVal: number, now: number): number => {
        const duration = 700;
        let state = catAnimStatesRef.current[key];

        if (!state) {
            state = {
                startTime: now,
                startVal: 0,
                targetVal: targetVal,
            };
            catAnimStatesRef.current[key] = state;
        } else if (state.targetVal !== targetVal) {
            // Calculate exact progress at moment of toggle
            const elapsed = now - state.startTime;
            const t = Math.min(1, Math.max(0, elapsed / duration));

            let currentVal = 0;
            if (state.targetVal === 1) {
                // Was extending outward
                currentVal = state.startVal + (1 - state.startVal) * (1 - Math.pow(1 - t, 3));
            } else {
                // Was retracting inward
                currentVal = state.startVal * Math.pow(1 - t, 3);
            }

            state = {
                startTime: now,
                startVal: Math.min(1, Math.max(0, currentVal)),
                targetVal: targetVal,
            };
            catAnimStatesRef.current[key] = state;
        }

        const elapsed = now - state.startTime;
        const t = Math.min(1, Math.max(0, elapsed / duration));

        if (state.targetVal === 1) {
            const eased = 1 - Math.pow(1 - t, 3);
            return Math.min(1, state.startVal + (1 - state.startVal) * eased);
        } else {
            const eased = Math.pow(1 - t, 3);
            return Math.min(1, state.startVal * eased);
        }
    }, []);

    const handleCategoryPillClick = useCallback((catKey: string) => {
        setActiveFocusCategory(prev => {
            if (prev === catKey) {
                // User clicks the currently active relation pill again -> turn OFF & back to default state
                setShowLines(false);
                return null;
            } else {
                // User clicks a relation pill -> turn ON lines & isolate this category
                setShowLines(true);
                return catKey;
            }
        });
    }, []);

    // Sidebar States
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<'all' | 'merujuk' | 'dirujuk' | 'mengubah' | 'diubah' | 'mencabut' | 'dicabut'>('all');

    const initialCenterDone = useRef(false);

    // Randomize Starburst Layout callback
    const handleRandomizeStarLayout = useCallback(() => {
        setClickedNode(null);
        setGraphData(prev => ({
            nodes: applyRandomStarPositions([...prev.nodes]),
            links: prev.links,
        }));
        if (graphRef.current) {
            graphRef.current.centerAt(0, 0, 400);
            graphRef.current.zoom(1.1, 400);
            if (graphRef.current.d3ReheatSimulation) {
                graphRef.current.d3ReheatSimulation();
            }
        }
    }, []);

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
            const themeKey = (node.relCategory || node.relType || '').toLowerCase();
            
            if (filterCategory === 'merujuk' && !themeKey.includes('merujuk')) return false;
            if (filterCategory === 'dirujuk' && !themeKey.includes('dirujuk')) return false;
            if (filterCategory === 'mengubah' && !themeKey.includes('mengubah')) return false;
            if (filterCategory === 'diubah' && !themeKey.includes('diubah')) return false;
            if (filterCategory === 'mencabut' && !themeKey.includes('mencabut')) return false;
            if (filterCategory === 'dicabut' && !themeKey.includes('dicabut')) return false;

            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            const judul = (node.judul || '').toLowerCase();
            const nomor = (node.nomor || '').toString().toLowerCase();
            const tahun = (node.tahun || '').toString().toLowerCase();
            const shortCode = getShortCode(node).toLowerCase();

            return judul.includes(query) || nomor.includes(query) || tahun.includes(query) || shortCode.includes(query);
        });
    }, [connectedNodes, filterCategory, searchQuery]);

    // Wait 250ms for node glide & camera POV centering to arrive at screen center before showing card
    useEffect(() => {
        if (!clickedNode) {
            setCardNode(null);
            return;
        }

        const timer = setTimeout(() => {
            setCardNode(clickedNode);
        }, 240);

        return () => clearTimeout(timer);
    }, [clickedNode]);

    // Focus camera POV directly on the Main Center Node position
    const focusOnNodeAndCenterMain = useCallback((node: GraphNode) => {
        setClickedNode(node);
        if (graphRef.current) {
            const centerNode = graphData.nodes.find(n => n.isCenter);
            const mainX = centerNode ? (centerNode.x ?? 0) : 0;
            const mainY = centerNode ? (centerNode.y ?? 0) : 0;

            // Camera POV focuses directly on the Main Node's current position
            graphRef.current.centerAt(mainX, mainY, 350);
            graphRef.current.zoom(1.25, 350);
        }
    }, [graphData.nodes]);

    // Focus graph view on selected node from sidebar
    const handleSelectFromSidebar = useCallback((node: GraphNode) => {
        focusOnNodeAndCenterMain(node);
    }, [focusOnNodeAndCenterMain]);

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

                if (data.nodes) {
                    setGraphData({
                        nodes: applyRandomStarPositions(data.nodes),
                        links: data.links || [], // ONLY REAL DATABASE LINKS!
                    });
                } else {
                    setGraphData({ nodes: [], links: [] });
                }

                setLoading(false);
                initialCenterDone.current = false;
            } catch (error) {
                console.error('Gagal memuat data graph:', error);
                setLoading(false);
            }
        };

        fetchGraph();
    }, [peraturanId]);

    // Continuous organic floating drift animation tick for nodes
    useEffect(() => {
        if (!isGraphReady || graphData.nodes.length === 0) return;

        let animationFrameId: number;
        let lastReheatTime = 0;

        const animateDrift = (timestamp: number) => {
            graphData.nodes.forEach((node: any) => {
                if (node.isCenter) return;

                if (node.isDragging || node.__isDragging) {
                    node.baseX = node.x;
                    node.baseY = node.y;
                    return;
                }

                const baseX = node.baseX ?? node.x ?? 0;
                const baseY = node.baseY ?? node.y ?? 0;

                const isNodeClicked = clickedNode && node.id === clickedNode.id;

                let targetX = baseX;
                let targetY = baseY;

                if (isNodeClicked) {
                    // Smoothly draw clicked node closer to Main Center Node's current position at ~145px proximity
                    const centerNode = graphData.nodes.find(n => n.isCenter);
                    const mainX = centerNode ? (centerNode.x ?? 0) : 0;
                    const mainY = centerNode ? (centerNode.y ?? 0) : 0;

                    const relX = (baseX - mainX);
                    const relY = (baseY - mainY);
                    const dist = Math.sqrt(relX * relX + relY * relY) || 1;
                    const targetDist = 145;

                    targetX = mainX + (relX / dist) * targetDist;
                    targetY = mainY + (relY / dist) * targetDist;
                } else {
                    // Gentle floating drift around baseX, baseY
                    const t = timestamp / 1000;
                    targetX = baseX + Math.sin(t * (node.driftSpeedX || 0.0001) * 1000 + (node.phaseX || 0)) * (node.driftAmpX || 8);
                    targetY = baseY + Math.cos(t * (node.driftSpeedY || 0.0001) * 1000 + (node.phaseY || 0)) * (node.driftAmpY || 8);
                }

                // Smooth lerp interpolation (slightly faster lerp for responsive node glide when clicked)
                const lerpFactor = isNodeClicked ? 0.08 : 0.04;
                const curX = node.x ?? baseX;
                const curY = node.y ?? baseY;
                const newX = curX + (targetX - curX) * lerpFactor;
                const newY = curY + (targetY - curY) * lerpFactor;

                node.x = newX;
                node.y = newY;
                node.fx = newX;
                node.fy = newY;
                node.vx = 0;
                node.vy = 0;
            });

            // Throttle reheat to avoid constant physics jitter
            if (graphRef.current && typeof graphRef.current.d3ReheatSimulation === 'function') {
                if (timestamp - lastReheatTime > 400) {
                    graphRef.current.d3ReheatSimulation();
                    lastReheatTime = timestamp;
                }
            }

            animationFrameId = requestAnimationFrame(animateDrift);
        };

        animationFrameId = requestAnimationFrame(animateDrift);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isGraphReady, graphData.nodes, clickedNode]);

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
    // D3 Force Configuration (Clean Wide Starburst Scattering)
    // ─────────────────────────────────────────────

    useEffect(() => {
        if (!graphRef.current) return;

        // Wide repulsion force to spread star nodes cleanly across space
        graphRef.current.d3Force('charge').strength(-650).distanceMax(1800);

        const linkForce = graphRef.current.d3Force('link');
        if (linkForce) {
            linkForce.distance((link: any) => {
                const target = typeof link.target === 'object' ? link.target : null;
                const source = typeof link.source === 'object' ? link.source : null;

                if (target && typeof target.targetDistance === 'number') {
                    return target.targetDistance;
                }
                if (source && typeof source.targetDistance === 'number') {
                    return source.targetDistance;
                }
                return 250;
            });
            linkForce.strength(0.2);
        }

        graphRef.current.d3Force('center', null);
        if (graphRef.current.d3ReheatSimulation) {
            graphRef.current.d3ReheatSimulation();
        }
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

        focusOnNodeAndCenterMain(node);
    }, [focusOnNodeAndCenterMain]);

    const handleNodeDragEnd = useCallback((node: any) => {
        node.isDragging = false;
        graphData.nodes.forEach((n: any) => {
            n.baseX = n.x;
            n.baseY = n.y;
            n.fx = n.x;
            n.fy = n.y;
            n.vx = 0;
            n.vy = 0;
        });
        if (graphRef.current?.d3ReheatSimulation) {
            graphRef.current.d3ReheatSimulation();
        }
    }, [graphData.nodes]);

    const handleNodeDrag = useCallback((node: any) => {
        node.isDragging = true;
        node.baseX = node.x;
        node.baseY = node.y;

        graphData.nodes.forEach((n: any) => {
            if (n.id !== node.id && !n.isCenter) {
                n.fx = null;
                n.fy = null;
            }
        });

        if (graphRef.current?.d3ReheatSimulation) {
            graphRef.current.d3ReheatSimulation();
        }

        const coords = graphRef.current?.graph2ScreenCoords(node.x, node.y);
        if (!coords) return;
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
    }, [graphData.nodes, dimensions]);

    // ─────────────────────────────────────────────
    // Custom Canvas Rendering
    // ─────────────────────────────────────────────

    const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
        const isCenter = node.isCenter;
        const isHovered = hoverNode?.id === node.id;
        const isClicked = clickedNode?.id === node.id;
        const isFocused = isHovered || isClicked;

        const isDimmed = activeNodeIds !== null && !activeNodeIds.has(node.id);
        const alpha = isDimmed ? 0.18 : 1;

        ctx.save();
        ctx.globalAlpha = alpha;

        const x = node.x || 0;
        const y = node.y || 0;
        const theme = getNodeTheme(node);

        const pulse = Math.sin(performance.now() / 1400) * 1.2;

        if (isCenter) {
            const coreRadius = 11;
            const auraRadius = coreRadius + 8 + pulse;

            ctx.beginPath();
            ctx.arc(x, y, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.halo;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, coreRadius + 4, 0, Math.PI * 2);
            ctx.fillStyle = theme.glow;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.core;
            ctx.fill();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            const shortCode = getShortCode(node);
            ctx.font = '700 10.5px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

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
            const coreRadius = isFocused ? 7.5 : 5.5;
            const auraRadius = isFocused ? coreRadius + 7 + pulse : coreRadius + 3 + pulse;

            ctx.beginPath();
            ctx.arc(x, y, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.glow;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = theme.core;
            ctx.fill();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = isFocused ? 2 : 1.5;
            ctx.stroke();

            const shortCode = getShortCode(node);
            ctx.font = isFocused ? '700 9.5px Inter, system-ui, sans-serif' : '600 8.5px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            const labelY = y + coreRadius + 5;
            const textW = ctx.measureText(shortCode).width;

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
    // Custom Link Render: Animated Line Connection & Electric Energy Flow
    // ─────────────────────────────────────────────

    const drawLinkOverlay = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        const isClickedLink = clickedNode && (sourceId === clickedNode.id || targetId === clickedNode.id);

        const targetNode = typeof link.target === 'object' ? link.target : graphData.nodes.find(n => n.id === targetId);
        const sourceNode = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === sourceId);
        const node = (targetNode && !targetNode.isCenter) ? targetNode : sourceNode;
        const catKey = node ? getNodeCategoryKey(node) : 'default';

        const now = performance.now();

        // 1. Progress for individual clicked node selection (draws out on click, retracts on unselect/X)
        const clickedKey = `clicked_${sourceId}-${targetId}`;
        const pClicked = getAnimProgress(clickedKey, isClickedLink ? 1 : 0, now);

        // 2. Progress for category filter
        const isCatActive = showLines && (activeFocusCategory === null ? enabledLineCategories[catKey] !== false : catKey === activeFocusCategory);
        const catKeyAnim = `cat_${catKey}`;
        const pCat = getAnimProgress(catKeyAnim, isCatActive ? 1 : 0, now);

        // Max combined animation progress
        const p = Math.max(pClicked, pCat);

        // If progress is zero or virtually invisible, return early
        if (p <= 0.001) return;

        let strokeColor = '#3b82f6';
        let lineWidth = 1.4;

        if (pClicked >= pCat && (clickedNode || pClicked > 0)) {
            const theme = (clickedNode && (sourceId === clickedNode.id || targetId === clickedNode.id))
                ? getNodeTheme(clickedNode)
                : (node ? getNodeTheme(node) : ORB_THEMES.default);
            strokeColor = theme.line;
            lineWidth = 2.8;
        } else if (node) {
            const theme = getNodeTheme(node);
            strokeColor = theme.line;
            lineWidth = isCatActive ? (activeFocusCategory !== null ? 1.8 : 1.3) : 1.4;
        }

        const startX = link.source.x || 0;
        const startY = link.source.y || 0;
        const endX = link.target.x || 0;
        const endY = link.target.y || 0;

        const currEndX = startX + (endX - startX) * p;
        const currEndY = startY + (endY - startY) * p;

        ctx.save();

        // 1. Draw Base Animated Line (Tarikan / Gulungan Garis)
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.shadowColor = strokeColor;
        ctx.shadowBlur = isClickedLink ? 8 : 4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currEndX, currEndY);
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // 2. Draw Electric Energy Flow Particles (Aliran Energi Listrik)
        if (p > 0.05) {
            const pulseSpeed = 0.0012; // Smooth energy flow speed
            const numPulses = isClickedLink ? 3 : 2;

            for (let i = 0; i < numPulses; i++) {
                const offset = i / numPulses;
                const pulseT = ((now * pulseSpeed + offset) % 1) * p;

                const px = startX + (endX - startX) * pulseT;
                const py = startY + (endY - startY) * pulseT;

                // Tail trailing behind electric particle
                const tailLength = 0.08 * p;
                const tailT = Math.max(0, pulseT - tailLength);
                const tx = startX + (endX - startX) * tailT;
                const ty = startY + (endY - startY) * tailT;

                // Electric Light Trail
                const tailGrad = ctx.createLinearGradient(tx, ty, px, py);
                tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                tailGrad.addColorStop(1, strokeColor);

                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = lineWidth * 1.3;
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(px, py);
                ctx.stroke();

                // Outer Electric Energy Glow Aura
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = strokeColor;
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(px, py, isClickedLink ? 3.2 : 2.2, 0, Math.PI * 2);
                ctx.fill();

                // Inner Bright Electric Spark Core
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(px, py, isClickedLink ? 1.8 : 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 3. Draw Relation Badge Pill at Link Midpoint (Only when mostly extended p >= 0.5)
        if (isClickedLink && p >= 0.5) {
            const badgeAlpha = Math.min(1, (p - 0.5) / 0.5);
            ctx.globalAlpha = badgeAlpha;

            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;

            const theme = getNodeTheme(clickedNode);
            const relText = (clickedNode.relCategory || clickedNode.relType || link.relCategory || link.type || 'MERUJUK').replace(/_/g, ' ').toUpperCase();

            ctx.font = '700 8.5px Inter, system-ui, sans-serif';
            const textW = ctx.measureText(relText).width;
            const pillW = textW + 16;
            const pillH = 18;
            const px = midX - pillW / 2;
            const py = midY - pillH / 2;

            ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 2;

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
        }

        ctx.restore();
    }, [clickedNode, showLines, activeFocusCategory, enabledLineCategories, graphData.nodes, getAnimProgress]);

    // Link Color & Width Logic (DEFAULT: Completely Transparent / ZERO Lines, ON: Theme Color)
    const getLinkColor = useCallback((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        const isClickedLink = clickedNode && (
            sourceId === clickedNode.id || targetId === clickedNode.id
        );

        if (isClickedLink) {
            const theme = getNodeTheme(clickedNode);
            return theme.line;
        }

        if (showLines) {
            const targetNode = typeof link.target === 'object' ? link.target : graphData.nodes.find(n => n.id === targetId);
            const sourceNode = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === sourceId);
            const node = (targetNode && !targetNode.isCenter) ? targetNode : sourceNode;

            if (node) {
                const catKey = getNodeCategoryKey(node);

                if (activeFocusCategory !== null) {
                    if (catKey === activeFocusCategory) {
                        const theme = getNodeTheme(node);
                        return theme.line;
                    }
                    return 'rgba(0, 0, 0, 0)';
                }

                if (enabledLineCategories[catKey] !== false) {
                    const theme = getNodeTheme(node);
                    return theme.line;
                }
            }
        }

        // Default state when lines are OFF or category disabled: 0 lines drawn!
        return 'rgba(0, 0, 0, 0)';
    }, [clickedNode, showLines, activeFocusCategory, enabledLineCategories, graphData.nodes]);

    const getLinkWidth = useCallback((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        const isClickedLink = clickedNode && (
            sourceId === clickedNode.id || targetId === clickedNode.id
        );

        if (isClickedLink) return 2.8;

        if (showLines) {
            const targetNode = typeof link.target === 'object' ? link.target : graphData.nodes.find(n => n.id === targetId);
            const sourceNode = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === sourceId);
            const node = (targetNode && !targetNode.isCenter) ? targetNode : sourceNode;

            if (node) {
                const catKey = getNodeCategoryKey(node);

                if (activeFocusCategory !== null) {
                    return catKey === activeFocusCategory ? 1.5 : 0;
                }

                if (enabledLineCategories[catKey] !== false) {
                    return 1.2;
                }
            }
        }

        return 0;
    }, [clickedNode, showLines, activeFocusCategory, enabledLineCategories, graphData.nodes]);

    // ─────────────────────────────────────────────
    // Rendering
    // ─────────────────────────────────────────────

    // Calculate card position adaptively so it flips away from the connecting line (never covering node or link line)
    const cardPos = useMemo(() => {
        if (!cardNode || !graphRef.current) return { x: dimensions.width / 2 + 30, y: dimensions.height / 2 - 100 };
        const node = graphData.nodes.find(n => n.id === cardNode.id) || cardNode;
        const coords = graphRef.current.graph2ScreenCoords(node.x || 0, node.y || 0);
        if (!coords) return { x: dimensions.width / 2 + 30, y: dimensions.height / 2 - 100 };

        const centerNode = graphData.nodes.find(n => n.isCenter);
        const centerCoords = centerNode
            ? (graphRef.current.graph2ScreenCoords(centerNode.x || 0, centerNode.y || 0) || { x: dimensions.width / 2, y: dimensions.height / 2 })
            : { x: dimensions.width / 2, y: dimensions.height / 2 };

        const cardWidth = 310;
        const cardHeight = 210;

        // If node is to the left of center, place card to the LEFT of the node so line between node & center is clear!
        // If node is to the right of center, place card to the RIGHT of the node!
        const isLeftOfCenter = coords.x < centerCoords.x;
        
        let targetX = isLeftOfCenter ? coords.x - cardWidth - 25 : coords.x + 25;
        let targetY = coords.y - cardHeight / 2;

        // Boundary safety clamps so card is always inside viewport
        if (targetX < 16) {
            // Fallback: if not enough room on left, place above or below node
            targetX = Math.max(16, Math.min(coords.x - cardWidth / 2, dimensions.width - cardWidth - 16));
            targetY = coords.y < centerCoords.y ? coords.y - cardHeight - 25 : coords.y + 25;
        } else if (targetX + cardWidth > dimensions.width - 16) {
            targetX = dimensions.width - cardWidth - 16;
        }

        targetY = Math.max(16, Math.min(targetY, dimensions.height - cardHeight - 16));

        return { x: targetX, y: targetY };
    }, [cardNode, graphData.nodes, dimensions]);

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

                    {/* Toggle Line Visibility ON / OFF Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setShowLines(prev => {
                                const next = !prev;
                                if (!next) setActiveFocusCategory(null);
                                return next;
                            });
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border ${
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
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 flex flex-wrap items-center gap-1.5 shadow-sm border border-slate-200/80 max-w-[75vw]">
                        {[
                            { key: 'merujuk', label: 'Merujuk', color: '#10b981', textColor: 'text-emerald-700' },
                            { key: 'dirujuk', label: 'Dirujuk', color: '#0284c7', textColor: 'text-sky-700' },
                            { key: 'mengubah', label: 'Mengubah', color: '#f59e0b', textColor: 'text-amber-700' },
                            { key: 'diubah', label: 'Diubah', color: '#8b5cf6', textColor: 'text-purple-700' },
                            { key: 'mencabut', label: 'Mencabut', color: '#e11d48', textColor: 'text-rose-700' },
                            { key: 'dicabut', label: 'Dicabut', color: '#d946ef', textColor: 'text-fuchsia-700' },
                        ].map((cat) => {
                            const isFocused = activeFocusCategory === cat.key;
                            const isLineActive = showLines && (activeFocusCategory === null ? enabledLineCategories[cat.key] !== false : isFocused);

                            return (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => handleCategoryPillClick(cat.key)}
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
                                <span className="text-slate-600 font-medium">{graphData.nodes.length} Entitas</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Fullscreen / Reset / Shuffle Toolbar */}
                {!isMini && (
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button
                            type="button"
                            onClick={handleRandomizeStarLayout}
                            title="Acak Layout Bintang (Randomize)"
                            className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-slate-50 shadow-sm border border-slate-200/80 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                        >
                            <Shuffle className="w-4 h-4 text-amber-500" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setClickedNode(null);
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
                    <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-200/60 rounded-xl text-[10.5px] font-semibold text-slate-600">
                        <button
                            type="button"
                            onClick={() => setFilterCategory('all')}
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
                            onClick={() => setFilterCategory('merujuk')}
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
                            onClick={() => setFilterCategory('dirujuk')}
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
                            onClick={() => setFilterCategory('mengubah')}
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
                            onClick={() => setFilterCategory('diubah')}
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
                            onClick={() => setFilterCategory('mencabut')}
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
                            onClick={() => setFilterCategory('dicabut')}
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
                    d3VelocityDecay={0.88}

                    // Links
                    linkColor={getLinkColor}
                    linkWidth={getLinkWidth}
                    linkCurvature={0.06}
                    linkCanvasObjectMode={() => 'replace'}
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
            {cardNode && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute z-50 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
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
                                        backgroundColor: getNodeTheme(cardNode).core,
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
                                    setClickedNode(null);
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
                        {isDocumentAvailable(cardNode) ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onClose) onClose();
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
            )}
        </div>
    );
}
