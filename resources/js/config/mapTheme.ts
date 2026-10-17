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
    ocean: '#71D4E9', // Google Maps Cyan Ocean
    unselectedFill: '#000000',
  },

  // Konfigurasi garis batas darat antar provinsi dalam wilayah Indonesia (tanpa garis pantai)
  borders: {
    color: '#7a7a7a', // --color-neu-500 (Netral abu-abu terarah dari design tokens app.css)
    weight: 1.5,
    opacity: 0.9,
  },

  // Wilayah negara lain di luar Indonesia (dimatikan warnanya menjadi netral neu-50)
  neighbors: {
    fillColor: '#e9e9e9', // --color-neu-50
    fillOpacity: 1,
    weight: 0,
    color: 'transparent',
    opacity: 0,
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
      weight: 2,
      fillOpacity: 0.45,   // Blok wilayah jelas dan tegas saat kursor mengarah ke provinsi
      opacity: 1,
      className: 'cursor-pointer',
    },
    selected: {
      fillColor: '#0A1C3E', // --color-pr-900
      color: '#0A1C3E',     // --color-pr-900
      weight: 2.5,
      fillOpacity: 0.45,    // Semi-transparan agar kontur & peta pulau di bawahnya tetap terlihat jelas
      opacity: 1,
      className: 'cursor-pointer',
    },
  },
} as const;
