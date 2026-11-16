"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const milestones = [
    {
        year: "2008",
        step: "01 / 10",
        statNum: "01",
        statLabel: "Founding mandate",
        title: "The practice is founded",
        desc: "RESTO Consultancy opens with a single conviction — that hospitality in India fails on operations far more often than it fails on food. The first mandates are turnaround briefs.",
        category: "Foundation",
    },
    {
        year: "2009",
        step: "02 / 10",
        statNum: "12",
        statLabel: "Kitchens planned",
        title: "Kitchen planning becomes a discipline",
        desc: "A dedicated kitchen design practice is formed after repeated evidence that layout, not staffing, was capping throughput across client sites.",
        category: "Infrastructure",
    },
    {
        year: "2010",
        step: "02 / 10",
        statNum: "12",
        statLabel: "Kitchens planned",
        title: "Kitchen planning becomes a discipline",
        desc: "A dedicated kitchen design practice is formed after repeated evidence that layout, not staffing, was capping throughput across client sites.",
        category: "Infrastructure",
    },
    {
        year: "2011",
        step: "02 / 10",
        statNum: "12",
        statLabel: "Kitchens planned",
        title: "Kitchen planning becomes a discipline",
        desc: "A dedicated kitchen design practice is formed after repeated evidence that layout, not staffing, was capping throughput across client sites.",
        category: "Infrastructure",
    },
    {
        year: "2012",
        step: "02 / 10",
        statNum: "12",
        statLabel: "Kitchens planned",
        title: "Kitchen planning becomes a discipline",
        desc: "A dedicated kitchen design practice is formed after repeated evidence that layout, not staffing, was capping throughput across client sites.",
        category: "Infrastructure",
    },
    {
        year: "2013",
        step: "02 / 10",
        statNum: "12",
        statLabel: "Kitchens planned",
        title: "Kitchen planning becomes a discipline",
        desc: "A dedicated kitchen design practice is formed after repeated evidence that layout, not staffing, was capping throughput across client sites.",
        category: "Infrastructure",
    },
    {
        year: "2014",
        step: "02 / 10",
        statNum: "12",
        statLabel: "Kitchens planned",
        title: "Kitchen planning becomes a discipline",
        desc: "A dedicated kitchen design practice is formed after repeated evidence that layout, not staffing, was capping throughput across client sites.",
        category: "Infrastructure",
    },
    {
        year: "2015",
        step: "03 / 10",
        statNum: "04",
        statLabel: "Outlets replicated",
        title: "First multi-outlet mandate",
        desc: "The firm takes its first replication brief — building the playbook that lets a proven single unit be rebuilt without losing its economics.",
        category: "Scale",
    },
    {
        year: "2016",
        step: "04 / 10",
        statNum: "01",
        statLabel: "Of fourteen",
        title: "The Suto Café partnership begins",
        desc: "A relationship that would run across fourteen separate projects starts with a single café format brief — concept, kitchen, menu and operating standard.",
        category: "Partnership",
    },
    {
        year: "2018",
        step: "05 / 10",
        statNum: "09",
        statLabel: "Properties advised",
        title: "Hotel & resort F&B division",
        desc: "The practice extends into hotel food and beverage, restructuring outlet mix and banqueting operations for resort properties.",
        category: "Advisory",
    },
    {
        year: "2019",
        step: "06 / 10",
        statNum: "11",
        statLabel: "Cities served",
        title: "Pan-India operations",
        desc: "Project teams begin operating across regions, taking mandates well beyond the home market and standardising delivery across geographies.",
        category: "National",
    },
    {
        year: "2022",
        step: "07 / 10",
        statNum: "18",
        statLabel: "Virtual brands",
        title: "Cloud kitchen practice",
        desc: "A delivery-native advisory line is launched — multi-brand kitchens, aggregator economics and packaging cost models built for post-pandemic demand.",
        category: "Digital",
    },
    {
        year: "2023",
        step: "08 / 10",
        statNum: "06",
        statLabel: "Brands packaged",
        title: "Franchise & licensing",
        desc: "Client brands are packaged into franchisable assets: manuals, territory models, unit-economics packs and the audit regime that holds standards.",
        category: "Franchising",
    },
    {
        year: "2024",
        step: "09 / 10",
        statNum: "100+",
        statLabel: "Projects delivered",
        title: "One hundred projects",
        desc: "The firm crosses one hundred completed mandates across restaurants, cafés, hotels, resorts, bars and cloud kitchens.",
        category: "Milestone",
    },
    {
        year: "2026",
        step: "10 / 10",
        statNum: "15",
        statLabel: "Years in practice",
        title: "The next decade",
        desc: "The practice moves toward institutional advisory — capital planning, portfolio governance and multi-unit expansion for hospitality groups.",
        category: "Vision",
    },
];

