/**
 * ─────────────────────────────────────────────────────────────
 * KONFIGURASI TEMA & PEWARNAAN PETA HUKUM INDONESIA
 * ─────────────────────────────────────────────────────────────
 * Sumber Kebenaran Token Warna: resources/css/app.css
 * - Primary Navy: --color-pr-900 (#0a1c3e)
 * - Stroke & Neutral: #0F2C59, --color-neu-100, --color-neu-200
 */

export const MAP_THEME = {
  // Token Warna (Sinkron dengan design tokens app.css & standar kartografi atlas)
  colors: {
    primary: '#0A1C3E', // --color-pr-900
    primaryBorder: '#0F2C59',
    atlasBorder: '#B2644D', // Cokelat Terakota Atlas
    ocean: '#96C1DF',
    unselectedFill: '#000000',
  },

  // Gaya layer polygon provinsi Leaflet
  province: {
    default: {
      fillColor: '#000000',
      fillOpacity: 0.001,
      weight: 1.5,
      color: '#B2644D', // Cokelat Terakota Atlas (natural, serasi dengan relief peta)
      opacity: 0.9,
      className: 'cursor-pointer',
    },
    hover: {
      fillColor: '#0A1C3E', // --color-pr-900
      color: '#0A1C3E',     // --color-pr-900
      weight: 2,
      fillOpacity: 0.25,
      opacity: 1,
      className: 'cursor-pointer',
    },
    selected: {
      fillColor: '#0A1C3E', // --color-pr-900
      color: '#0A1C3E',     // --color-pr-900
      weight: 2.5,
      fillOpacity: 1,
      opacity: 1,
      className: 'cursor-pointer',
    },
  },
} as const;
