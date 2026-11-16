"use client";

import { useState, useEffect, useRef } from "react";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logoEntered, setLogoEntered] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [detailsFaded, setDetailsFaded] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState({});

  const centerLogoRef = useRef(null);

  useEffect(() => {
    // Lock document scroll while the intro is active
    document.body.style.overflow = "hidden";

    // 1. Logo fades in & scales into view
    const tEnter = setTimeout(() => {
      setLogoEntered(true);
    }, 120);

    // 2. Shimmer sweep glides across the logo card
    const tShimmer = setTimeout(() => {
      setShimmer(true);
    }, 550);

    // 3. Tagline reveals with expanding terracotta lines
    const tTagline = setTimeout(() => {
      setTaglineVisible(true);
    }, 950);

    // 4. Percentage counter animation from 000 to 100
    const startProgressTime = performance.now();
    const progressDuration = 1700; // 1.7s

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startProgressTime;
      const ratio = Math.min(elapsed / progressDuration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    requestAnimationFrame(updateCounter);

    // 5. Fade out supporting tagline and counter before flight
    const tDetailsFade = setTimeout(() => {
      setDetailsFaded(true);
    }, 2050);

    // 6. Calculate coordinates of #nav-logo-slot and fly logo into navbar
    const tFly = setTimeout(() => {
      const navSlot = document.getElementById("nav-logo-slot");
      const centerLogo = centerLogoRef.current;

      if (navSlot && centerLogo) {
        const navRect = navSlot.getBoundingClientRect();
        const centerRect = centerLogo.getBoundingClientRect();

        const deltaX =
          navRect.left + navRect.width / 2 - (centerRect.left + centerRect.width / 2);
        const deltaY =
          navRect.top + navRect.height / 2 - (centerRect.top + centerRect.height / 2);
        const scaleRatio = navRect.height / centerRect.height;

        setFlyStyle({
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleRatio})`,
          transition: "transform 850ms cubic-bezier(0.77, 0, 0.175, 1)",
        });
      }

      setIsFlying(true);
    }, 2350);

    // 7. Unmount curtain and restore scroll
    const tEnd = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 3250);

    return () => {
      clearTimeout(tEnter);
      clearTimeout(tShimmer);
      clearTimeout(tTagline);
      clearTimeout(tDetailsFade);
      clearTimeout(tFly);
      clearTimeout(tEnd);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      id="intro-curtain"
      className={`fixed inset-0 z-[10000] overflow-hidden select-none transition-opacity duration-300 ${isFlying ? "pointer-events-none" : "pointer-events-auto"
        }`}
      aria-hidden="true"
    >
      {/* Top Half Shutter Curtain */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#171717] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isFlying ? "-translate-y-full" : "translate-y-0"
          }`}
      />

      {/* Bottom Half Shutter Curtain */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#171717] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isFlying ? "translate-y-full" : "translate-y-0"
          }`}
      />

      {/* Subtle Geometric Overlay Grid Pattern */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-500 ${isFlying ? "opacity-0" : "opacity-15"
          }`}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Center Terracotta Radial Ambient Light */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isFlying ? "opacity-0" : "opacity-100"
          }`}
        style={{
          background:
            "radial-gradient(52% 42% at 50% 48%, rgba(189, 75, 37, 0.22), transparent 72%)",
        }}
      />

      {/* Center Flying Logo & Branding Unit */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Flying Logo Unit */}
        <div
          ref={centerLogoRef}
          style={flyStyle}
          className={`relative z-20 transition-all duration-700 ease-out ${!isFlying
            ? logoEntered
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
            : ""
            }`}
        >
          {/* Logo Card */}
          <div className="relative overflow-hidden">
            <img
              src="/preloader-logo-circle.webp"
              alt="Restavision"
              className="h-14 sm:h-18 md:h-40 w-auto object-contain block"
            />

            {/* Shimmer Light Beam Sweep */}
            <div
              className={`pointer-events-none absolute inset-y-[-40%] w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-1000 ease-in-out ${shimmer ? "left-[160%]" : "-left-[100%]"
                }`}
            />
          </div>
        </div>

        {/* Tagline Unit Flanked by Expanding Terracotta Accent Lines */}
        <div
          className={`mt-8 sm:mt-10 flex items-center gap-3.5 transition-all duration-500 ${detailsFaded || isFlying
            ? "opacity-0 translate-y-3 pointer-events-none"
            : "opacity-100 translate-y-0"
            }`}
        >
          <span
            className={`h-[1.5px] w-6 sm:w-12 bg-[#bd4b25] transition-transform duration-500 origin-right ${taglineVisible ? "scale-x-100" : "scale-x-0"
              }`}
          />
          <div className="overflow-hidden py-1">
            <span
              className={`block text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-[2px] uppercase text-white/90 transition-all duration-500 ${taglineVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
                }`}
            >
              Building Better Hospitality Businesses
            </span>
          </div>
          <span
            className={`h-[1.5px] w-6 sm:w-12 bg-[#bd4b25] transition-transform duration-500 origin-left ${taglineVisible ? "scale-x-100" : "scale-x-0"
              }`}
          />
        </div>
      </div>

      {/* Bottom-Right 000% -> 100% Counter */}
      <div
        className={`absolute right-6 sm:right-10 md:right-14 bottom-6 sm:bottom-8 flex items-baseline gap-1 font-sans transition-all duration-500 ${detailsFaded || isFlying
          ? "opacity-0 translate-y-3 pointer-events-none"
          : "opacity-100 translate-y-0"
          }`}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white tabular-nums">
          {String(progress).padStart(3, "0")}
        </span>
        <span className="text-xs sm:text-sm font-bold text-[#bd4b25]">%</span>
      </div>
    </div>
  );
}
