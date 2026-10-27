import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
    GraphData,
    GraphNode,
    RegulationGraphProps,
    FilterCategoryType,
    applyRandomStarPositions,
    drawNode,
    drawLinkOverlay,
    getLinkColor,
    getLinkWidth,
    GraphControls,
    GraphSidebar,
    GraphNodeCard,
    GraphHoverCard,
} from './graph';

export default function RegulationGraph({
    peraturanId,
    onClose,
    onExpand: _onExpand,
    isMini = false,
}: RegulationGraphProps) {
    const graphRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    const [isGraphReady, setIsGraphReady] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
    const hoverNodeRef = useRef<GraphNode | null>(null);
    hoverNodeRef.current = hoverNode;
    const hoverCardRef = useRef<HTMLDivElement | null>(null);
    const [hoverCardPos, setHoverCardPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const currentHoverPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const [clickedNode, setClickedNode] = useState<GraphNode | null>(null);
    const [cardNode, setCardNode] = useState<GraphNode | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const cardNodeRef = useRef<GraphNode | null>(null);
    cardNodeRef.current = cardNode;

    const draggedNodeRef = useRef<any>(null);
    const pointerInteractionRef = useRef<{
        node: GraphNode;
        startX: number;
        startY: number;
        offsetX: number;
        offsetY: number;
        hasDragged: boolean;
        pointerId: number;
    } | null>(null);
    const lastClickedTimeRef = useRef<number>(0);

    // Fungsi penutup kartu detail terpadu (menghilangkan kartu dan fokus node seketika)
    const handleCloseCard = useCallback(() => {
        setClickedNode(null);
        setCardNode(null);
        cardNodeRef.current = null;
    }, []);

    // Global listener untuk tombol Escape (keyboard) agar kartu detail langsung tertutup
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCloseCard();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleCloseCard]);

    // Kunci offset posisi kartu relatif terhadap node agar tidak melayang atau berubah sisi saat canvas dipan
    const cardSideRef = useRef<'left' | 'right'>('right');
    const cardRelativeOffsetRef = useRef<{ offsetX: number; offsetY: number }>({ offsetX: 25, offsetY: -110 });

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
            const elapsed = now - state.startTime;
            const t = Math.min(1, Math.max(0, elapsed / duration));

            let currentVal = 0;
            if (state.targetVal === 1) {
                currentVal = state.startVal + (1 - state.startVal) * (1 - Math.pow(1 - t, 3));
            } else {
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
                setShowLines(false);
                return null;
            } else {
                setShowLines(true);
                return catKey;
            }
        });
    }, []);

    // Sidebar States
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<FilterCategoryType>('all');

    const initialCenterDone = useRef(false);

    // Default zoom dekat (comfortable reading view):
    // Selalu zoom in dekat secara konsisten baik pada regulasi dengan sedikit maupun banyak relasi,
    // pengguna dapat menggeser (pan) atau zoom out secara manual jika ingin melihat keseluruhan konstelasi.
    const DEFAULT_GRAPH_ZOOM = isMini ? 0.9 : 1.15;

    // Randomize Starburst Layout callback
    const handleRandomizeStarLayout = useCallback(() => {
        handleCloseCard();
        setGraphData(prev => ({
            nodes: applyRandomStarPositions([...prev.nodes]),
            links: prev.links,
        }));
        if (graphRef.current) {
            const sidebarOffsetGraphX = isSidebarOpen ? (160 / DEFAULT_GRAPH_ZOOM) : 0;
            graphRef.current.centerAt(-sidebarOffsetGraphX, 0, 400);
            graphRef.current.zoom(DEFAULT_GRAPH_ZOOM, 400);
            if (graphRef.current.d3ReheatSimulation) {
                graphRef.current.d3ReheatSimulation();
            }
        }
    }, [isSidebarOpen, DEFAULT_GRAPH_ZOOM, handleCloseCard]);

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

            return judul.includes(query) || nomor.includes(query) || tahun.includes(query);
        });
    }, [connectedNodes, filterCategory, searchQuery]);

    // Buka kartu detail tepat di samping posisi node saat ini secara instan
    const openCardForNode = useCallback((node: GraphNode) => {
        // Simpan posisi konstelasi asli jika belum tercatat
        const origBaseX = node.__origBaseX ?? node.baseX ?? node.x ?? 0;
        const origBaseY = node.__origBaseY ?? node.baseY ?? node.y ?? 0;
        node.__origBaseX = origBaseX;
        node.__origBaseY = origBaseY;

        const distFromCenter = Math.sqrt(origBaseX * origBaseX + origBaseY * origBaseY) || 0.001;

        // Jika node terlalu jauh dari dokumen utama (> 240px), hitung perkiraan posisi orbit dekat (~210px)
        let targetGraphX = node.x ?? origBaseX;
        if (distFromCenter > 240) {
            const angle = Math.atan2(origBaseY, origBaseX);
            targetGraphX = Math.cos(angle) * 210;
        }

        const cardWidth = 310;
        const cardHeight = 220;

        let side: 'left' | 'right' = 'right';
        if (isSidebarOpen) {
            side = 'right';
        } else {
            side = targetGraphX < 0 ? 'left' : 'right';
        }

        cardSideRef.current = side;
        const offsetX = side === 'left' ? -(cardWidth + 25) : 25;
        const offsetY = -cardHeight / 2;
        cardRelativeOffsetRef.current = { offsetX, offsetY };

        setClickedNode(node);
        setCardNode(node);
    }, [isSidebarOpen]);

    // Posisikan kamera secara halus agar node dan kartu detailnya berada di area pandang yang ideal & nyaman
    const frameNodeAndCardInView = useCallback((node: GraphNode, duration = 400) => {
        if (!graphRef.current) return;
        const currentZoom = graphRef.current.zoom() || DEFAULT_GRAPH_ZOOM;
        const cardWidth = 310;

        const origBaseX = node.__origBaseX ?? node.baseX ?? node.x ?? 0;
        const origBaseY = node.__origBaseY ?? node.baseY ?? node.y ?? 0;
        const distFromCenter = Math.sqrt(origBaseX * origBaseX + origBaseY * origBaseY) || 0.001;

        // Jika node terlalu jauh dari center (> 240px), tujuannya adalah orbit dekat ~210px
        let destGraphX = node.x ?? origBaseX;
        let destGraphY = node.y ?? origBaseY;
        if (distFromCenter > 240) {
            const angle = Math.atan2(origBaseY, origBaseX);
            destGraphX = Math.cos(angle) * 210;
            destGraphY = Math.sin(angle) * 210;
        }

        // Tentukan penempatan kartu
        if (isSidebarOpen) {
            cardSideRef.current = 'right';
            cardRelativeOffsetRef.current = { offsetX: 25, offsetY: -110 };
        } else {
            cardSideRef.current = destGraphX < 0 ? 'left' : 'right';
            const offsetX = cardSideRef.current === 'left' ? -(cardWidth + 25) : 25;
            cardRelativeOffsetRef.current = { offsetX, offsetY: -110 };
        }

        // Hitung area pandang kanvas yang terlihat (tidak tertutup sidebar & header)
        const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
        const sidebarW = isSidebarOpen && !isMobileScreen ? 320 : 0;
        const topHeaderH = 80;
        const availWidth = dimensions.width - sidebarW;
        const availHeight = dimensions.height - topHeaderH;

        // Titik target ideal layar untuk node:
        const targetScreenX = isSidebarOpen && !isMobileScreen
            ? sidebarW + Math.max(50, (availWidth - (cardWidth + 50)) * 0.35)
            : (dimensions.width / 2 - (cardSideRef.current === 'right' ? 80 : -80));

        const targetScreenY = topHeaderH + availHeight / 2;

        const screenOffsetX = targetScreenX - dimensions.width / 2;
        const screenOffsetY = targetScreenY - dimensions.height / 2;

        const targetCenterGraphX = destGraphX - screenOffsetX / currentZoom;
        const targetCenterGraphY = destGraphY - screenOffsetY / currentZoom;

        graphRef.current.centerAt(targetCenterGraphX, targetCenterGraphY, duration);
    }, [isSidebarOpen, dimensions, DEFAULT_GRAPH_ZOOM]);

    const handleSelectFromSidebar = useCallback((node: GraphNode) => {
        openCardForNode(node);
        frameNodeAndCardInView(node, 400);
    }, [openCardForNode, frameNodeAndCardInView]);

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
                        links: data.links || [],
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

    // Posisi terkunci kartu: selalu tepat di sebelah node tanpa detaching atau clamping
    const computeCardPosition = useCallback(() => {
        const activeCard = cardNodeRef.current || cardNode;
        if (!activeCard || !graphRef.current) return null;
        const node = graphData.nodes.find(n => n.id === activeCard.id) || activeCard;
        const coords = graphRef.current.graph2ScreenCoords(node.x ?? 0, node.y ?? 0);
        if (!coords) return null;

        const { offsetX, offsetY } = cardRelativeOffsetRef.current;
        const targetX = coords.x + offsetX;
        const targetY = coords.y + offsetY;

        // Jika node keluar jauh dari viewport kanvas (misal saat dipan jauh), sembunyikan kartu
        const isOffscreen = (
            coords.x < -350 ||
            coords.x > dimensions.width + 350 ||
            coords.y < -300 ||
            coords.y > dimensions.height + 300
        );

        return { x: targetX, y: targetY, isOffscreen };
    }, [cardNode, graphData.nodes, dimensions]);

    // Sinkronisasi posisi kartu secara realtime pada DOM menggunakan hardware-accelerated transform
    const updateCardDOMPosition = useCallback(() => {
        if (!cardRef.current) return;
        const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;

        if (isMobileScreen) {
            cardRef.current.style.display = 'block';
            cardRef.current.style.transform = 'none';
            cardRef.current.style.left = '12px';
            cardRef.current.style.right = '12px';
            cardRef.current.style.bottom = '12px';
            cardRef.current.style.top = 'auto';
            cardRef.current.style.width = 'auto';
            cardRef.current.style.maxWidth = 'calc(100% - 24px)';
            return;
        }

        const pos = computeCardPosition();
        if (!pos) return;

        if (pos.isOffscreen) {
            cardRef.current.style.display = 'none';
        } else {
            cardRef.current.style.display = 'block';
            cardRef.current.style.left = '0px';
            cardRef.current.style.top = '0px';
            cardRef.current.style.bottom = 'auto';
            cardRef.current.style.right = 'auto';
            cardRef.current.style.maxWidth = '320px';
            cardRef.current.style.transform = `translate3d(${Math.round(pos.x)}px, ${Math.round(pos.y)}px, 0)`;
        }
    }, [computeCardPosition]);

    // Sinkronisasi instan matematis saat event zoom / pan kanvas berlangsung (tanpa jeda frame)
    const handleZoom = useCallback((transform: any) => {
        if (!cardRef.current || !cardNodeRef.current) return;
        if (typeof window !== 'undefined' && window.innerWidth < 640) return;
        const activeCard = cardNodeRef.current;
        const node = graphData.nodes.find(n => n.id === activeCard.id) || activeCard;

        const k = transform.k ?? 1;
        const tx = transform.x ?? 0;
        const ty = transform.y ?? 0;
        const screenX = (node.x ?? 0) * k + tx;
        const screenY = (node.y ?? 0) * k + ty;

        const { offsetX, offsetY } = cardRelativeOffsetRef.current;
        const targetX = screenX + offsetX;
        const targetY = screenY + offsetY;

        const isOffscreen = (
            screenX < -350 ||
            screenX > dimensions.width + 350 ||
            screenY < -300 ||
            screenY > dimensions.height + 300
        );

        if (isOffscreen) {
            cardRef.current.style.display = 'none';
        } else {
            cardRef.current.style.display = 'block';
            cardRef.current.style.transform = `translate3d(${Math.round(targetX)}px, ${Math.round(targetY)}px, 0)`;
        }
    }, [dimensions, graphData.nodes]);

    // Sesuaikan posisi offset kartu jika sidebar dibuka/ditutup dan bawa masuk secara halus jika berada di luar batas nyaman
    useEffect(() => {
        if (!cardNode || !graphRef.current) return;
        const node = graphData.nodes.find(n => n.id === cardNode.id) || cardNode;

        const cardWidth = 310;

        if (isSidebarOpen) {
            cardSideRef.current = 'right';
            cardRelativeOffsetRef.current = { offsetX: 25, offsetY: -110 };

            const coords = graphRef.current.graph2ScreenCoords(node.x ?? 0, node.y ?? 0);
            if (!coords) return;

            // Batas area aman ketika sidebar dibuka:
            // 1. Terlalu ke atas (menyerempet/menimpa header atas): coords.y < 200
            // 2. Tertutup atau terlalu dekat ke sidebar kiri: coords.x < 360
            // 3. Terlalu ke kanan atau ke bawah sehingga kartu terpotong
            const isTooFarUp = coords.y < 200;
            const isBehindSidebar = coords.x < 360;
            const isTooFarDown = coords.y > dimensions.height - 140;
            const isTooFarRight = coords.x + cardWidth + 30 > dimensions.width;

            if (isTooFarUp || isBehindSidebar || isTooFarDown || isTooFarRight) {
                frameNodeAndCardInView(node, 400);
            }
        }
        updateCardDOMPosition();
    }, [isSidebarOpen, cardNode, graphData.nodes, dimensions, frameNodeAndCardInView, updateCardDOMPosition]);

    // Continuous organic floating drift animation tick for nodes
    useEffect(() => {
        if (!isGraphReady || graphData.nodes.length === 0) return;

        let animationFrameId: number;
        let lastReheatTime = 0;

        const animateDrift = (timestamp: number) => {
            const dragged = draggedNodeRef.current;

            graphData.nodes.forEach((node: any) => {
                const isDraggingNode = Boolean(
                    node.isDragging ||
                    node.__isDragging ||
                    node.__dragged ||
                    node.__initialDragPos ||
                    (dragged && dragged.id === node.id) ||
                    (pointerInteractionRef.current?.node?.id === node.id)
                );

                if (isDraggingNode) {
                    node.baseX = node.x;
                    node.baseY = node.y;
                    return;
                }

                if (node.isCenter) {
                    return;
                }

                const origBaseX = node.__origBaseX ?? node.baseX ?? node.x ?? 0;
                const origBaseY = node.__origBaseY ?? node.baseY ?? node.y ?? 0;
                node.__origBaseX = origBaseX;
                node.__origBaseY = origBaseY;

                const isNodeClicked = clickedNode && node.id === clickedNode.id;

                let driftX = 0;
                let driftY = 0;
                let effectiveBaseX = origBaseX;
                let effectiveBaseY = origBaseY;

                const distFromCenter = Math.sqrt(origBaseX * origBaseX + origBaseY * origBaseY) || 0.001;

                if (isNodeClicked) {
                    // Jika node yang diklik posisinya terlalu jauh dari node utama (> 240px),
                    // dekatkan secara otomatis ke orbit dalam (~210px) agar mudah dilihat bersamaan dengan dokumen utama
                    if (distFromCenter > 240) {
                        const angle = Math.atan2(origBaseY, origBaseX);
                        const closeRadius = 210;
                        effectiveBaseX = Math.cos(angle) * closeRadius;
                        effectiveBaseY = Math.sin(angle) * closeRadius;
                    }
                } else {
                    const t = timestamp / 1000;
                    driftX = Math.sin(t * (node.driftSpeedX || 0.0001) * 1000 + (node.phaseX || 0)) * (node.driftAmpX || 8);
                    driftY = Math.cos(t * (node.driftSpeedY || 0.0001) * 1000 + (node.phaseY || 0)) * (node.driftAmpY || 8);
                }

                // Efek magnetik tolakan elastis: HANYA aktif saat ada node yang sedang di-drag
                let repelX = 0;
                let repelY = 0;
                let isRepelling = false;

                if (dragged && dragged.id !== node.id) {
                    const dx = (node.x ?? origBaseX) - (dragged.x ?? 0);
                    const dy = (node.y ?? origBaseY) - (dragged.y ?? 0);
                    const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
                    const magnetRadius = 115; // Jangkauan medan magnetik yang luas & halus

                    if (dist < magnetRadius) {
                        isRepelling = true;
                        // Kurva Hermite / smoothstep kubik: sangat halus di tepian, menguat elastis saat mendekat
                        const t = (magnetRadius - dist) / magnetRadius;
                        const smoothStep = t * t * (3 - 2 * t);
                        const pushMag = smoothStep * 85;

                        const nx = dx / dist;
                        const ny = dy / dist;

                        repelX = nx * pushMag;
                        repelY = ny * pushMag;
                    }
                }

                // Tolakan lembut agar kartu detail peraturan yang terbuka tidak menimpa node lain
                if (cardNode && node.id !== cardNode.id && !node.isCenter) {
                    const side = cardSideRef.current;
                    const cardCenterOffset = side === 'right' ? 175 : -175;
                    const cardCx = (cardNode.x ?? 0) + cardCenterOffset;
                    const cardCy = (cardNode.y ?? 0);

                    const cdx = (node.x ?? origBaseX) - cardCx;
                    const cdy = (node.y ?? origBaseY) - cardCy;
                    const halfW = 185;
                    const halfH = 135;

                    const normX = cdx / halfW;
                    const normY = cdy / halfH;
                    const distSq = normX * normX + normY * normY;

                    if (distSq < 1.0 && distSq > 0.0001) {
                        isRepelling = true;
                        const d = Math.sqrt(distSq);
                        const pushDist = (1.0 - d) * 45;
                        const angle = Math.atan2(cdy, cdx);
                        repelX += Math.cos(angle) * pushDist;
                        repelY += Math.sin(angle) * pushDist;
                    }
                }

                const targetX = effectiveBaseX + driftX + repelX;
                const targetY = effectiveBaseY + driftY + repelY;

                // Jika sedang meluncur mendekat ke tengah (karena diklik) atau terkena tolakan, respon lincah
                const isGlidingToCenter = isNodeClicked && distFromCenter > 240;
                const lerpFactor = isGlidingToCenter ? 0.14 : (isRepelling ? 0.16 : 0.04);
                const curX = node.x ?? effectiveBaseX;
                const curY = node.y ?? effectiveBaseY;
                const newX = curX + (targetX - curX) * lerpFactor;
                const newY = curY + (targetY - curY) * lerpFactor;

                node.x = newX;
                node.y = newY;
                node.fx = newX;
                node.fy = newY;
                node.vx = 0;
                node.vy = 0;
            });

            if (graphRef.current && typeof graphRef.current.d3ReheatSimulation === 'function') {
                if (timestamp - lastReheatTime > 400) {
                    graphRef.current.d3ReheatSimulation();
                    lastReheatTime = timestamp;
                }
            }

            if (cardNodeRef.current) {
                updateCardDOMPosition();
            }

            animationFrameId = requestAnimationFrame(animateDrift);
        };

        animationFrameId = requestAnimationFrame(animateDrift);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isGraphReady, graphData.nodes, clickedNode, cardNode, updateCardDOMPosition]);

    // ─────────────────────────────────────────────
    // Default Close-up Framing
    // ─────────────────────────────────────────────

    // Selalu pertahankan zoom in dekat (readable / detail view) secara default,
    // tidak pernah auto zoom-out menjadi titik-titik kecil walau relasinya banyak atau sedikit.
    const resetViewToDefault = useCallback((durationMs = 0) => {
        if (!graphRef.current) return;
        const sidebarOffsetGraphX = isSidebarOpen ? (160 / DEFAULT_GRAPH_ZOOM) : 0;
        graphRef.current.centerAt(-sidebarOffsetGraphX, 0, durationMs);
        graphRef.current.zoom(DEFAULT_GRAPH_ZOOM, durationMs);
    }, [isSidebarOpen, DEFAULT_GRAPH_ZOOM]);

    // ─────────────────────────────────────────────
    // Resize Observer
    // ─────────────────────────────────────────────

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(() => {
            if (containerRef.current) {
                const nextSize = {
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                };
                setDimensions(nextSize);

                // Re-center tanpa merusak level zoom yang sedang dinikmati pengguna
                if (initialCenterDone.current && graphRef.current) {
                    const currentZoom = graphRef.current.zoom() || DEFAULT_GRAPH_ZOOM;
                    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
                    const sidebarOffsetGraphX = isSidebarOpen && !isMobileScreen ? (160 / currentZoom) : 0;
                    graphRef.current.centerAt(-sidebarOffsetGraphX, 0, 0);
                }
            }
        });

        const initialSize = {
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
        };
        setDimensions(initialSize);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [loading, graphData.nodes.length, isSidebarOpen, DEFAULT_GRAPH_ZOOM]);

    // ─────────────────────────────────────────────
    // D3 Force Configuration (Clean Wide Starburst Scattering)
    // ─────────────────────────────────────────────

    useEffect(() => {
        if (!graphRef.current) return;

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

    const computeHoverCardPosition = useCallback((cursorX: number, cursorY: number) => {
        const cardWidth = 270;
        const cardHeight = 115;
        let posX = cursorX + 16;
        let posY = cursorY + 16;

        if (posX + cardWidth + 12 > dimensions.width) {
            posX = cursorX - cardWidth - 16;
        }
        if (posY + cardHeight + 12 > dimensions.height) {
            posY = cursorY - cardHeight - 16;
        }

        posX = Math.max(12, posX);
        posY = Math.max(12, posY);

        return { x: posX, y: posY };
    }, [dimensions]);

    const updatePointerPos = useCallback((clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const cursorX = clientX - rect.left;
        const cursorY = clientY - rect.top;
        mousePosRef.current = { x: cursorX, y: cursorY };

        if (hoverNodeRef.current) {
            const nextPos = computeHoverCardPosition(cursorX, cursorY);
            currentHoverPosRef.current = nextPos;
            if (hoverCardRef.current) {
                hoverCardRef.current.style.transform = `translate3d(${Math.round(nextPos.x)}px, ${Math.round(nextPos.y)}px, 0)`;
            }
        }
    }, [computeHoverCardPosition]);

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        updatePointerPos(e.clientX, e.clientY);
    }, [updatePointerPos]);

    const handleMouseLeave = useCallback(() => {
        setHoverNode(null);
        hoverNodeRef.current = null;
        document.body.style.cursor = 'default';
    }, []);

    const handleNodeHover = useCallback((node: any) => {
        const nextNode = node || null;
        setHoverNode(nextNode);
        hoverNodeRef.current = nextNode;
        document.body.style.cursor = nextNode ? 'pointer' : 'default';

        if (nextNode) {
            let curX = mousePosRef.current.x;
            let curY = mousePosRef.current.y;

            if (curX === 0 && curY === 0 && graphRef.current) {
                const screenCoords = graphRef.current.graph2ScreenCoords(nextNode.x ?? 0, nextNode.y ?? 0);
                if (screenCoords && !isNaN(screenCoords.x) && !isNaN(screenCoords.y)) {
                    curX = screenCoords.x;
                    curY = screenCoords.y;
                }
            }

            const initialPos = computeHoverCardPosition(curX, curY);
            currentHoverPosRef.current = initialPos;
            setHoverCardPos(initialPos);
            if (hoverCardRef.current) {
                hoverCardRef.current.style.transform = `translate3d(${Math.round(initialPos.x)}px, ${Math.round(initialPos.y)}px, 0)`;
            }
        }
    }, [computeHoverCardPosition]);

    // Deteksi node presisi matematis berbasis koordinat layar & zoom (kebal terhadap display scaling, fractional DPI, & color profile)
    const findNodeAtScreenPos = useCallback((clientX: number, clientY: number, tolerancePx = 28): GraphNode | null => {
        if (!graphRef.current || !containerRef.current || graphData.nodes.length === 0) return null;
        const rect = containerRef.current.getBoundingClientRect();
        const screenX = clientX - rect.left;
        const screenY = clientY - rect.top;

        if (screenX < 0 || screenX > rect.width || screenY < 0 || screenY > rect.height) {
            return null;
        }

        const graphCoords = graphRef.current.screen2GraphCoords(screenX, screenY);
        if (!graphCoords || isNaN(graphCoords.x) || isNaN(graphCoords.y)) return null;

        const currentZoom = graphRef.current.zoom() || DEFAULT_GRAPH_ZOOM;
        const hitRadius = tolerancePx / currentZoom;

        let closestNode: GraphNode | null = null;
        let minDist = Infinity;

        for (const node of graphData.nodes) {
            const nx = node.x ?? node.baseX ?? 0;
            const ny = node.y ?? node.baseY ?? 0;
            const dist = Math.hypot(nx - graphCoords.x, ny - graphCoords.y);

            if (dist <= hitRadius && dist < minDist) {
                minDist = dist;
                closestNode = node;
            }
        }

        return closestNode;
    }, [graphData.nodes, DEFAULT_GRAPH_ZOOM]);

    const handleNodeClick = useCallback((node: any) => {
        const now = Date.now();
        if (now - lastClickedTimeRef.current < 300 && cardNodeRef.current?.id === node?.id) {
            return;
        }
        lastClickedTimeRef.current = now;

        setHoverNode(null);
        hoverNodeRef.current = null;
        if (!node) {
            handleCloseCard();
            return;
        }

        openCardForNode(node);
        frameNodeAndCardInView(node, 400);
    }, [openCardForNode, handleCloseCard, frameNodeAndCardInView]);

    const handleNodeDragEnd = useCallback((node: any) => {
        node.isDragging = false;
        node.__isDragging = false;
        draggedNodeRef.current = null;
        node.__origBaseX = node.x;
        node.__origBaseY = node.y;
        node.baseX = node.x;
        node.baseY = node.y;
        node.fx = node.x;
        node.fy = node.y;
        node.vx = 0;
        node.vy = 0;

        if (graphRef.current?.d3ReheatSimulation) {
            graphRef.current.d3ReheatSimulation();
        }

        if (cardNodeRef.current && cardNodeRef.current.id === node.id) {
            updateCardDOMPosition();
        }
    }, [updateCardDOMPosition]);

    const handleNodeDrag = useCallback((node: any) => {
        setHoverNode(null);
        hoverNodeRef.current = null;
        node.isDragging = true;
        draggedNodeRef.current = node;
        node.baseX = node.x;
        node.baseY = node.y;
        node.fx = node.x;
        node.fy = node.y;

        // Bantalan pegas lembut (soft-cushion spring) agar node yang di-drag tidak menabrak kaku
        // 1. Terhadap Center Node (yang statis di 0,0)
        const centerDist = Math.sqrt((node.x ?? 0) * (node.x ?? 0) + (node.y ?? 0) * (node.y ?? 0)) || 0.001;
        const minCenterDist = 72;
        if (centerDist < minCenterDist) {
            const overlap = minCenterDist - centerDist;
            const nx = (node.x ?? 0) / centerDist;
            const ny = (node.y ?? 0) / centerDist;
            node.x += nx * overlap * 0.45;
            node.y += ny * overlap * 0.45;
            node.fx = node.x;
            node.fy = node.y;
        }

        // 2. Terhadap node non-center lain jika mendekat sangat dekat (< 48px)
        graphData.nodes.forEach((other: any) => {
            if (other.id === node.id || other.isCenter) return;
            const dx = (node.x ?? 0) - (other.x ?? 0);
            const dy = (node.y ?? 0) - (other.y ?? 0);
            const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
            const minContactDist = 48;
            if (d < minContactDist) {
                const overlap = minContactDist - d;
                const nx = dx / d;
                const ny = dy / d;
                node.x += nx * overlap * 0.3;
                node.y += ny * overlap * 0.3;
                node.fx = node.x;
                node.fy = node.y;
            }
        });

        if (graphRef.current?.d3ReheatSimulation) {
            graphRef.current.d3ReheatSimulation();
        }

        if (cardNodeRef.current && cardNodeRef.current.id === node.id) {
            updateCardDOMPosition();
        }
    }, [graphData.nodes, updateCardDOMPosition]);

    // Posisi inisial untuk render pertama saat komponen kartu di-mount
    const initialCardPos = useMemo(() => {
        const pos = computeCardPosition();
        return pos ? { x: pos.x, y: pos.y } : { x: dimensions.width / 2 + 30, y: dimensions.height / 2 - 100 };
    }, [computeCardPosition, dimensions.width, dimensions.height]);

    useEffect(() => {
        updateCardDOMPosition();
    }, [cardNode, isSidebarOpen, dimensions, updateCardDOMPosition]);

    // Canvas render delegates
    const onDrawNode = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
        drawNode(node, ctx, { hoverNode, clickedNode, activeNodeIds });
    }, [hoverNode, clickedNode, activeNodeIds]);

    const onNodePointerAreaPaint = useCallback((node: any, color: string, ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = color;
        const nx = node.x || 0;
        const ny = node.y || 0;

        // Orb area hit-testing (generous 24px radius)
        ctx.beginPath();
        ctx.arc(nx, ny, 24, 0, Math.PI * 2);
        ctx.fill();
    }, []);

    // Pointer events langsung pada canvas wrapper untuk menjamin drag & click responsif 100% di semua device
    const handleCanvasPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;

        const node = findNodeAtScreenPos(e.clientX, e.clientY, 28);
        if (!node) return;

        const isDraggable = !node.isCenter;

        const rect = containerRef.current?.getBoundingClientRect();
        const screenX = e.clientX - (rect?.left ?? 0);
        const screenY = e.clientY - (rect?.top ?? 0);
        const graphCoords = graphRef.current?.screen2GraphCoords(screenX, screenY);
        const curX = node.x ?? node.baseX ?? 0;
        const curY = node.y ?? node.baseY ?? 0;
        const offsetX = curX - (graphCoords?.x ?? curX);
        const offsetY = curY - (graphCoords?.y ?? curY);

        pointerInteractionRef.current = {
            node,
            startX: e.clientX,
            startY: e.clientY,
            offsetX: isNaN(offsetX) ? 0 : offsetX,
            offsetY: isNaN(offsetY) ? 0 : offsetY,
            hasDragged: false,
            pointerId: e.pointerId,
        };

        if (e.currentTarget.setPointerCapture) {
            try {
                e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
                // Ignore pointer capture exceptions on unsupported environments
            }
        }

        if (isDraggable) {
            node.isDragging = true;
            node.__isDragging = true;
            draggedNodeRef.current = node;
            setHoverNode(null);
            hoverNodeRef.current = null;
        }
    }, [findNodeAtScreenPos]);

    const handleCanvasPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        updatePointerPos(e.clientX, e.clientY);

        const active = pointerInteractionRef.current;
        if (active) {
            const dx = e.clientX - active.startX;
            const dy = e.clientY - active.startY;
            const dist = Math.hypot(dx, dy);

            if (dist > 4 && !active.node.isCenter) {
                active.hasDragged = true;

                if (!graphRef.current || !containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const screenX = e.clientX - rect.left;
                const screenY = e.clientY - rect.top;
                const graphCoords = graphRef.current.screen2GraphCoords(screenX, screenY);

                if (graphCoords && !isNaN(graphCoords.x) && !isNaN(graphCoords.y)) {
                    const nextX = graphCoords.x + active.offsetX;
                    const nextY = graphCoords.y + active.offsetY;
                    active.node.x = nextX;
                    active.node.y = nextY;
                    active.node.fx = nextX;
                    active.node.fy = nextY;
                    handleNodeDrag(active.node);
                }
            }
            return;
        }

        // Dynamic geometric hover detection: update hover state dynamically as cursor moves
        const hovered = findNodeAtScreenPos(e.clientX, e.clientY, 24);
        if (hovered?.id !== hoverNodeRef.current?.id) {
            handleNodeHover(hovered);
        }
    }, [updatePointerPos, findNodeAtScreenPos, handleNodeDrag, handleNodeHover]);

    const handleCanvasPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const active = pointerInteractionRef.current;
        if (!active) return;

        if (e.currentTarget.releasePointerCapture) {
            try {
                e.currentTarget.releasePointerCapture(active.pointerId);
            } catch {
                // Ignore release capture exceptions
            }
        }

        const node = active.node;
        const hasDragged = active.hasDragged;
        pointerInteractionRef.current = null;

        if (hasDragged) {
            handleNodeDragEnd(node);
            setHoverNode(null);
            hoverNodeRef.current = null;
            document.body.style.cursor = 'default';
        } else {
            node.isDragging = false;
            node.__isDragging = false;
            draggedNodeRef.current = null;
            handleNodeClick(node);
        }
    }, [handleNodeDragEnd, handleNodeClick]);

    const handleCanvasPointerCancel = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const active = pointerInteractionRef.current;
        if (!active) return;

        if (e.currentTarget.releasePointerCapture) {
            try {
                e.currentTarget.releasePointerCapture(active.pointerId);
            } catch {
                // Ignore release capture exceptions
            }
        }

        const node = active.node;
        node.isDragging = false;
        node.__isDragging = false;
        draggedNodeRef.current = null;
        pointerInteractionRef.current = null;
        setHoverNode(null);
        hoverNodeRef.current = null;
        document.body.style.cursor = 'default';
        handleNodeDragEnd(node);
    }, [handleNodeDragEnd]);

    const onDrawLinkOverlay = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
        drawLinkOverlay(link, ctx, {
            clickedNode,
            showLines,
            activeFocusCategory,
            enabledLineCategories,
            graphData,
            getAnimProgress,
        });
    }, [clickedNode, showLines, activeFocusCategory, enabledLineCategories, graphData, getAnimProgress]);

    const onGetLinkColor = useCallback((link: any) => {
        return getLinkColor(link, {
            clickedNode,
            showLines,
            activeFocusCategory,
            enabledLineCategories,
            graphData,
        });
    }, [clickedNode, showLines, activeFocusCategory, enabledLineCategories, graphData]);

    const onGetLinkWidth = useCallback((link: any) => {
        return getLinkWidth(link, {
            clickedNode,
            showLines,
            activeFocusCategory,
            enabledLineCategories,
            graphData,
        });
    }, [clickedNode, showLines, activeFocusCategory, enabledLineCategories, graphData]);

    if (loading) {
        return (
            <div
                className={`w-full relative bg-[#fafafa] flex flex-col items-center justify-center ${isMini ? 'h-full' : 'rounded-2xl border border-slate-200/80 shadow-sm'}`}
                style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    height: isMini ? '100%' : 'calc(100vh - 120px)',
                    minHeight: isMini ? '300px' : '500px',
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
                    minHeight: isMini ? '300px' : '500px',
                }}
            >
                <span className="text-slate-400 text-xs font-medium">Tidak ada data relasi hukum untuk peraturan ini.</span>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onMouseMove={handlePointerMove}
            onPointerLeave={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
            className={`w-full relative bg-[#fafafa] overflow-hidden flex flex-col ${isMini ? 'h-full' : 'rounded-2xl border border-slate-200/80 shadow-sm'}`}
            style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                height: isMini ? '100%' : 'calc(100vh - 120px)',
                minHeight: isMini ? '300px' : '500px',
                backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
                backgroundSize: '24px 24px',
                touchAction: 'none',
            }}
        >
            {/* Top Toolbar, Legend Pills & Zoom Controls */}
            <GraphControls
                isMini={isMini}
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                connectedNodesCount={connectedNodes.length}
                totalNodesCount={graphData.nodes.length}
                showLines={showLines}
                onToggleLines={() => {
                    setShowLines(prev => {
                        const next = !prev;
                        if (!next) setActiveFocusCategory(null);
                        return next;
                    });
                }}
                activeFocusCategory={activeFocusCategory}
                enabledLineCategories={enabledLineCategories}
                onCategoryPillClick={handleCategoryPillClick}
                onRandomizeLayout={handleRandomizeStarLayout}
                onResetCamera={() => {
                    handleCloseCard();
                    resetViewToDefault(400);
                }}
                onToggleFullscreen={() => {
                    if (containerRef.current) {
                        if (document.fullscreenElement) document.exitFullscreen();
                        else containerRef.current.requestFullscreen();
                    }
                }}
                onZoomIn={() => {
                    if (graphRef.current) {
                        graphRef.current.zoom(graphRef.current.zoom() * 1.4, 300);
                    }
                }}
                onZoomOut={() => {
                    if (graphRef.current) {
                        graphRef.current.zoom(graphRef.current.zoom() / 1.4, 300);
                    }
                }}
            />

            {/* Slide-in Sidebar Panel */}
            <GraphSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                connectedNodes={connectedNodes}
                filteredNodes={filteredSidebarNodes}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                filterCategory={filterCategory}
                onFilterCategoryChange={setFilterCategory}
                selectedNodeId={clickedNode?.id}
                onSelectNode={handleSelectFromSidebar}
            />

            {/* Smooth Initial Loading Overlay */}
            {!isGraphReady && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs">
                    <div className="w-7 h-7 border-3 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-3"></div>
                    <span className="text-slate-500 font-semibold text-xs tracking-wider">Menata konstelasi relasi...</span>
                </div>
            )}

            {/* Force Graph Canvas Engine */}
            <div
                className="flex-1 w-full relative min-h-0 select-none"
                style={{
                    opacity: isGraphReady ? 1 : 0,
                    transition: 'opacity 0.25s ease-in',
                    touchAction: 'none',
                }}
                onPointerDown={handleCanvasPointerDown}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                onPointerCancel={handleCanvasPointerCancel}
            >
                <ForceGraph2D
                    ref={graphRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={graphData as any}
                    nodeRelSize={1}
                    d3VelocityDecay={0.88}
                    autoPauseRedraw={false}
                    nodeLabel={() => ''}

                    // Links
                    linkColor={onGetLinkColor}
                    linkWidth={onGetLinkWidth}
                    linkCurvature={0.06}
                    linkCanvasObjectMode={() => 'replace'}
                    linkCanvasObject={onDrawLinkOverlay}

                    // Zoom & Pan: Pengguna bebas pan dan drag; kartu detail tetap terkunci rigid di samping node
                    minZoom={0.2}
                    maxZoom={4}
                    enablePanInteraction={() => !pointerInteractionRef.current?.node}
                    enableNodeDrag={false}

                    // Interactivity Handlers
                    onNodeHover={handleNodeHover}
                    onNodeClick={handleNodeClick}
                    onNodeDrag={handleNodeDrag}
                    onNodeDragEnd={handleNodeDragEnd}
                    onBackgroundClick={handleCloseCard}
                    onZoom={handleZoom}
                    onRenderFramePost={() => {
                        if (cardNodeRef.current) {
                            updateCardDOMPosition();
                        }
                    }}

                    // Custom Orb Node Render
                    nodeCanvasObject={onDrawNode}
                    nodePointerAreaPaint={onNodePointerAreaPaint}

                    // Warmup & Auto-fit framing
                    warmupTicks={100}
                    cooldownTicks={100}
                    onEngineStop={() => {
                        if (!graphRef.current) return;
                        if (initialCenterDone.current) return;
                        initialCenterDone.current = true;

                        resetViewToDefault(0);

                        requestAnimationFrame(() => {
                            setIsGraphReady(true);
                        });
                    }}
                />
            </div>

            {/* Floating Interactive Detail Tooltip (Beside Clicked Node) */}
            {cardNode && (
                <GraphNodeCard
                    cardRef={cardRef}
                    cardNode={cardNode}
                    cardPos={initialCardPos}
                    onCloseCard={handleCloseCard}
                    onParentClose={onClose}
                />
            )}

            {/* Floating Quick Summary Tooltip (Following Mouse Cursor on Hover) */}
            {hoverNode && hoverNode.id !== cardNode?.id && !draggedNodeRef.current && (
                <GraphHoverCard
                    cardRef={hoverCardRef}
                    node={hoverNode}
                    pos={currentHoverPosRef.current.x ? currentHoverPosRef.current : hoverCardPos}
                />
            )}
        </div>
    );
}
