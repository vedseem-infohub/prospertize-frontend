"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const stages = [
  {
    n: "01",
    title: "Discover",
    body: "Market, site, competition and capital. We establish what is actually possible before anyone commits a rupee to design.",
    outputs: ["Market study", "Site assessment", "Feasibility model"],
  },
  {
    n: "02",
    title: "Strategy",
    body: "Format, positioning, price point and target economics — the four decisions that constrain every decision after them.",
    outputs: ["Positioning", "Target P&L", "Investment plan"],
  },
  {
    n: "03",
    title: "Planning",
    body: "The critical path. Licences, capex schedule, vendor map and a dated sequence from handover to opening.",
    outputs: ["Critical path", "Capex schedule", "Licence map"],
  },
  {
    n: "04",
    title: "Kitchen Design",
    body: "Zoning, equipment, utilities and ventilation planned around peak-hour output and statutory hygiene requirements.",
    outputs: ["Layout drawings", "Equipment spec", "Utility loads"],
  },
  {
    n: "05",
    title: "Recruitment",
    body: "An org chart derived from the operating model, then filled — screened against the standard the format requires.",
    outputs: ["Org design", "Hiring pipeline", "Labour model"],
  },
  {
    n: "06",
    title: "Training",
    body: "Kitchen skills, service standards and management discipline taught on your floor, then handed to your trainers.",
    outputs: ["SOP manuals", "Skill modules", "Assessments"],
  },
  {
    n: "07",
    title: "Launch",
    body: "Trial runs, soft launch, correction, then full opening — with the operating rhythm already rehearsed under load.",
    outputs: ["Trial protocol", "Soft launch", "Go-live audit"],
  },
  {
    n: "08",
    title: "Growth",
    body: "Post-opening review against the target P&L, then the replication playbook for the next unit.",
    outputs: ["Performance review", "Replication playbook", "Expansion plan"],
  },
];

