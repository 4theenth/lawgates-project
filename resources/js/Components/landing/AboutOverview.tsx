import { CountUp } from '../common/CountUp';

export function AboutOverview() {
  return (
    <div className=" w-full ">


      <div
        className="
      mt-[66px]
        relative
        flex
        w-full
        min-h-[180px]
        px-5
        sm:px-8
        md:px-[78px]
        py-6
        sm:py-8
        md:py-[30px]
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

        {/* Content: Layout with balanced columns for metrics and description */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-6 lg:gap-8 xl:gap-10">

          {/* LEFT: Badge + 3 Large Metrics (col-span-6 for ample width) */}
          <div className="flex flex-col items-start gap-3 sm:gap-[15px] lg:col-span-6 w-full shrink-0">

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
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-[20px] w-full">

              {/* Metric 1: Dokumen Hukum Terintegrasi */}
              <div className="flex flex-col items-start min-w-0">
                <div
                  className="
                    self-stretch
                    text-white
                    text-[18px]
                    sm:text-[22px]
                    md:text-[24px]
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
                    text-[11px]
                    sm:text-[12px]
                    font-normal
                    leading-[15px]
                    sm:leading-[18px]
                    break-words
                    [overflow-wrap:anywhere]
                  "
                >
                  Dokumen Hukum Terintegrasi
                </span>
              </div>

              {/* Metric 2: Lembaga/Kementerian Terdaftar */}
              <div className="flex flex-col items-start min-w-0">
                <div
                  className="
                    self-stretch
                    text-white
                    text-[18px]
                    sm:text-[22px]
                    md:text-[24px]
                    font-semibold
                    leading-[130%]
                  "
                >
                  <CountUp end={100} />
                  <span>+</span>
                </div>

                <span
                  className="
                    self-stretch
                    text-neu-100
                    text-[11px]
                    sm:text-[12px]
                    font-normal
                    leading-[15px]
                    sm:leading-[18px]
                    break-words
                    [overflow-wrap:anywhere]
                  "
                >
                  Lembaga/Kementerian Terdaftar
                </span>
              </div>

              {/* Metric 3: Regulasi Daerah Terpetakan */}
              <div className="flex flex-col items-start min-w-0">
                <div
                  className="
                    self-stretch
                    text-white
                    text-[18px]
                    sm:text-[22px]
                    md:text-[24px]
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
                    text-[11px]
                    sm:text-[12px]
                    font-normal
                    leading-[15px]
                    sm:leading-[18px]
                    break-words
                    [overflow-wrap:anywhere]
                  "
                >
                  Regulasi Daerah Terpetakan
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT: Description (col-span-6: balanced space and comfortable reading width) */}
          <div className="w-full lg:col-span-6">
            <p className="text-white/95 text-justify text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal leading-[24px] sm:leading-[26px] [text-align-last:left]">
              LawGates adalah platform pangkalan data hukum terpadu yang
              merangkum seluruh peraturan perundang-undangan di Indonesia ke
              dalam satu titik akses pencarian tanpa harus menelusuri puluhan
              portal instansi pemerintah yang terpisah.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}