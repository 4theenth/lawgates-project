/**
 * ─────────────────────────────────────────────────────────────
 * KONFIGURASI TEMA & PEWARNAAN PETA HUKUM INDONESIA
 * ─────────────────────────────────────────────────────────────
 * Sumber Kebenaran Token Warna: resources/css/app.css
 * - Primary Navy: --color-pr-900 (#0a1c3e)
 * - Stroke & Neutral: #0F2C59, --color-neu-100, --color-neu-200
 */

export const MAP_THEME = {
  // Token Warna (Sinkron dengan design tokens app.css)
  colors: {
    primary: '#0A1C3E', // --color-pr-900
    primaryBorder: '#0F2C59',
    ocean: '#96C1DF',
    unselectedFill: '#000000',
  },

  // Konfigurasi garis batas darat antar provinsi (hanya perbatasan darat antar provinsi)
  borders: {
    color: '#909090', // --color-neu-400 (Netral abu-abu halus dari design tokens app.css)
    weight: 1.5,
    opacity: 0.9,
  },

  // Gaya layer polygon provinsi Leaflet
  province: {
    default: {
      fillColor: '#000000',
      fillOpacity: 0.001,
      weight: 0,
      color: 'transparent',
      opacity: 0,
      className: 'cursor-pointer',
    },
    hover: {
      fillColor: '#0A1C3E', // --color-pr-900
      color: '#0A1C3E',     // --color-pr-900
      weight: 1.5,
      fillOpacity: 0.2,
      opacity: 0.8,
      className: 'cursor-pointer',
    },
    selected: {
      fillColor: '#0A1C3E', // --color-pr-900
      color: '#0A1C3E',     // --color-pr-900
      weight: 2,
      fillOpacity: 1,
      opacity: 1,
      className: 'cursor-pointer',
    },
  },
} as const;
