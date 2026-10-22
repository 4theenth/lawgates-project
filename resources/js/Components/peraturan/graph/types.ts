export interface GraphNode {
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
    __origBaseX?: number;
    __origBaseY?: number;
    driftSpeedX?: number;
    driftSpeedY?: number;
    driftAmpX?: number;
    driftAmpY?: number;
    phaseX?: number;
    phaseY?: number;
    isDragging?: boolean;
    __isDragging?: boolean;
}

export interface GraphLink {
    source: string | number | GraphNode;
    target: string | number | GraphNode;
    type: string;
    relCategory?: string;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

export interface RegulationGraphProps {
    peraturanId: number;
    onClose?: () => void;
    onExpand?: () => void;
    isMini?: boolean;
}

export interface OrbTheme {
    core: string;
    glow: string;
    halo: string;
    ring: string;
    line: string;
    text: string;
    label: string;
}

export type RelationCategoryKey = 'merujuk' | 'dirujuk' | 'mengubah' | 'diubah' | 'mencabut' | 'dicabut';

export type FilterCategoryType = 'all' | RelationCategoryKey;
