"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    src: "/01_restaurants_that_perform.webp",
    alt: "Restaurants that Perform — from concept to operations",
    title: "Restaurants that Perform",
  },
  {
    src: "/02_cafes_with_character.webp",
    alt: "Cafés with Character — concept, menu and design",
    title: "Cafés with Character",
  },
  {
    src: "/03_operational_excellence.webp",
    alt: "Operational Excellence — practical systems, SOPs and training",
    title: "Operational Excellence",
  },
  {
    src: "/04_technology_for_better_decisions.webp",
    alt: "Technology for Better Decisions — tools, digital checklists and MIS",
    title: "Technology for Better Decisions",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const touchStartX = useRef(0);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setHasInteracted(true);
    setCurrentSlide(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (hasInteracted) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, hasInteracted]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setHasInteracted(true);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <section
      className="max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12 pt-4 pb-10 md:pt-7 md:pb-5"
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.14fr_1fr] gap-8 md:gap-10 lg:gap-14 items-center">
        {/* Left Column: Hero Copy */}
        <div className="min-w-0">
          {/* <p className="flex items-center text-[10px] md:text-[11px] font-bold tracking-[1.5px] uppercase text-[#171717] mb-4 md:mb-6">
            <span
              className="inline-block bg-[#bd4b25] w-[26px] h-[2px] mr-2 align-middle flex-shrink-0"
              aria-hidden="true"
            ></span>
            RESTAURANT CONSULTING · BRAND REPUTATION MANAGEMENT · TECHNOLOGY
          </p> */}

          <h1
            id="hero-title"
            className="text-[33px] sm:text-[52px] md:text-[60px] lg:text-[60px] font-medium leading-[1.05] tracking-[-2.4px] sm:tracking-[-3px] lg:tracking-[-3.6px] text-[#171717] mb-5 md:mb-7"
          >
            Restaurant consulting
            <br />
            <em className="font-serif italic font-normal text-[#bd4b25]">
              for better business.
            </em>
          </h1>

          <p className="text-[17px] md:text-[18px] leading-[1.65] text-[#626262] max-w-[460px] mb-7 md:mb-8">
            Building better food businesses. From your first idea to your next
            outlet, we help restaurants, cafés, QSRs and cloud kitchens launch well, run smarter and grow with confidence.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {/* CTA Pair */}
            <div className="flex items-stretch gap-3">
              <a
                href="https://calendar.app.google/6CYe7jkU9xueMhve9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-5 px-[21px] py-[15px] text-[14px] font-semibold bg-[#171717] text-white hover:bg-[#bd4b25] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Book a free call</span>
                <span aria-hidden="true" className="text-base font-normal">
                  ↗
                </span>
              </a>

              <a
                href="https://wa.me/+919999999999?text=Hi%2C%20I%20visited%20the%20Restavision%20website%20and%20would%20like%20to%20discuss%20restaurant%20consulting."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-[12px_14px] bg-white text-[#171717] border border-[#171717] hover:bg-[#eaf9f0] hover:border-[#25d366] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                aria-label="Chat on WhatsApp (opens in a new tab)"
                title="Chat on WhatsApp"
              >
                <img
                  src="/whatsapp.svg"
                  width={22}
                  height={22}
                  alt="WhatsApp"
                  className="w-[22px] h-[22px] block"
                  decoding="async"
                />
              </a>
            </div>

            {/* Explore Services Link */}
            <Link
              href="#services"
              className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[#171717] hover:text-[#bd4b25] transition-colors"
            >
              <span>Explore our services</span>
              <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Carousel */}
        <div className="w-full">
          <div
            className="relative w-full lg:w-[112%] lg:-ml-[6%] aspect-[16/9] overflow-hidden bg-[#242424] shadow-sm select-none"
            aria-label="Restavision capabilities"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onPointerDown={() => setHasInteracted(true)}
          >
            <div className="absolute inset-0 w-full h-full m-0">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <figure
                    key={slide.src}
                    className={`absolute inset-0 m-0 w-full h-full transition-opacity duration-500 ease-in-out ${isActive
                      ? "opacity-100 visible z-10"
                      : "opacity-0 invisible z-0"
                      }`}
                    aria-hidden={!isActive}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      width={836}
                      height={470}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover block"
                    />
                  </figure>
                );
              })}
            </div>

            {/* Carousel Dots Pill */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-4 z-20 flex gap-2 px-2.5 py-1.5 bg-[#171717]/45 rounded-full backdrop-blur-xs"
              role="tablist"
              aria-label="Choose a capability slide"
            >
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={slide.title}
                    onClick={() => goToSlide(index)}
                    className={`w-[7px] h-[7px] rounded-full border border-white cursor-pointer transition-all duration-200 p-0 ${isActive
                      ? "bg-white scale-110"
                      : "bg-transparent opacity-85 hover:opacity-100"
                      }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