export default function Trajectory() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const totalCards = milestones.length + 1; // 10 milestone cards + 1 final next-decade card

    // Update horizontal track position and progress on vertical scroll
    const handleScroll = useCallback(() => {
        if (!containerRef.current || !trackRef.current) return;

        const container = containerRef.current;
        const track = trackRef.current;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = container.offsetHeight - windowHeight;

        if (totalScrollable <= 0) return;

        // How much has been scrolled into this container
        const scrolled = -rect.top;
        const clamped = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

        // Max horizontal scroll needed so the last card aligns comfortably on the right
        const maxHorizontalScroll = Math.max(
            track.scrollWidth - window.innerWidth + 96,
            0
        );
        const targetX = clamped * maxHorizontalScroll;

        track.style.transform = `translate3d(-${targetX}px, 0, 0)`;
        setProgress(clamped);

        // Active card calculation
        const computedIndex = Math.min(
            Math.floor(clamped * totalCards),
            totalCards - 1
        );
        setActiveIndex(computedIndex);
    }, [totalCards]);

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

    // Direct vertical jump to a specific card's progress position
    const scrollToCard = (index) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const currentScrollY = window.scrollY;
        const containerTopInDoc = currentScrollY + rect.top;
        const totalScrollable = container.offsetHeight - window.innerHeight;

        const targetFraction = index / (totalCards - 1);
        const targetScrollY = containerTopInDoc + targetFraction * totalScrollable;

        window.scrollTo({
            top: targetScrollY,
            behavior: "smooth",
        });
    };

    const handlePrev = () => {
        if (activeIndex > 0) scrollToCard(activeIndex - 1);
    };

    const handleNext = () => {
        if (activeIndex < totalCards - 1) scrollToCard(activeIndex + 1);
    };

    return (
        <section
            id="trajectory"
            ref={containerRef}
            className="relative bg-[#fafaf8] border-t border-[#dededb] h-[360vh] md:h-[420vh]"
            aria-labelledby="trajectory-heading"
        >
            {/* Sticky Viewport that pins during vertical scroll */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-6 md:py-8 lg:py-10">
                {/* Top Header Row */}
                <div className="max-w-[1360px] w-full mx-auto justify-between px-6 md:px-8 lg:px-12 flex">
                    <div className="flex flex-col  gap-4 md:gap-8 pb-5 border-b border-[#dededb]">
                        <div>

                            <h2
                                id="trajectory-heading"
                                className="text-[28px] sm:text-[36px] md:text-[44px] font-medium leading-[1.08] tracking-[-1.6px] sm:tracking-[-2.2px] flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[#171717]"
                            >
                                <span>Eighteen years</span>{" "}
                                <em className="font-serif italic font-normal text-[#bd4b25]">
                                    <span>of experience.</span>
                                </em>
                            </h2>
                        </div>

                        <div className=" ">
                            <p className="hidden lg:block text-[13px] md:text-[14px] leading-relaxed text-[#626262] max-w-[440px]">
                                Every capability this practice offers was added because a
                                client project demanded it. This is the order it happened in.
                            </p>

                            {/* Progress Count & Arrow Controls */}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">


                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                aria-label="Previous milestone"
                                className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-[#dededb] text-[#171717] hover:border-[#171717] hover:bg-[#171717] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer text-sm"
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={activeIndex === totalCards - 1}
                                aria-label="Next milestone"
                                className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-[#dededb] text-[#171717] hover:border-[#171717] hover:bg-[#171717] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer text-sm"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle: Horizontal Cards Track with Central Progress Rail */}
                <div className="relative md:mt-5 overflow-visible">
                    {/* THE PROGRESS RAIL (matching restoconsultancy.com top line animation) */}
                    <div className="pointer-events-none absolute inset-x-0 top-[6.75rem] md:top-[7.75rem] hidden md:block h-[2px] z-0">
                        {/* Base line track */}
                        <span className="absolute inset-0 bg-[#dededb]" />
                        {/* Active glowing progress fill line scaling from left */}
                        <span
                            className="absolute inset-0 origin-left bg-gradient-to-r from-[#bd4b25] via-[#d58c1e] to-[#bd4b25] shadow-[0_0_18px_2px_rgba(189,75,37,0.55)] transition-transform duration-75 ease-out"
                            style={{ transform: `scaleX(${progress})` }}
                        />
                    </div>

                    {/* Horizontally scrolling track of cards */}
                    <div
                        ref={trackRef}
                        className="flex items-start gap-6 sm:gap-7 md:gap-8 pl-6 sm:pl-8 md:pl-12 pr-16 will-change-transform select-none relative z-10"
                        style={{ transform: "translate3d(0, 0, 0)" }}
                    >
                        {milestones.map((m, idx) => {
                            const cardFraction = idx / (totalCards - 1);
                            const isPassed = progress >= cardFraction - 0.02;
                            const isCurrent = activeIndex === idx;

                            return (
                                <article
                                    key={m.year}
                                    onClick={() => scrollToCard(idx)}
                                    className="w-[280px] sm:w-[320px] md:w-[23rem] shrink-0 group relative cursor-pointer"
                                >
                                    {/* Top section: Year above the rail WITH GENEROUS BREATHING GAP */}
                                    <div className="flex items-end pb-4 md:pb-6 h-[6.75rem] md:h-[7.75rem]">
                                        <div
                                            className={`text-[clamp(2.75rem,5.2vw,4.5rem)] font-medium leading-none tabular-nums tracking-tight transition-colors duration-500 ${isCurrent
                                                ? "text-[#bd4b25]"
                                                : isPassed
                                                    ? "text-[#171717]"
                                                    : "text-[#8a8a86] group-hover:text-[#171717]"
                                                }`}
                                        >
                                            {m.year}
                                        </div>
                                    </div>

                                    {/* Milestone Node Dot directly on the rail */}
                                    <div className="relative hidden md:block h-[2px]">
                                        <span
                                            className={`absolute -top-[3px] left-0 size-[8px] rounded-full transition-all duration-300 ${isPassed
                                                ? "bg-[#bd4b25] shadow-[0_0_12px_2px_rgba(189,75,37,0.6)]"
                                                : "bg-[#dededb]"
                                                }`}
                                        />
                                        {isCurrent && (
                                            <span className="absolute -top-[3px] left-0 size-[8px] rounded-full bg-[#bd4b25]/60 animate-ping" />
                                        )}
                                    </div>

                                    {/* Milestone Card below the rail */}
                                    <div
                                        className={`mt-6 md:mt-8 rounded-lg p-6 md:p-7 min-h-[15.5rem] flex flex-col justify-between transition-all duration-500 shadow-xs hover:shadow-md ${isCurrent
                                            ? "bg-white border-2 border-[#bd4b25] ring-2 ring-[#bd4b25]/15 -translate-y-1"
                                            : "bg-white border border-[#dededb] hover:border-[#171717] hover:-translate-y-1"
                                            }`}
                                    >
                                        <div>
                                            {/* Step index & Stat badge */}
                                            <div className="flex items-baseline justify-between gap-4">
                                                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#bd4b25]">
                                                    {m.step}
                                                </span>

                                                <span className="text-right">
                                                    <span className="block text-[20px] font-medium leading-none tabular-nums text-[#d58c1e]">
                                                        {m.statNum}
                                                    </span>
                                                    <span className="block text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#8a8a86] mt-1">
                                                        {m.statLabel}
                                                    </span>
                                                </span>
                                            </div>

                                            {/* Card Title */}
                                            <h3 className="mt-4 text-[18px] sm:text-[20px] font-medium text-[#171717] leading-snug">
                                                {m.title}
                                            </h3>

                                            {/* Card Narrative */}
                                            <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-relaxed text-[#626262]">
                                                {m.desc}
                                            </p>
                                        </div>

                                        {/* Card Footer Tag */}
                                        <div className="pt-4 mt-4 border-t border-[#f0f0ed] flex items-center justify-between text-[11px] text-[#8a8a86]">
                                            <span className="font-medium uppercase tracking-wider">
                                                Phase · {m.category}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="text-xs group-hover:text-[#bd4b25] group-hover:translate-x-1 transition-all"
                                            >
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}

                        {/* Final 11th Card: The Next Decade (Future) */}
                        <article
                            onClick={() => scrollToCard(totalCards - 1)}
                            className="w-[280px] sm:w-[320px] md:w-[23rem] shrink-0 group relative cursor-pointer"
                        >
                            {/* Year above rail with matching gap */}
                            <div className="flex items-end pb-4 md:pb-6 h-[6.75rem] md:h-[7.75rem]">
                                <div
                                    className={`text-[clamp(2.75rem,5.2vw,4.5rem)] font-medium leading-none tabular-nums tracking-tight transition-colors duration-500 ${activeIndex === totalCards - 1
                                        ? "text-[#bd4b25]"
                                        : "text-[#171717]"
                                        }`}
                                >
                                    2026+
                                </div>
                            </div>

                            <div className="relative hidden md:block h-[2px]">
                                <span
                                    className={`absolute -top-[3px] left-0 size-[8px] rounded-full transition-all duration-300 ${progress >= 0.96
                                        ? "bg-[#bd4b25] shadow-[0_0_12px_2px_rgba(189,75,37,0.6)]"
                                        : "bg-[#dededb]"
                                        }`}
                                />
                            </div>

                            <div className="mt-6 md:mt-8 rounded-lg p-6 md:p-7 min-h-[15.5rem] bg-[#171717] text-white border border-[#171717] flex flex-col justify-between shadow-md hover:-translate-y-1 transition-all duration-500">
                                <div>
                                    <div className="flex items-baseline justify-between gap-4">
                                        <span className="text-[11px] font-mono font-semibold tracking-wider text-[#bd4b25]">
                                            11 / 11
                                        </span>
                                        <span className="text-right">
                                            <span className="block text-[20px] font-medium leading-none text-[#bd4b25]">
                                                Future
                                            </span>
                                            <span className="block text-[10px] uppercase tracking-wider text-white/50 mt-1">
                                                The Next Decade
                                            </span>
                                        </span>
                                    </div>

                                    <h3 className="mt-4 text-[19px] sm:text-[21px] font-medium text-white leading-snug">
                                        Build your next chapter
                                    </h3>

                                    <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-relaxed text-[#a3a3a3]">
                                        From concept feasibility to multi-city rollout and franchise
                                        scaling, let&apos;s build a profitable, repeatable food business.
                                    </p>
                                </div>

                                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                                    <a
                                        href="https://calendly.com/vedseem-contact/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-white hover:text-[#bd4b25] transition-colors"
                                    >
                                        <span>Book a discovery call</span>
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                    <span className="text-white/40 text-xs font-mono">Next →</span>
                                </div>
                            </div>
                        </article >

                        {/* Ending spacer so last card clears viewport nicely */}
                        <div className="hidden w-[16vw] shrink-0 md:block" />
                    </div >
                </div >
            </div >
        </section >
    );
}
