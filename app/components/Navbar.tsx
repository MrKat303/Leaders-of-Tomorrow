"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { label: "Programa", href: "#programa" },
  { label: "Mentores", href: "#mentores" },
  { label: "Testimonios", href: "#testimonios" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── Scroll animation for the floating bar ──
    gsap.to(headerRef.current, {
      paddingTop: "0.5rem",
      duration: 0.4,
      scrollTrigger: {
        start: 20,
        toggleActions: "play none none reverse",
      }
    });

    ScrollTrigger.create({
      start: () => (typeof window !== "undefined" ? window.innerHeight - 80 : 800),
      onEnter: () => container.current?.classList.add("scrolled"),
      onLeaveBack: () => container.current?.classList.remove("scrolled"),
    });
  }, { scope: container });

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
          backgroundColor: "#F9F4E1",
          borderRadius: "20px",
          padding: "0 1.5rem",
          height: "64px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
          transition: "background-color 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease",
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
                fontWeight: 600,
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
            src="/Leaders Of Tomorrow Lab (1).svg"
            alt="Leaders of Tomorrow"
            width={240}
            height={64}
            priority
            className="logo-default"
            style={{ height: "auto", width: "auto", maxHeight: "56px" }}
          />
          <Image
            src="/Leaders Of Tomorrow Lab.svg"
            alt="Leaders of Tomorrow White"
            width={240}
            height={64}
            priority
            className="logo-scrolled"
            style={{ height: "auto", width: "auto", maxHeight: "56px" }}
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
            href="#faq"
            className="nav-link desktop-nav"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              textDecoration: "none",
            }}
          >
            FAQ
          </a>

          <a
            href="#apply"
            className="desktop-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-orange)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.85rem",
              padding: "0.6rem 1.4rem",
              borderRadius: "9999px",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              boxShadow: "0 4px 12px rgba(250,103,66,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-orange-dark)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(250,103,66,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-orange)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(250,103,66,0.2)";
            }}
          >
            Aplicar ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

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

      {/* ─── Mobile dropdown ────────────────────────────────────── */}
      {menuOpen && (
        <div
          style={{
            maxWidth: "1140px",
            margin: "0.75rem auto 0",
            backgroundColor: "var(--color-cream)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(26,18,8,0.18)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            animation: "slideIn 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {[...NAV_LINKS, { label: "FAQ", href: "#faq" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="btn-ghost"
              onClick={() => setMenuOpen(false)}
              style={{ justifyContent: "flex-start", fontWeight: 700, fontSize: "1rem", padding: "0.75rem 1rem" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            className="btn-primary"
            style={{ marginTop: "0.75rem", justifyContent: "center", padding: "1rem" }}
            onClick={() => setMenuOpen(false)}
          >
            Aplicar ahora →
          </a>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .desktop-cta  { display: none !important; }
          .hamburger    { display: flex !important; }
        }
        .nav-inner.scrolled {
          background-color: var(--color-orange) !important;
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          transition: background-color 0.4s ease;
        }
        .logo-scrolled {
          display: none !important;
        }
        .nav-inner.scrolled .logo-default {
          display: none !important;
        }
        .nav-inner.scrolled .logo-scrolled {
          display: block !important;
        }
        .nav-link {
          color: var(--color-text);
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: var(--color-orange);
          background: rgba(250, 103, 66, 0.08);
        }
        .nav-inner.scrolled .nav-link {
          color: #ffffff !important;
        }
        .nav-inner.scrolled .nav-link:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          color: #ffffff !important;
        }
        .nav-inner.scrolled .desktop-cta {
          background: #f4ce71 !important;
          color: #1A1208 !important;
        }
        .nav-inner.scrolled .desktop-cta:hover {
          background: #e3b854 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(244, 206, 113, 0.35) !important;
        }
        .nav-inner.scrolled .hamburger span {
          background: #ffffff !important;
        }
      `}</style>
    </header>
  );
}
