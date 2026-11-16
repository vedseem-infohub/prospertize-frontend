"use client";

import Image from "next/image";

const row1 = [
  { src: "/clients/client-1.png", alt: "Client Brand 1" },
  { src: "/clients/client-2.png", alt: "Client Brand 2" },
  { src: "/clients/client-3.png", alt: "Client Brand 3" },
  { src: "/clients/client-4.png", alt: "Client Brand 4" },
  { src: "/clients/client-5.png", alt: "Client Brand 5" },
];

const row2 = [
  { src: "/clients/client-6.png", alt: "Client Brand 6" },
  { src: "/clients/client-7.png", alt: "Client Brand 7" },
  { src: "/clients/client-8.png", alt: "Client Brand 8" },
  { src: "/clients/client-9.png", alt: "Client Brand 9" },
  { src: "/clients/client-1.png", alt: "Client Brand 1" },
];

export default function OurClients() {
  return (
    <section
      className="bg-white py-10 md:py-14 overflow-hidden"
      aria-labelledby="clients-heading"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
          {/* Left: Section Header with Brand Stat */}
          <div className="lg:w-[260px] xl:w-[280px] flex-shrink-0">
            <p className="flex items-center text-[10px] md:text-[11px] font-bold tracking-[1.5px] uppercase text-[#171717] mb-2">
              <span
                className="inline-block bg-[#bd4b25] w-[20px] h-[2px] mr-2 align-middle flex-shrink-0"
                aria-hidden="true"
              ></span>
              OUR CLIENTS
            </p>

            <h2
              id="clients-heading"
              className="text-[34px] sm:text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-1.8px] text-[#171717] mb-3"
            >
              550<span className="text-[#bd4b25]">+</span>
              <br />
              <em className="font-serif italic font-normal text-[#bd4b25]">
                Brands
              </em>
            </h2>

            <p className="text-[13px] md:text-[14px] leading-relaxed text-[#626262] max-w-[320px]">
              Trusted by restaurants, cafés, QSRs and food entrepreneurs across
              India and beyond.
            </p>
          </div>

          {/* Right: Multi-row Animated Client Logo Ticker */}
          <div className="flex-1 min-w-0 relative">
            {/* Edge Gradients for Smooth In/Out Fading */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex flex-col gap-4">
              {/* Row 1: Forward Marquee */}
              <div className="flex overflow-hidden select-none group">
                <div className="flex shrink-0 items-center gap-4 animate-marquee group-hover:[animation-play-state:paused]">
                  {[...row1, ...row1, ...row1, ...row1].map((client, idx) => (
                    <div
                      key={`r1-${idx}`}
                      className="h-[74px] md:h-[82px] w-[140px] sm:w-[170px] flex-shrink-0 flex items-center justify-center p-3 bg-white border border-[#dededb] rounded-lg transition-all duration-300 hover:border-[#171717] hover:shadow-sm"
                    >
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="max-h-[46px] w-auto max-w-[85%] object-contain transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Reverse Marquee */}
              <div className="flex overflow-hidden select-none group">
                <div className="flex shrink-0 items-center gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused]">
                  {[...row2, ...row2, ...row2, ...row2].map((client, idx) => (
                    <div
                      key={`r2-${idx}`}
                      className="h-[74px] md:h-[82px] w-[140px] sm:w-[170px] flex-shrink-0 flex items-center justify-center p-3 bg-white border border-[#dededb] rounded-lg transition-all duration-300 hover:border-[#171717] hover:shadow-sm"
                    >
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="max-h-[46px] w-auto max-w-[85%] object-contain transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
