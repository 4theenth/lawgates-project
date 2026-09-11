import { CountUp } from '../common/CountUp';
import { Icon } from '@/Components/ui/icon';

export function AboutOverview() {
  return (
    <div
      className="
        relative
        flex
        w-full
        min-h-[180px]
        px-6
        md:px-[78px]
        py-[30px]
        flex-col
        justify-center
        bg-pr-900
        border
        border-pr-700/60
        rounded-2xl
        shadow-2xl
        overflow-hidden
      "
    >
      {/* Subtle ambient gold radial glow */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 pointer-events-none rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--color-sec-900) 0%, transparent 70%)',
        }}
      />

      {/* Content: Layout sesuai Figma Frame 268 (gap 50px) */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full items-start lg:items-center gap-[30px] lg:gap-[50px]">
        
        {/* LEFT: Badge + Metrics */}
        <div className="flex flex-col items-start gap-[15px] shrink-0">
            
            {/* Badge */}
            <div
              className="
                flex
                px-[8px]
                py-[2px]
                justify-center
                items-center
                gap-[8px]
                rounded-[20px]
                border
                border-[#E7E8EC]
                bg-white
                text-pr-900
              "
            >
              {/* Ellipse 3 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                className="shrink-0"
              >
                <circle
                  cx="3"
                  cy="3"
                  r="3"
                  fill="#0A1C3E"
                />
              </svg>

              <span
                className="
                  text-pr-900
                  text-[10px]
                  font-semibold
                  leading-[16px]
                "
              >
                TENTANG KAMI
              </span>
            </div>

            {/* 3 Metrics */}
            <div className="flex items-start gap-[17px]">
              
              {/* Metric 1 */}
              <div className="flex flex-col items-start">
                <div
                  className="
                    self-stretch
                    text-white
                    text-[24px]
                    font-semibold
                    leading-[130%]
                  "
                >
                  <CountUp end={3957045} />
                  <span>+</span>
                </div>

                <span
                  className="
                    self-stretch
                    text-neu-100
                    text-[12px]
                    font-normal
                    leading-[18px]
                  "
                >
                  Data Hukum
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-start">
                <div
                  className="
                    self-stretch
                    text-white
                    text-[24px]
                    font-semibold
                    leading-[130%]
                  "
                >
                  <CountUp end={1627205} />
                  <span>+</span>
                </div>

                <span
                  className="
                    self-stretch
                    text-neu-100
                    text-[12px]
                    font-normal
                    leading-[18px]
                  "
                >
                  Dokumen Hukum
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-start">
                <div
                  className="
                    self-stretch
                    text-white
                    text-[24px]
                    font-semibold
                    leading-[130%]
                  "
                >
                  <CountUp end={100000} />
                  <span>+</span>
                </div>

                <span
                  className="
                    self-stretch
                    text-neu-100
                    text-[12px]
                    font-normal
                    leading-[18px]
                  "
                >
                  Pelanggan Aktif
                </span>
              </div>

            </div>
          </div>

        {/* RIGHT: Description (Figma Frame 268) */}
        <div className="flex-1 w-full">
          <p className="text-white text-left text-[14px] lg:text-[15px] xl:text-[16px] font-normal leading-[24px]">
            LawGates adalah platform pangkalan data hukum terpadu yang
            merangkum seluruh peraturan perundang-undangan di Indonesia ke
            dalam satu titik akses pencarian tanpa harus menelusuri puluhan
            portal instansi pemerintah yang terpisah.
          </p>
        </div>

      </div>
    </div>
  );
}