export default function EightStages() {
  const [activeStep, setActiveStep] = useState(0);
  const [lineScale, setLineScale] = useState(0);

  const containerRef = useRef(null);
  const stepsListRef = useRef(null);
  const stepItemRefs = useRef([]);

  // Track scroll position to synchronize active stage and vertical line fill
  const handleScroll = useCallback(() => {
    if (!stepsListRef.current) return;

    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const isAtBottom = windowHeight + scrollY >= docHeight - 30;

    // Trigger threshold for active step: 60% of viewport height
    const triggerY = windowHeight * 0.60;

    // 1. Calculate active step
    let currentStep = 0;
    if (isAtBottom) {
      currentStep = stages.length - 1; // Ensure Growth (Stage 08) activates when scrolled to bottom
    } else {
      stepItemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          currentStep = idx;
        }
      });
    }
    setActiveStep(currentStep);

    // 2. Calculate vertical progress line fill:
    // Accurately maps from center of first step (Discover) to last step (Growth)
    const firstEl = stepItemRefs.current[0];
    const lastEl = stepItemRefs.current[stages.length - 1];

    if (firstEl && lastEl) {
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();

      const startTrigger = windowHeight * 0.65;
      const endTrigger = windowHeight * 0.65;

      const totalDistance = lastRect.top - firstRect.top;
      const scrolled = startTrigger - firstRect.top;

      if (isAtBottom || lastRect.top <= endTrigger) {
        setLineScale(1);
      } else if (totalDistance > 0) {
        const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);
        setLineScale(progress);
      }
    }
  }, []);

  useEffect(() => {
    let animId = null;
    const onScroll = () => {
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [handleScroll]);

  // Click on any step smoothly scrolls that step into view
  const scrollToStep = (index) => {
    const el = stepItemRefs.current[index];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setActiveStep(index);
    }
  };

  const currentStage = stages[activeStep];

  return (
    <section
      id="engagement-model"
      ref={containerRef}
      className="bg-white border-t border-[#dededb] pt-6 sm:pt-8 md:pt-12 pb-20 md:pb-32"
      aria-labelledby="stages-heading"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 md:mb-8">
          <p className="flex items-center text-[10px] md:text-[11px] font-bold tracking-[1.5px] uppercase text-[#171717] mb-3">
            <span
              className="inline-block bg-[#bd4b25] w-[20px] h-[2px] mr-2 align-middle flex-shrink-0"
              aria-hidden="true"
            ></span>
            05 · ENGAGEMENT MODEL
          </p>

          <h2
            id="stages-heading"
            className="text-[32px] sm:text-[42px] md:text-[52px] font-medium leading-[1.08] tracking-[-1.8px] sm:tracking-[-2.6px] text-[#171717] mb-4"
          >
            Eight stages,{" "}
            <em className="font-serif italic font-normal text-[#bd4b25]">
              start to scale.
            </em>
          </h2>

          <p className="text-[15px] md:text-[16px] leading-[1.65] text-[#626262] max-w-[620px]">
            A mandate moves through the same sequence every time. Nothing is
            skipped and nothing runs in parallel that shouldn&apos;t.
          </p>
        </div>

        {/* Two-Column Layout: Sticky Stage Card (Left) & Interactive Steps (Right) */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-start">
          {/* Left Column: Pinned Sticky Stage Card */}
          <div className="lg:sticky lg:top-[100px] lg:h-fit">
            <div className="bg-[#fafaf8] border border-[#dededb] rounded-xl p-7 sm:p-10 shadow-sm relative overflow-hidden transition-all duration-300">
              {/* Header: Stage Number & Counter */}
              <div className="flex items-start justify-between">
                <span
                  key={`num-${currentStage.n}`}
                  className="font-medium text-[clamp(3.5rem,7vw,5.5rem)] leading-none text-[#bd4b25] tracking-tight tabular-nums block animate-fade-rise"
                >
                  {currentStage.n}
                </span>

                <span className="text-[12px] font-mono font-semibold tracking-wider text-[#8a8a86] bg-white border border-[#dededb] px-3 py-1 rounded-md">
                  Stage {activeStep + 1} / {stages.length}
                </span>
              </div>

              {/* Stage Title */}
              <h3
                key={`title-${currentStage.n}`}
                className="text-[24px] sm:text-[28px] font-medium text-[#171717] mt-6 mb-3 leading-snug animate-fade-rise"
              >
                {currentStage.title}
              </h3>

              {/* Stage Body Narrative */}
              <p
                key={`body-${currentStage.n}`}
                className="text-[14px] sm:text-[15px] leading-[1.7] text-[#626262] animate-fade-rise"
              >
                {currentStage.body}
              </p>

              {/* Terracotta Divider Rule */}
              <div className="h-[2px] bg-gradient-to-r from-[#bd4b25] to-[#d58c1e] my-7 w-12 rounded-full" />

              {/* Deliverable Outputs Title & Badges */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#bd4b25] mb-3">
                  Outputs
                </p>

                <ul
                  key={`outputs-${currentStage.n}`}
                  className="flex flex-wrap gap-2 animate-fade-rise"
                >
                  {currentStage.outputs.map((out) => (
                    <li
                      key={out}
                      className="px-3.5 py-1.5 rounded-full border border-[#dededb] bg-white text-[12px] font-medium text-[#171717] shadow-2xs"
                    >
                      {out}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Vertical Steps Timeline */}
          <div ref={stepsListRef} className="relative">
            {/* The Vertical Continuous Progress Line */}
            <div className="absolute top-[36px] bottom-[36px] left-[13px] w-[2px] bg-[#dededb]">
              <span
                className="absolute inset-0 block origin-top bg-gradient-to-b from-[#bd4b25] via-[#d58c1e] to-[#bd4b25] shadow-[0_0_14px_1px_rgba(189,75,37,0.45)] transition-transform duration-75 ease-out rounded-full"
                style={{ transform: `scaleY(${lineScale})` }}
              />
            </div>

            {/* List of 8 Steps */}
            <ol className="space-y-2">
              {stages.map((stage, idx) => {
                const isCurrent = activeStep === idx;
                const isPassed = activeStep >= idx;

                return (
                  <li
                    key={stage.n}
                    ref={(el) => (stepItemRefs.current[idx] = el)}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToStep(idx)}
                      className="group flex w-full items-start gap-6 py-5 sm:py-6 text-left cursor-pointer transition-all duration-300"
                    >
                      {/* Milestone Node Circle on the line */}
                      <span
                        className={`relative mt-1 flex size-[27px] shrink-0 items-center justify-center rounded-full border bg-white transition-all duration-500 ${isCurrent
                          ? "border-[#bd4b25] shadow-[0_0_20px_2px_rgba(189,75,37,0.45)] ring-4 ring-[#bd4b25]/15"
                          : isPassed
                            ? "border-[#bd4b25]"
                            : "border-[#dededb] group-hover:border-[#171717]"
                          }`}
                      >
                        <span
                          className={`size-[8px] rounded-full transition-all duration-500 ${isCurrent
                            ? "scale-100 bg-[#bd4b25]"
                            : isPassed
                              ? "scale-75 bg-[#bd4b25]"
                              : "scale-0 bg-[#bd4b25]/60 group-hover:scale-75"
                            }`}
                        />
                      </span>

                      {/* Step Text Information */}
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-3">
                          <span
                            className={`text-[12px] font-mono font-semibold tracking-wider tabular-nums transition-colors duration-300 ${isCurrent
                              ? "text-[#bd4b25]"
                              : isPassed
                                ? "text-[#171717]"
                                : "text-[#8a8a86]"
                              }`}
                          >
                            {stage.n}
                          </span>

                          <span
                            className={`text-[20px] sm:text-[24px] font-medium leading-tight transition-colors duration-300 ${isCurrent
                              ? "text-[#171717]"
                              : "text-[#171717]/40 group-hover:text-[#171717]/80"
                              }`}
                          >
                            {stage.title}
                          </span>
                        </span>

                        <span
                          className={`mt-2 block max-w-[500px] text-[13.5px] sm:text-[14px] leading-relaxed transition-all duration-500 ${isCurrent
                            ? "text-[#626262] opacity-100 font-normal"
                            : "text-[#8a8a86] opacity-60 group-hover:opacity-90"
                            }`}
                        >
                          {stage.body}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
