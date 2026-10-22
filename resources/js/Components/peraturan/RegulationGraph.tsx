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
        setClickedNode(null);
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
    }, [isSidebarOpen, DEFAULT_GRAPH_ZOOM]);

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

    // Wait 240ms for node glide & camera POV centering to arrive at screen center before showing card
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

            const focusZoom = 1.25;
            const sidebarOffsetGraphX = isSidebarOpen ? (160 / focusZoom) : 0;
            graphRef.current.centerAt(mainX - sidebarOffsetGraphX, mainY, 350);
            graphRef.current.zoom(focusZoom, 350);
        }
    }, [graphData.nodes, isSidebarOpen]);

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
                    const t = timestamp / 1000;
                    targetX = baseX + Math.sin(t * (node.driftSpeedX || 0.0001) * 1000 + (node.phaseX || 0)) * (node.driftAmpX || 8);
                    targetY = baseY + Math.cos(t * (node.driftSpeedY || 0.0001) * 1000 + (node.phaseY || 0)) * (node.driftAmpY || 8);
                }

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
                    const sidebarOffsetGraphX = isSidebarOpen ? (160 / currentZoom) : 0;
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
    }, [graphData.nodes]);

    // Adaptive card position calculation yang menjamin TIDAK PERNAH menimpa jendela daftar relasi
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
        const cardHeight = 220;

        // Lebar sidebar saat terbuka: w-80 adalah 320px, dibatasi max 85vw
        const sidebarWidth = isSidebarOpen ? Math.min(320, dimensions.width * 0.85) : 0;
        // Batas kiri aman agar kartu TIDAK PERNAH menimpa sidebar jendela daftar relasi
        const minLeft = isSidebarOpen ? sidebarWidth + 16 : 16;
        const maxRight = Math.max(minLeft, dimensions.width - cardWidth - 16);

        // Opsi penempatan horizontal
        const leftCandidate = coords.x - cardWidth - 25;
        const rightCandidate = coords.x + 25;

        let targetX: number;
        let targetY = coords.y - cardHeight / 2;

        if (isSidebarOpen) {
            // Ketika jendela daftar relasi terbuka:
            // 1. Prioritaskan sisi kanan node jika muat di dalam viewport
            if (rightCandidate <= maxRight) {
                targetX = Math.max(minLeft, rightCandidate);
            }
            // 2. Jika tidak muat di kanan tapi muat di kiri tanpa menabrak sidebar
            else if (leftCandidate >= minLeft) {
                targetX = leftCandidate;
            }
            // 3. Jika ruang sempit, letakkan di atas / bawah node dan clamp X agar tetap di kanan sidebar
            else {
                targetX = Math.max(minLeft, Math.min(coords.x - cardWidth / 2, maxRight));
                targetY = coords.y < centerCoords.y ? coords.y - cardHeight - 25 : coords.y + 25;
            }
        } else {
            // Sidebar tertutup: letakkan di kiri atau kanan tergantung posisi terhadap center node
            const isLeftOfCenter = coords.x < centerCoords.x;
            if (isLeftOfCenter && leftCandidate >= minLeft) {
                targetX = leftCandidate;
            } else if (rightCandidate <= maxRight) {
                targetX = rightCandidate;
            } else if (leftCandidate >= minLeft) {
                targetX = leftCandidate;
            } else {
                targetX = Math.max(minLeft, Math.min(coords.x - cardWidth / 2, maxRight));
                targetY = coords.y < centerCoords.y ? coords.y - cardHeight - 25 : coords.y + 25;
            }
        }

        // Clamp akhir yang absolut: targetX PASTI >= minLeft dan <= maxRight
        targetX = Math.max(minLeft, Math.min(targetX, maxRight));

        // Clamp vertikal agar tidak keluar batas atas dan bawah canvas
        targetY = Math.max(16, Math.min(targetY, dimensions.height - cardHeight - 16));

        return { x: targetX, y: targetY };
    }, [cardNode, graphData.nodes, dimensions, isSidebarOpen]);

    // Canvas render delegates
    const onDrawNode = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
        drawNode(node, ctx, { hoverNode, clickedNode, activeNodeIds });
    }, [hoverNode, clickedNode, activeNodeIds]);

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
            className={`w-full relative bg-[#fafafa] overflow-hidden flex flex-col ${isMini ? 'h-full' : 'rounded-2xl border border-slate-200/80 shadow-sm'}`}
            style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                height: isMini ? '100%' : 'calc(100vh - 120px)',
                minHeight: isMini ? '300px' : '500px',
                backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
                backgroundSize: '24px 24px',
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
                    setClickedNode(null);
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
            <div className="flex-1 w-full relative min-h-0" style={{ opacity: isGraphReady ? 1 : 0, transition: 'opacity 0.25s ease-in' }}>
                <ForceGraph2D
                    ref={graphRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={graphData}
                    nodeRelSize={1}
                    d3VelocityDecay={0.88}

                    // Links
                    linkColor={onGetLinkColor}
                    linkWidth={onGetLinkWidth}
                    linkCurvature={0.06}
                    linkCanvasObjectMode={() => 'replace'}
                    linkCanvasObject={onDrawLinkOverlay}

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
                    nodeCanvasObject={onDrawNode}

                    // Pointer Touch Boundary Area for Easy Clicking
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
                    cardNode={cardNode}
                    cardPos={cardPos}
                    onCloseCard={() => setClickedNode(null)}
                    onParentClose={onClose}
                />
            )}
        </div>
    );
}
