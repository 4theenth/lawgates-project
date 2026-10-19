import { GraphData, GraphNode } from './types';
import { getNodeCategoryKey, getNodeTheme, getShortCode, ORB_THEMES } from './graphTheme';
import { drawRoundedRect } from './graphMath';

export interface DrawNodeOptions {
    hoverNode: GraphNode | null;
    clickedNode: GraphNode | null;
    activeNodeIds: Set<string | number> | null;
}

export const drawNode = (
    node: GraphNode,
    ctx: CanvasRenderingContext2D,
    { hoverNode, clickedNode, activeNodeIds }: DrawNodeOptions
): void => {
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
};

export interface DrawLinkOptions {
    clickedNode: GraphNode | null;
    showLines: boolean;
    activeFocusCategory: string | null;
    enabledLineCategories: Record<string, boolean>;
    graphData: GraphData;
    getAnimProgress: (key: string, targetVal: number, now: number) => number;
}

export const drawLinkOverlay = (
    link: any,
    ctx: CanvasRenderingContext2D,
    {
        clickedNode,
        showLines,
        activeFocusCategory,
        enabledLineCategories,
        graphData,
        getAnimProgress,
    }: DrawLinkOptions
): void => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;

    const isClickedLink = clickedNode && (sourceId === clickedNode.id || targetId === clickedNode.id);

    const targetNode = typeof link.target === 'object' ? link.target : graphData.nodes.find(n => n.id === targetId);
    const sourceNode = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === sourceId);
    const node = (targetNode && !targetNode.isCenter) ? targetNode : sourceNode;
    const catKey = node ? getNodeCategoryKey(node) : 'default';

    const now = performance.now();

    // 1. Progress for individual clicked node selection
    const clickedKey = `clicked_${sourceId}-${targetId}`;
    const pClicked = getAnimProgress(clickedKey, isClickedLink ? 1 : 0, now);

    // 2. Progress for category filter
    const isCatActive = showLines && (activeFocusCategory === null ? enabledLineCategories[catKey] !== false : catKey === activeFocusCategory);
    const catKeyAnim = `cat_${catKey}`;
    const pCat = getAnimProgress(catKeyAnim, isCatActive ? 1 : 0, now);

    // Max combined animation progress
    const p = Math.max(pClicked, pCat);

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

    // 1. Draw Base Animated Line
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

    // 2. Draw Electric Energy Flow Particles
    if (p > 0.05) {
        const pulseSpeed = 0.0012;
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

    // 3. Draw Relation Badge Pill at Link Midpoint
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
};

export interface LinkStyleOptions {
    clickedNode: GraphNode | null;
    showLines: boolean;
    activeFocusCategory: string | null;
    enabledLineCategories: Record<string, boolean>;
    graphData: GraphData;
}

export const getLinkColor = (link: any, {
    clickedNode,
    showLines,
    activeFocusCategory,
    enabledLineCategories,
    graphData,
}: LinkStyleOptions): string => {
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

    return 'rgba(0, 0, 0, 0)';
};

export const getLinkWidth = (link: any, {
    clickedNode,
    showLines,
    activeFocusCategory,
    enabledLineCategories,
    graphData,
}: LinkStyleOptions): number => {
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
};
