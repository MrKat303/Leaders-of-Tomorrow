"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "Programa", href: "/programa" },
  { label: "Mentores", href: "/#mentores" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(solid);
  const [animating, setAnimating] = useState(false);
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const logoRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (solid) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [solid]);

  useGSAP(() => {
    if (solid) return;
    gsap.to(headerRef.current, {
      paddingTop: "0.5rem",
      duration: 0.4,
      scrollTrigger: { start: 20, toggleActions: "play none none reverse" },
    });
  });

  const openMenu = () => {
    if (animating) return;
    setAnimating(true);
    setMenuOpen(true);

    requestAnimationFrame(() => {
      const drawer = drawerRef.current;
      const backdrop = backdropRef.current;
      const links = linksRef.current;
      const logoReveal = logoRevealRef.current;
      if (!drawer || !backdrop) { setAnimating(false); return; }

      gsap.set(drawer, { x: "100%", visibility: "visible" });
      gsap.set(backdrop, { opacity: 0, visibility: "visible" });

      const linkItems = links?.querySelectorAll(".mobile-link-item");
      if (linkItems) gsap.set(linkItems, { opacity: 0, x: 30 });

      // Logo reveal clip: start fully hidden (clipX = 0%)
      if (logoReveal) {
        gsap.set(logoReveal, { clipPath: "inset(0 100% 0 0)" });
      }

      const tl = gsap.timeline({ onComplete: () => setAnimating(false) });

      tl.to(backdrop, { opacity: 1, duration: 0.3, ease: "power2.out" });

      tl.to(drawer, { x: "0%", duration: 0.55, ease: "power4.out" }, "-=0.2");

      // Logo draws itself left to right
      if (logoReveal) {
        tl.to(
          logoReveal,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
          },
          "-=0.25"
        );
      }

      if (linkItems) {
        tl.to(linkItems, {
          opacity: 1, x: 0,
          duration: 0.45, stagger: 0.08, ease: "power3.out",
        }, "-=0.7");
      }
    });
  };

  const closeMenu = () => {
    if (animating) return;
    setAnimating(true);

    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    const links = linksRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setMenuOpen(false);
        setAnimating(false);
        if (drawer) gsap.set(drawer, { visibility: "hidden" });
        if (backdrop) gsap.set(backdrop, { visibility: "hidden" });
      },
    });

    const linkItems = links?.querySelectorAll(".mobile-link-item");
    if (linkItems) {
      tl.to(linkItems, { opacity: 0, x: 20, duration: 0.25, stagger: 0.05, ease: "power2.in" });
    }
    tl.to(drawer, { x: "100%", duration: 0.45, ease: "power4.in" }, "-=0.15");
    tl.to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.3");
  };

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000, padding: "1rem 1.25rem 0", transition: "padding 0.4s ease",
      }}
      className="nav-wrapper"
    >
      <nav
        ref={container}
        className="nav-inner"
        style={{
          maxWidth: "1140px", margin: "0 auto",
          backgroundColor: isScrolled ? "#5a189a" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          border: isScrolled ? "1px solid rgba(138,43,226,0.4)" : "1px solid rgba(255,255,255,0.2)",
          borderRadius: "20px", padding: "0 1.5rem", height: "64px",
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center", gap: "1rem",
          transition: "background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
          boxShadow: isScrolled ? "0 8px 32px rgba(90,24,154,0.4)" : "none",
        }}
      >
        {/* Left nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" style={{
              display: "inline-flex", alignItems: "center",
              fontWeight: 400, fontSize: "0.9rem",
              padding: "0.5rem 1rem", borderRadius: "9999px",
              textDecoration: "none", whiteSpace: "nowrap",
            }}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-spacer" style={{ display: "none" }} />

        <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}>
          <Image src="/logo-white.svg" alt="Leaders of Tomorrow" width={240} height={56} priority
            style={{ height: "48px", width: "auto", maxWidth: "200px", transition: "opacity 0.3s ease" }} />
        </Link>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.75rem" }}>

          {/* Desktop CTA — purple */}
          <Link
            href="/apply"
            className="desktop-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#7b2cbf",
              color: "#fff", fontWeight: 400, fontSize: "0.85rem",
              padding: "0.6rem 1.4rem", borderRadius: "9999px",
              textDecoration: "none", border: "none", cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
              boxShadow: "0 4px 12px rgba(123,44,191,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5a189a";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(123,44,191,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#7b2cbf";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(123,44,191,0.4)";
            }}
          >
            Aplicar ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Hamburger / X — always purple */}
          <button
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="hamburger"
            style={{
              background: "#5A189A",
              border: "none", cursor: "pointer",
              padding: "0.4rem", display: "none",
              alignItems: "center", justifyContent: "center",
              width: "40px", height: "40px", borderRadius: "10px",
              position: "relative", zIndex: 1001,
              transition: "background 0.3s ease",
              boxShadow: "0 2px 8px rgba(90,24,154,0.4)",
            }}
          >
            {/* Hamburger */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{
              position: "absolute",
              transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.68,-0.6,0.32,1.6)",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "rotate(90deg) scale(0.4)" : "rotate(0deg) scale(1)",
            }}>
              <line x1="3" y1="6" x2="19" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="16" x2="19" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {/* X */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{
              position: "absolute",
              transition: "opacity 0.35s ease, transform 0.45s cubic-bezier(0.68,-0.6,0.32,1.6)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.4)",
            }}>
              <line x1="5" y1="5" x2="17" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="5" x2="5" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Backdrop ── */}
      <div
        ref={backdropRef}
        onClick={closeMenu}
        style={{
          position: "fixed", inset: 0, zIndex: 1001,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          opacity: 0,
          visibility: menuOpen ? "visible" : "hidden",
          cursor: "pointer",
        }}
      />

      {/* ── Drawer ── */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          top: 0, right: 0,
          width: "min(340px, 88vw)",
          height: "100dvh",
          background: "linear-gradient(145deg, #5A189A 0%, #3C096C 100%)",
          zIndex: 1002,
          visibility: menuOpen ? "visible" : "hidden",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "-12px 0 60px rgba(60,9,108,0.5)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Top bar with X */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.4rem 1.5rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}>
            Menú
          </span>
          <button
            onClick={closeMenu}
            aria-label="Cerrar menú"
            style={{
              background: "rgba(123,44,191,0.2)",
              border: "1px solid rgba(123,44,191,0.35)",
              borderRadius: "10px",
              width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(123,44,191,0.4)";
              e.currentTarget.style.borderColor = "rgba(199,125,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(123,44,191,0.2)";
              e.currentTarget.style.borderColor = "rgba(123,44,191,0.35)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="2" x2="2" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Logo reveal animation ── */}
        <div style={{
          padding: "1.5rem 1.5rem 0.5rem",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow line that sweeps before the logo reveals */}
          <div style={{
            position: "absolute",
            top: 0, bottom: 0,
            width: "40px",
            background: "linear-gradient(90deg, transparent, rgba(199,125,255,0.25), transparent)",
            pointerEvents: "none",
            zIndex: 2,
          }} />
          {/* The logo with clip-path reveal */}
          <div
            ref={logoRevealRef}
            style={{
              clipPath: "inset(0 100% 0 0)",
              willChange: "clip-path",
            }}
          >
            <Image
              src="/logo-white.svg"
              alt="Leaders of Tomorrow"
              width={260}
              height={70}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "60px",
                objectFit: "contain",
                objectPosition: "left center",
                opacity: 0.9,
                filter: "drop-shadow(0 0 12px rgba(199,125,255,0.3))",
              }}
            />
          </div>
          {/* Thin purple line below logo */}
          <div style={{
            marginTop: "1rem",
            height: "1px",
            background: "linear-gradient(90deg, rgba(123,44,191,0.8), rgba(199,125,255,0.4), transparent)",
          }} />
        </div>

        {/* ── Links ── */}
        <div
          ref={linksRef}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0.5rem 1.5rem 2rem",
            gap: "0.1rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-link-item"
              onClick={closeMenu}
              style={{
                fontFamily: "var(--font-primary)",
                textTransform: "uppercase",
                fontSize: "1.6rem",
                fontWeight: "normal",
                color: "rgba(255,255,255,0.88)",
                textDecoration: "none",
                padding: "0.85rem 1rem",
                borderRadius: "14px",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.25s ease, background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#c77dff";
                e.currentTarget.style.background = "rgba(123,44,191,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.88)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3 }}>
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}

          {/* CTA — purple */}
          <Link
            href="/apply"
            className="mobile-link-item"
            onClick={closeMenu}
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-primary)",
              textTransform: "uppercase",
              fontSize: "0.95rem",
              fontWeight: "normal",
              letterSpacing: "0.08em",
              background: "#7b2cbf",
              color: "#fff",
              padding: "1rem 1.5rem",
              borderRadius: "14px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 6px 24px rgba(123,44,191,0.45)",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#5a189a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#7b2cbf"; }}
          >
            Aplicar ahora
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Footer */}
        <div style={{
          padding: "1rem 1.5rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.05em",
          }}>
            Leaders of Tomorrow · CBA 2026
          </p>
        </div>
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
          background: rgba(255,255,255,0.15);
        }
        .hamburger:hover {
          background: #7b2cbf !important;
        }
      `}</style>
    </header>
  );
}
