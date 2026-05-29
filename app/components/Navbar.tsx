"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "Programa", href: "/#programa" },
  { label: "Mentores", href: "/#mentores" },
  { label: "Testimonios", href: "/#testimonios" },
];

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(solid);
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Detect scroll past the hero (100vh) with native scroll event
  useEffect(() => {
    if (solid) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [solid]);

  useGSAP(() => {
    if (solid) return;
    // Shrink padding on scroll
    gsap.to(headerRef.current, {
      paddingTop: "0.5rem",
      duration: 0.4,
      scrollTrigger: {
        start: 20,
        toggleActions: "play none none reverse",
      }
    });
  });

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "1rem 1.25rem 0",
        transition: "padding 0.4s ease",
      }}
      className="nav-wrapper"
    >
      <nav
        ref={container}
        className="nav-inner"
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          backgroundColor: isScrolled ? "#5a189a" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: isScrolled ? "1px solid rgba(138, 43, 226, 0.4)" : "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "20px",
          padding: "0 1.5rem",
          height: "64px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
          transition: "background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
          boxShadow: isScrolled ? "0 8px 32px rgba(90, 24, 154, 0.4)" : "none",
        }}
      >
        {/* ─── Left: Nav links ──────────────────────────────────── */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontWeight: 400,
                fontSize: "0.9rem",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Mobile Spacer to keep Logo centered */}
        <div className="mobile-spacer" style={{ display: "none" }}></div>

        {/* ─── Center: Logo ─────────────────────────────────────── */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Image
            src="/logo-white.svg"
            alt="Leaders of Tomorrow"
            width={240}
            height={64}
            priority
            style={{ height: "auto", width: "auto", maxHeight: "56px", transition: "opacity 0.3s ease" }}
          />
        </Link>

        {/* ─── Right: Actions ───────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.75rem",
          }}
        >
          <a
            href="/#faq"
            className="nav-link desktop-nav"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontWeight: 400,
              fontSize: "0.9rem",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              textDecoration: "none",
            }}
          >
            FAQ
          </a>

          <Link
            href="/apply"
            className="desktop-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: isScrolled ? "#e91e8c" : "#5A189A",
              color: "#fff",
              fontWeight: 400,
              fontSize: "0.85rem",
              padding: "0.6rem 1.4rem",
              borderRadius: "9999px",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              boxShadow: isScrolled ? "0 4px 12px rgba(233, 30, 140, 0.35)" : "0 4px 12px rgba(90, 24, 154, 0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isScrolled ? "#c2185b" : "#3c096c";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = isScrolled ? "0 8px 24px rgba(233, 30, 140, 0.5)" : "0 8px 24px rgba(90, 24, 154, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isScrolled ? "#e91e8c" : "#5A189A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = isScrolled ? "0 4px 12px rgba(233, 30, 140, 0.35)" : "0 4px 12px rgba(90, 24, 154, 0.35)";
            }}
          >
            Aplicar ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="hamburger"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "none",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2.5px",
                  background: "var(--color-text)",
                  borderRadius: "4px",
                  transition: "transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6), opacity 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(6px, 6px)" : i === 2 ? "rotate(-45deg) translate(6px, -6px)" : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Full-screen Menu ────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "linear-gradient(180deg, #3c096c 0%, #5a189a 40%, #7b2cbf 100%)",
          zIndex: 998,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          transition: "opacity 0.4s ease, visibility 0.4s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transform: menuOpen ? "scale(1)" : "scale(1.05)",
        }}
      >
        {[...NAV_LINKS, { label: "FAQ", href: "/#faq" }].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-primary)",
              textTransform: "uppercase",
              fontSize: "2rem",
              fontWeight: "normal",
              color: "#ffffff",
              textDecoration: "none",
              padding: "0.75rem 2rem",
              borderRadius: "12px",
              transition: "background 0.3s ease, transform 0.3s ease",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {link.label}
          </a>
        ))}
        <Link
          href="/apply"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "2rem",
            fontFamily: "var(--font-primary)",
            textTransform: "uppercase",
            fontSize: "1.1rem",
            fontWeight: "normal",
            letterSpacing: "0.05em",
            background: "#e91e8c",
            color: "#fff",
            padding: "1rem 2.5rem",
            borderRadius: "9999px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 8px 30px rgba(233, 30, 140, 0.4)",
          }}
        >
          Aplicar ahora
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .desktop-cta  { display: none !important; }
          .hamburger    { display: flex !important; }
          .mobile-spacer { display: block !important; }
        }
        .nav-link {
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: #c77dff;
          background: rgba(255, 255, 255, 0.15);
        }
        .hamburger span {
          background: #ffffff !important;
        }
      `}</style>
    </header>
  );
}
