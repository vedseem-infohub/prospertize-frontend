"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 bg-white border-b border-[#dededb] transition-all duration-200 ${isScrolled
        ? "h-[66px] shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
        : "h-[76px]"
        }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo without any rounded borders or circles */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Restavision home"
        >
          <img
            id="nav-logo-slot"
            src="/restavision-logo-circle.webp"
            alt="Restavision"
            className={`${isScrolled ? "h-8 md:h-30" : "h-9 md:h-30"
              } w-[170px] object-contain transition-all duration-200`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          id="navigation"
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] lg:text-[14px] font-semibold text-[#171717] whitespace-nowrap"
        >
          <Link
            href="#services"
            className="hover:text-[#bd4b25] transition-colors py-1"
          >
            Our services
          </Link>
          <Link
            href="#consulting"
            className="hover:text-[#bd4b25] transition-colors py-1"
          >
            Restaurant consulting
          </Link>
          <Link
            href="#about"
            className="hover:text-[#bd4b25] transition-colors py-1"
          >
            About us
          </Link>
          <Link
            href="#cities"
            className="hover:text-[#bd4b25] transition-colors py-1"
          >
            Cities we serve
          </Link>
          <Link
            href="#insights"
            className="hover:text-[#bd4b25] transition-colors py-1"
          >
            Insights
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="md:hidden flex items-center gap-2 text-sm font-medium text-[#171717] p-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#bd4b25]"
        >
          <span>Menu</span>
          <span className="text-base" aria-hidden="true">
            {isMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-[#dededb] px-6 py-4 flex flex-col gap-1 text-[15px] font-medium text-[#171717] shadow-lg animate-in slide-in-from-top-2 duration-150"
        >
          <Link
            href="#services"
            onClick={() => setIsMenuOpen(false)}
            className="py-2.5 border-b border-gray-100 hover:text-[#bd4b25]"
          >
            Our services
          </Link>
          <Link
            href="#consulting"
            onClick={() => setIsMenuOpen(false)}
            className="py-2.5 border-b border-gray-100 hover:text-[#bd4b25]"
          >
            Restaurant consulting
          </Link>
          <Link
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="py-2.5 border-b border-gray-100 hover:text-[#bd4b25]"
          >
            About us
          </Link>
          <a
            href="https://checks.restavision.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="py-2.5 border-b border-gray-100 hover:text-[#bd4b25]"
          >
            Restavision Checks
          </a>
          <Link
            href="#cities"
            onClick={() => setIsMenuOpen(false)}
            className="py-2.5 border-b border-gray-100 hover:text-[#bd4b25]"
          >
            Cities we serve
          </Link>
          <Link
            href="#insights"
            onClick={() => setIsMenuOpen(false)}
            className="py-2.5 hover:text-[#bd4b25]"
          >
            Insights
          </Link>
        </div>
      )}
    </header>
  );
}
