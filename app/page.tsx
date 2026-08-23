"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const c = {
  orange: "#e0aaff",
  orangeDark: "#c77dff",
  orangeLight: "rgba(224, 170, 255, 0.25)",
  orangePale: "rgba(224, 170, 255, 0.15)",
  cream: "transparent",
  dark: "#ffffff",
  muted: "rgba(255, 255, 255, 0.75)",
  white: "#ffffff",
  forest: "#e0aaff",
  lime: "#e0aaff",
  purple: "#e0aaff",
  glassBg: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassHover: "rgba(255, 255, 255, 0.15)",
  bgLight: "transparent",
};

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "¿Qué es Leaders of Tomorrow?", a: "Es un bootcamp intensivo de innovación, emprendimiento y tecnología de 5 días, creado por CBA BOARD y coproducido por HiveYoung. Está diseñado para preparar a la próxima generación de builders, founders y agentes de cambio con herramientas reales del ecosistema emprendedor." },
    { q: "¿Cuándo y dónde se realiza?", a: "El bootcamp se realiza del 14 al 18 de diciembre, presencialmente en la Universidad de los Andes, Santiago, Chile." },
    { q: "¿Cuántas horas tiene el programa?", a: "Entre 42 y 45 horas de estudio e inmersión durante la semana. El programa corre desde las 9:00 AM hasta la tarde, con módulos, workshops, labs vespertinos y checkpoints a lo largo de cada día." },
    { q: "¿Cuánto cuesta?", a: "La matrícula es de $60.000 CLP. Este valor cubre el almuerzo diario durante los 5 días del bootcamp y el certificado de participación. El programa es sin fines de lucro." },
    { q: "¿A quién está dirigido?", a: "A estudiantes de enseñanza media (14 a 18 años) apasionados por el liderazgo, el emprendimiento y la tecnología. No se necesita experiencia previa en programación ni en negocios. Basta con tener motivación, curiosidad y ganas de construir algo real." },
  ];

  useGSAP((context, contextSafe) => {
    // ── Smooth Scroll (Lenis) ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ── Hero entrance ──
    const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
    heroTl

      .from(".hero-title-line", { y: "120%", rotation: 4, duration: 1.8, stagger: 0.15 }, "-=1.2")
      .from(".hero-sub", { y: "100%", opacity: 0, duration: 1.5 }, "-=1.4")
      .from(".hero-cta-wrap", { y: "100%", opacity: 0, duration: 1.5 }, "-=1.3")
      .from(".hero-svg", { scale: 0, opacity: 0, rotation: 15, duration: 1.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=1.2")
      .from(".hero-logos", { opacity: 0, duration: 2 }, "-=1");



    // ── Section headings reveal ──
    gsap.utils.toArray<HTMLElement>(".section-heading").forEach((el) => {
      gsap.from(el, {
        y: "130%",
        rotation: 4,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ── Feature cards batching (from Skill) ──
    ScrollTrigger.batch(".feature-card", {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: "back.out(1.4)", overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 50, scale: 0.95, overwrite: true }),
      start: "top 85%",
    });



    // ── Icon Parallax in Feature Cards ──
    gsap.utils.toArray<HTMLElement>(".feature-card-visual span").forEach((el) => {
      gsap.to(el, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // ── Testimonial cards stagger ──
    gsap.from(".testimonial-card-wrapper", {
      opacity: 0,
      y: 60,
      rotation: 2,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 85%",
      },
    });

    // ── CTA section entrance ──
    gsap.fromTo(".cta-section-inner", 
      { scale: 0.85, opacity: 0, rotationX: 15, y: 50 },
      { 
        scale: 1, opacity: 1, rotationX: 0, y: 0,
        duration: 1.8, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 85%",
        }
      }
    );

    // ── FAQ Entrance & Scroll Effects ──
    gsap.from(".faq-container", {
      scale: 0.95,
      y: 80,
      opacity: 0,
      duration: 1.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 85%",
      }
    });

    gsap.from(".faq-title", {
      y: 40,
      opacity: 0,
      rotationX: -20,
      duration: 1.2,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: ".faq-container",
        start: "top 75%",
      }
    });

    gsap.from(".faq-subtitle", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-container",
        start: "top 75%",
      }
    });

    ScrollTrigger.batch(".faq-item", {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 1, ease: "back.out(1.2)", overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 40, scale: 0.98, overwrite: true }),
      start: "top 85%",
    });
    // Set initial state for batch items
    gsap.set(".faq-item", { opacity: 0, y: 40, scale: 0.98 });

    // ── Magnetic Button Effect (from Skill) ──
    const onMouseMove = contextSafe!((e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        rotation: x * 0.05,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    const onMouseLeave = contextSafe!((e: MouseEvent) => {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.2)",
      });
    });

    const magneticBtns = gsap.utils.toArray<HTMLElement>(".magnetic-btn");
    magneticBtns.forEach(btn => {
      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);
    });

    // ── Parallax Background Panning ──
    gsap.to(".parallax-bg", {
      backgroundPosition: "center 100%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        endTrigger: ".cta-section",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // ── Parallax Footer Push ──
    gsap.to(".parallax-bg-container", {
      y: () => {
        const footer = document.querySelector('footer');
        return footer ? -footer.offsetHeight : 0;
      },
      ease: "none",
      scrollTrigger: {
        trigger: "footer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // ── Hero Background Fade Transition ──
    gsap.to(".hero-bg", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      lenis.destroy();
      magneticBtns.forEach(btn => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen" style={{ overflowX: "hidden", maxWidth: "100vw", background: "transparent", position: "relative" }}>
      {/* Background Parallax Image */}
      <div 
        className="parallax-bg-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: -2,
          pointerEvents: "none",
          willChange: "transform"
        }}
      >
        <div 
          className="parallax-bg"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: "url('/image.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 0%",
            willChange: "background-position",
          }}
        />
      </div>
      {/* Background Hero Image (City) - Scaled down to feel further away */}
      <div 
        className="hero-bg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
          overflow: "hidden",
          backgroundColor: "#0a0a12"
        }}
      >
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 18, 0.2), rgba(10, 10, 18, 0.75)), url('/hero/hero.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
      </div>
      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          background: "transparent",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "6rem 1.25rem 3rem", textAlign: "center", position: "relative", overflow: "hidden",
        }}
      >




        {/* Decorative Hero SVGs */}
        <img src="/hero/hero1.svg" alt="" style={{ position: "absolute", top: "22%", left: "4%", width: "clamp(70px, 10vw, 140px)", zIndex: 1, animation: "float 6s ease-in-out infinite", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/hero2.svg" alt="" style={{ position: "absolute", top: "18%", right: "6%", width: "clamp(60px, 8vw, 120px)", zIndex: 1, animation: "float 8s ease-in-out infinite reverse", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/hero3.svg" alt="" style={{ position: "absolute", bottom: "18%", left: "6%", width: "clamp(80px, 12vw, 160px)", zIndex: 1, animation: "float 7s ease-in-out infinite 1s", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/hero4.svg" alt="" style={{ position: "absolute", bottom: "15%", right: "8%", width: "clamp(70px, 10vw, 140px)", zIndex: 1, animation: "float 9s ease-in-out infinite 0.5s", pointerEvents: "none" }} className="hero-svg" />

        <h1 style={{
          fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, color: c.white,
          lineHeight: 1, maxWidth: 1100, marginBottom: "1.5rem", letterSpacing: "-0.04em",
          position: "relative", zIndex: 2
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span className="hero-title-line" style={{ display: "block" }}>Conviértete en el líder</span>
          </span>
          <span style={{ display: "block", overflow: "hidden", marginTop: "-0.05em" }}>
            <span className="hero-title-line" style={{ display: "inline-block" }}>del mañana</span>
          </span>
        </h1>

        <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
          <p className="hero-sub" style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", color: "rgba(255,255,255,0.92)",
            maxWidth: 640, lineHeight: 1.6, fontWeight: 500,
          }}>
            Un programa intensivo diseñado para jóvenes que buscan transformar su potencial en impacto real. Liderazgo, visión y acción.
          </p>
        </div>

        <div className="hero-cta-wrap" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const, justifyContent: "center", width: "100%", maxWidth: "500px" }}>
          <Link href="/apply" style={{ 
            background: "#7b2cbf", color: c.white, fontWeight: 800, fontSize: "1.05rem", 
            padding: "1rem 2.5rem", borderRadius: 9999, textDecoration: "none", 
            boxShadow: "0 12px 40px rgba(123,44,191,0.4)", display: "inline-flex", alignItems: "center", gap: "0.5rem" 
          }}>
            Quiero aplicar
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/programa" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)", color: c.white,
            fontWeight: 700, fontSize: "1.05rem", padding: "1rem 2.5rem",
            borderRadius: 9999, textDecoration: "none", transition: "background 0.3s ease"
          }}>
            Ver programa
          </Link>
        </div>

        {/* Logos marquee style */}
        <div className="hero-logos hero-partners" style={{ marginTop: "3rem", opacity: 0.9, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", alignItems: "start", gap: "clamp(2rem, 5vw, 4rem)", width: "min(100%, 570px)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.15em", marginBottom: "1rem" }}>Organizado por</p>
            <div style={{ minHeight: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <a href="https://hiveyoung.org/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
                <img src="/hero/logos/hiveyoung.svg" alt="Hiveyoung Logo" style={{ height: "38px", objectFit: "contain", opacity: 0.9 }} />
              </a>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.15em", marginBottom: "1rem" }}>Con el apoyo de</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", minHeight: "52px" }}>
              <img
                src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/escudos/logo-uc-06.svg"
                alt="Pontificia Universidad Católica de Chile"
                style={{ width: "155px", height: "52px", objectFit: "contain", objectPosition: "center" }}
              />
              <img src="/hero/logos/MCDONALDS.svg" alt="McDonald's" style={{ width: "58px", height: "42px", objectFit: "contain", objectPosition: "center" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROGRAM OVERVIEW ═══════════════════ */}
      <section id="programa" style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: c.cream }}>
        <div className="section-container" style={{ maxWidth: "1250px" }}>
          <div style={{ marginBottom: "clamp(2.5rem, 5vw, 5rem)" }}>
            <h2 className="section-heading" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "2rem" }}>
              Cómo Funciona el Programa
            </h2>
            <p style={{ fontSize: "1.2rem", color: c.muted, lineHeight: 1.6, maxWidth: "800px", opacity: 0.8 }}>
              Bootcamp de innovación, emprendimiento y tecnología diseñado para la próxima generación de builders, founders y agentes de cambio.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(2rem, 4vw, 4rem)", marginBottom: "clamp(3rem, 6vw, 6rem)" }}>
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.2rem", color: c.orange, textTransform: "uppercase" }}>Metodología</h3>
              <p style={{ color: c.muted, lineHeight: 1.7, fontSize: "1.05rem" }}>
                Leaders of Tomorrow está diseñado bajo una metodología práctica y orientada a ejecución real. 
                Los módulos combinan contenidos de innovación, emprendimiento y tecnología con construcción práctica.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.2rem", color: c.orange, textTransform: "uppercase" }}>Módulos</h3>
              <p style={{ color: c.muted, lineHeight: 1.7, fontSize: "1.05rem" }}>
                A medida que avanzan las sesiones, los equipos aplican inmediatamente lo aprendido en su proyecto mediante entregables, validaciones e iteraciones constantes.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem" }}>
            {[
              {
                title: "Workshops",
                desc: "Los workshops son talleres y espacios liderados por empresas, startups, founders y expertos del ecosistema. Están diseñados para acercar a los participantes al mundo real de innovación y tecnología mediante casos reales, dinámicas prácticas, construcción en vivo y conversaciones directas con líderes de industria.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
                    <path d="M9 18h6"/>
                    <path d="M10 22h4"/>
                  </svg>
                )
              },
              {
                title: "Checkpoints",
                desc: "Los checkpoints son instancias de revisión estratégica y mentoría donde cada equipo presenta sus avances y recibe feedback personalizado de CEOs, founders, comunidad CBA, etc. El objetivo es ayudar a los equipos a validar decisiones, mejorar su solución e iterar rápidamente.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                    <line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                )
              },
              {
                title: "Labs Vespertinos",
                desc: "Los labs vespertinos son espacios de acompañamiento tecnológico diseñados para preparar y acelerar el desarrollo de los equipos. Se realizarán dos labs antes del bootcamp y un lab adicional durante la semana del programa, enfocados en mejorar el avance tecnológico de cada proyecto.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                )
              }
            ].map((item) => (
              <div key={item.title} style={{ 
                background: c.glassBg, 
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                padding: "2rem 1.5rem", 
                borderRadius: "32px", 
                border: `1px solid ${c.glassBorder}`,
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(123,44,191,0.15)";
                e.currentTarget.style.borderColor = "rgba(199,125,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = c.glassBorder;
              }}
              >
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(123, 44, 191, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1rem", textTransform: "uppercase" }}>{item.title}</h4>
                  <p style={{ color: c.muted, lineHeight: 1.7, fontSize: "1rem", margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* CTA Button */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              href="/programa"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "transparent",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "1.05rem",
                padding: "1rem 2.5rem",
                borderRadius: 9999,
                textDecoration: "none",
                border: "2px solid #ffffff",
                boxShadow: "none",
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                fontFamily: "var(--font-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Ver Programa Completo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="faq-section" style={{ padding: "clamp(3rem, 6vw, 6rem) 1rem 0.5rem", background: c.cream }}>
        <div className="faq-container" style={{
          maxWidth: 1000, margin: "0 auto",
          background: c.glassBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 48,
          padding: "6rem 2rem",
          position: "relative",
          overflow: "hidden",
          color: c.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: `1px solid ${c.glassBorder}`,
          boxShadow: "0 40px 100px rgba(123, 44, 191, 0.15)"
        }}>
          
          <div className="faq-header" style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "600px" }}>
            <h2 className="faq-title" style={{ fontSize: "clamp(4rem, 12vw, 7rem)", margin: 0, lineHeight: 1, letterSpacing: "-0.03em" }}>FAQ</h2>
            <p className="faq-subtitle" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500, fontSize: "1.1rem", marginTop: "1rem" }}>
              Todo lo que necesitas saber sobre el programa
            </p>
          </div>

          <div className="faq-list" style={{ width: "100%", maxWidth: "800px" }}>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" style={{ marginBottom: "1rem" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{
                    width: "100%", textAlign: "left" as const,
                    background: openFaq === index ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 24, padding: "1.5rem 2rem",
                    color: c.white, cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (openFaq !== index) e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    if (openFaq !== index) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, maxWidth: "85%", lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: openFaq === index ? c.orange : "rgba(255,255,255,0.1)",
                    color: openFaq === index ? c.white : c.white,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    transform: openFaq === index ? "rotate(135deg)" : "rotate(0deg)"
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <div style={{
                  maxHeight: openFaq === index ? "300px" : "0",
                  overflow: "hidden", transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: openFaq === index ? "0.5rem 2rem 1.5rem" : "0 2rem",
                  opacity: openFaq === index ? 1 : 0,
                }}>
                  <p style={{
                    fontSize: "1rem", lineHeight: 1.6, 
                    color: "rgba(255,255,255,0.85)", marginTop: "1rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textTransform: "none"
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="cta-section" style={{ padding: "0.5rem 1rem clamp(3rem, 6vw, 6rem)", background: "transparent" }}>
        <div className="cta-section-inner" style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "clamp(3rem, 6vw, 6rem) clamp(1.25rem, 3vw, 2rem)", textAlign: "center", position: "relative"
        }}>
          
          <h2 style={{ fontSize: "clamp(2.4rem, 6vw, 3.8rem)", color: c.white, marginBottom: "1.5rem", fontWeight: 400, lineHeight: 1 }}>
            Tu viaje comienza aquí
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", maxWidth: 600, margin: "0 auto 3rem", lineHeight: 1.6, fontWeight: 500 }}>
            No esperes a que el futuro suceda. Créalo. Postulaciones abiertas para el próximo semestre.
          </p>
          <Link href="/apply" className="magnetic-btn" style={{
            background: "transparent", color: "#ffffff", fontWeight: 900, fontSize: "1.1rem",
            padding: "1.2rem 3rem", borderRadius: 9999, textDecoration: "none", border: "2px solid #ffffff",
            boxShadow: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem", transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}>
            Aplicar ahora
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer style={{ background: "#5A189A", color: "rgba(255,255,255,0.9)", padding: "clamp(3rem, 6vw, 6rem) 1.25rem clamp(1.5rem, 3vw, 3rem)", borderTop: `1px solid ${c.glassBorder}` }}>
        <div className="footer-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "clamp(2rem, 4vw, 4rem)", marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
          <div className="footer-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Image src="/logo-white.svg" alt="Logo" width={180} height={50} style={{ height: "auto", marginBottom: "1.5rem", display: "block" }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 300, textAlign: "center", margin: "0 auto" }}>El nuevo programa de formación para las Skills del Futuro. Diseñada para entrenar a los próximos leaders, builders y founders del mañana.</p>
          </div>
          {[
            { title: "Inmersión", links: ["Currículo", "Admisiones", "Becas"] },
            { title: "Red", links: ["Directorio Alumni", "Partner Schools", "Corporate Connect", "Impact Reports"] },
            { title: "Lab", links: ["Blog", "Podcast", "Recursos Abiertos", "Newsletter"] },
          ].map((col) => (
            <div key={col.title} className="footer-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <p style={{ fontWeight: 800, color: c.white, marginBottom: "1.8rem", fontSize: "1rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", textAlign: "center", width: "100%" }}>{col.title}</p>
              {col.links.map((link) => {
                const isPodcast = link === "Podcast";
                const LinkComponent = isPodcast ? Link : "a";
                return (
                  <LinkComponent
                    key={link}
                    href={isPodcast ? "/podcast" : "#"}
                    style={{ display: "inline-block", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", marginBottom: "0.8rem", transition: "all 0.3s", textAlign: "center" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = c.white; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {link}
                  </LinkComponent>
                );
              })}
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ borderTop: `1px solid ${c.glassBorder}`, paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1rem", maxWidth: 1200, margin: "0 auto" }}>

          <p style={{ fontSize: "0.9rem" }}>© {new Date().getFullYear()} The Builders Camp by HiveYoung</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Twitter", "LinkedIn", "Instagram", "Spotify"].map(s => (
              <a key={s} href="#" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
