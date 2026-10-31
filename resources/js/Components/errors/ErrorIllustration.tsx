interface ErrorIllustrationProps {
  status: number;
}

/**
 * Crane illustration used on error pages. The animation is defined in
 * resources/css/error-page.css so it matches the standalone Blade fallback.
 */
export function ErrorIllustration({ status }: ErrorIllustrationProps) {
  return (
    <svg viewBox="0 0 520 480" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
      <circle cx="260" cy="248" r="208" fill="#e3eaf2" />

      <rect x="58" y="48" width="46" height="20" rx="4" fill="#3b4965" />

      <g stroke="#546078" strokeLinecap="round">
        <rect x="62" y="68" width="366" height="9" rx="4.5" fill="#546078" stroke="none" />
        <rect x="74" y="92" width="342" height="7" rx="3.5" fill="#3b4965" stroke="none" />
        <path
          d="M74 92 96 77M120 92l22-15M166 92l22-15M212 92l22-15M258 92l22-15M304 92l22-15M350 92l22-15M396 92l20-13"
          strokeWidth="4"
        />
        <path d="M120 99v271M152 99v271" strokeWidth="8" />
        <path d="M120 130l32 30-32 30 32 30-32 30 32 30-32 30 32 30-32 30" strokeWidth="4" />
      </g>

      <g className="lg-crane-x">
        <rect className="lg-crane-cable" x="378" y="111" width="2" height="94" fill="#9da4b2" />
      </g>

      <g fontFamily="Inter, Arial, sans-serif" fontSize="12" fontWeight="600" fill="#233351" textAnchor="middle">
        <g transform="translate(0 -8)">
          <g className="lg-card lg-card--1">
            <rect x="371" y="133" width="16" height="10" rx="2" fill="#9da4b2" />
            <rect x="343" y="140" width="72" height="28" rx="4" fill="#ffffff" stroke="#ced2d8" />
            <text x="379" y="159">Task</text>
          </g>
          <g className="lg-card lg-card--2">
            <rect x="371" y="173" width="16" height="10" rx="2" fill="#9da4b2" />
            <rect x="343" y="180" width="72" height="28" rx="4" fill="#ffffff" stroke="#ced2d8" />
            <text x="379" y="199">{"</>"}</text>
          </g>
          <g className="lg-card lg-card--3">
            <rect x="371" y="213" width="16" height="10" rx="2" fill="#9da4b2" />
            <rect x="343" y="220" width="72" height="28" rx="4" fill="#ffffff" stroke="#ced2d8" />
            <text x="379" y="239">Halaman</text>
          </g>
        </g>
      </g>

      <g className="lg-crane-x" fill="#3b4965">
        <rect x="362" y="77" width="34" height="14" rx="3" />
        <rect x="371" y="99" width="16" height="12" rx="3" />
        <circle cx="379" cy="105" r="2.5" fill="#9da4b2" />
      </g>

      <g transform="translate(0, -28)">
        <path d="M272 423h36l10 25h-56l10-25Z" fill="#3b4965" />
        <rect x="236" y="448" width="108" height="12" rx="6" fill="#233351" />
        <rect x="162" y="272" width="256" height="160" rx="14" fill="#3b4965" />
        <rect x="176" y="286" width="228" height="118" rx="8" fill="#0a1c3e" />
        <circle className="lg-status-dot" cx="190" cy="298" r="4" fill="#d4af37" />
        <circle cx="203" cy="298" r="4" fill="#8590a3" />
        <circle cx="216" cy="298" r="4" fill="#4d5c78" />
        <text x="390" y="302" textAnchor="end" fontFamily="Inter, Arial, sans-serif" fontSize="9" fill="#8590a3">
          app.tsx
        </text>

        <g fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', monospace" fontSize="12">
          <text x="192" y="330" fill="#7f8ba1">1</text>
          <text x="208" y="330">
            <tspan fill="#d4af37">const</tspan>
            <tspan fill="#e7e8ec"> status = </tspan>
            <tspan fill="#d4af37">{status}</tspan>
            <tspan fill="#9da4b2">;</tspan>
          </text>
          <text x="192" y="350" fill="#7f8ba1">2</text>
          <text x="208" y="350">
            <tspan fill="#e7e8ec">page.</tspan>
            <tspan fill="#d4af37">unavailable</tspan>
            <tspan fill="#9da4b2">();</tspan>
          </text>
          <text x="192" y="370" fill="#7f8ba1">3</text>
          <rect className="lg-cursor" x="208" y="361" width="7" height="12" rx="1" fill="#d4af37" />
        </g>

        <g fill="#6c778b">
          <g transform="translate(416 428)">
            <g className="lg-gear-1">
              <rect x="-5" y="-30" width="10" height="60" rx="5" />
              <rect x="-5" y="-30" width="10" height="60" rx="5" transform="rotate(45)" />
              <rect x="-5" y="-30" width="10" height="60" rx="5" transform="rotate(90)" />
              <rect x="-5" y="-30" width="10" height="60" rx="5" transform="rotate(135)" />
              <circle r="23" />
              <circle r="9" fill="#e3eaf2" />
            </g>
          </g>
          <g transform="translate(446 392)">
            <g className="lg-gear-2">
              <rect x="-4" y="-22" width="8" height="44" rx="4" />
              <rect x="-4" y="-22" width="8" height="44" rx="4" transform="rotate(45)" />
              <rect x="-4" y="-22" width="8" height="44" rx="4" transform="rotate(90)" />
              <rect x="-4" y="-22" width="8" height="44" rx="4" transform="rotate(135)" />
              <circle r="17" />
              <circle r="6.5" fill="#e3eaf2" />
            </g>
          </g>
        </g>

        <circle cx="458" cy="446" r="6" fill="#b5bbc5" />
      </g>
    </svg>
  );
}
