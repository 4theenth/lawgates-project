import { GraphNode } from './types';

// Helper: draw rounded rectangle
export const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
): void => {
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
export const applyRandomStarPositions = (nodes: GraphNode[]): GraphNode[] => {
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
