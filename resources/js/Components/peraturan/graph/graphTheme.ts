import { GraphNode, OrbTheme, RelationCategoryKey } from './types';

// ─────────────────────────────────────────────
// Color Tokens & Themes (Modern Light Constellation Style)
// ─────────────────────────────────────────────

export const ORB_THEMES: Record<string, OrbTheme> = {
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

export const RELATION_LEGEND_ITEMS: Array<{
    key: RelationCategoryKey;
    label: string;
    color: string;
    textColor: string;
}> = [
    { key: 'merujuk', label: 'Merujuk', color: '#10b981', textColor: 'text-emerald-700' },
    { key: 'dirujuk', label: 'Dirujuk', color: '#0284c7', textColor: 'text-sky-700' },
    { key: 'mengubah', label: 'Mengubah', color: '#f59e0b', textColor: 'text-amber-700' },
    { key: 'diubah', label: 'Diubah', color: '#8b5cf6', textColor: 'text-purple-700' },
    { key: 'mencabut', label: 'Mencabut', color: '#e11d48', textColor: 'text-rose-700' },
    { key: 'dicabut', label: 'Dicabut', color: '#d946ef', textColor: 'text-fuchsia-700' },
];

export const isDocumentAvailable = (node: GraphNode): boolean => {
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

export const formatTanggal = (dateString?: string): string => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

export const getShortCode = (node: GraphNode): string => {
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

export const getNodeCategoryKey = (node: GraphNode): string => {
    if (node.isCenter) return 'center';

    const relCat = (node.relCategory || '').toLowerCase();
    const relType = (node.relType || '').toLowerCase();

    if (relCat === 'dicabut oleh' || relType === 'dicabut_oleh' || relCat.includes('dicabut oleh')) return 'dicabut';
    if (relCat === 'mencabut' || relType === 'mencabut') return 'mencabut';
    if (relCat === 'diubah oleh' || relType === 'diubah_oleh' || relCat.includes('diubah oleh')) return 'diubah';
    if (relCat === 'mengubah' || relType === 'mengubah') return 'mengubah';
    if (relCat === 'dirujuk oleh' || relType === 'dirujuk_oleh' || relCat.includes('dirujuk oleh')) return 'dirujuk';
    if (relCat === 'merujuk' || relType === 'merujuk') return 'merujuk';

    if (relCat.includes('dicabut') || relType.includes('dicabut')) return 'dicabut';
    if (relCat.includes('mencabut')) return 'mencabut';
    if (relCat.includes('diubah') || relType.includes('diubah')) return 'diubah';
    if (relCat.includes('mengubah')) return 'mengubah';
    if (relCat.includes('dirujuk') || relType.includes('dirujuk')) return 'dirujuk';
    if (relCat.includes('merujuk')) return 'merujuk';

    return 'default';
};

export const getNodeTheme = (node: GraphNode): OrbTheme => {
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
