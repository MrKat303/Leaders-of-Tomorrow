"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import gsap from "gsap";
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
    { q: "¿Qué es The Builders Camp?", a: "Una experiencia intensiva de cinco días para estudiantes de enseñanza media enfocada en desarrollar habilidades para el futuro a través de desafíos, talleres, empresas, tecnología y trabajo práctico." },
    { q: "¿Cuándo es?", a: "Del 14 al 18 de diciembre de 2026." },
    { q: "¿Quién puede postular?", a: "Estudiantes de enseñanza media que cumplan los requisitos de la convocatoria." },
    { q: "¿Necesito experiencia?", a: "No. The Builders Camp está diseñado precisamente para aprender, descubrir y desarrollar nuevas habilidades durante la experiencia." },
    { q: "¿Puedo postular con mis amigos?", a: "La postulación es individual. Los equipos se formarán buscando reunir perfiles e intereses diferentes." },
    { q: "¿Cómo se seleccionan los participantes?", a: "Queremos conocer quién eres más allá de tus notas. Nos interesan especialmente tu motivación, curiosidad, iniciativa, intereses y las ganas que tengas de aprovechar la experiencia." },
    { q: "¿Tiene costo?", a: "Sí. El programa tiene un costo de $60.000 CLP, con opción de beca para quienes lo necesiten." },
  ];

  useGSAP((context, contextSafe) => {
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
    gsap.set([".faq-container", ".faq-title", ".faq-subtitle", ".faq-item"], {
      opacity: 1, y: 0, scale: 1, rotationX: 0,
    });

    // ── Airplane enters, crosses the FAQ and leaves with the scroll ──
    gsap.timeline({
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    })
      .fromTo(".faq-plane",
        { x: () => window.innerWidth * 0.55, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, ease: "power2.out" }
      )
      .to(".faq-plane", { x: () => -window.innerWidth * 0.15, opacity: 1, duration: 0.34, ease: "none" })
      .to(".faq-plane", { x: () => -window.innerWidth * 1.15, opacity: 0, duration: 0.34, ease: "power2.in" });

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

    gsap.fromTo(".cta-bg",
      { opacity: 0, scale: 1.08 },
      {
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top bottom",
          end: "top 25%",
          scrub: true,
        }
      }
    );

    return () => {
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
            backgroundImage: "linear-gradient(to bottom, rgba(26, 10, 62, 0.18), rgba(40, 13, 72, 0.38)), url('/sky-transition.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 0%",
            backgroundRepeat: "no-repeat",
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
          padding: "5.5rem 1.25rem 2rem", textAlign: "center", position: "relative", overflow: "hidden",
        }}
      >




        {/* Decorative Hero SVGs */}
        <img src="/hero/hero1.svg" alt="" style={{ position: "absolute", top: "22%", left: "4%", width: "clamp(70px, 10vw, 140px)", zIndex: 1, animation: "float 6s ease-in-out infinite", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/hero2.svg" alt="" style={{ position: "absolute", top: "18%", right: "6%", width: "clamp(60px, 8vw, 120px)", zIndex: 1, animation: "float 8s ease-in-out infinite reverse", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/hero3.svg" alt="" style={{ position: "absolute", bottom: "18%", left: "6%", width: "clamp(80px, 12vw, 160px)", zIndex: 1, animation: "float 7s ease-in-out infinite 1s", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/hero4.svg" alt="" style={{ position: "absolute", bottom: "15%", right: "8%", width: "clamp(70px, 10vw, 140px)", zIndex: 1, animation: "float 9s ease-in-out infinite 0.5s", pointerEvents: "none" }} className="hero-svg" />

        <h1 style={{
          fontSize: "clamp(2.1rem, 5vw, 3.75rem)", fontWeight: 400, color: c.white,
          lineHeight: 0.98, maxWidth: 900, marginBottom: "1.25rem", letterSpacing: "-0.035em",
          position: "relative", zIndex: 2
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span className="hero-title-line" style={{ display: "block" }}>Conviértete en</span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span className="hero-title-line" style={{ display: "block" }}>el Builder del Mañana</span>
          </span>
        </h1>

        <div style={{ overflow: "hidden", marginBottom: "1.1rem", position: "relative", zIndex: 2 }}>
          <p className="hero-sub" style={{
            fontSize: "clamp(0.88rem, 1.45vw, 1.05rem)", color: "rgba(255,255,255,0.95)",
            maxWidth: 850, lineHeight: 1.45,
          }}>
            Una experiencia intensiva para jóvenes de enseñanza media, diseñada para desarrollar las habilidades del futuro a través de desafíos reales, líderes y empresas, y prepararte para ser parte de la generación que construirá lo que viene.
          </p>
        </div>

        <div className="hero-meta" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(1.5rem, 4vw, 3rem)",
          width: "100%", marginBottom: "1.1rem", position: "relative", zIndex: 2,
          color: c.white, fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)", fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.02em",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4M16 2v4M3 10h18" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
            </svg>
            <span>14 — 18 diciembre 2026</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>Santiago, Región Metropolitana</span>
          </div>
        </div>

        <div className="hero-cta-wrap" style={{ display: "flex", justifyContent: "center", width: "100%", maxWidth: "500px" }}>
          <Link href="/apply" style={{ 
            background: "#7b2cbf", color: c.white, fontWeight: 800, fontSize: "1.05rem", 
            padding: "0.85rem 2.2rem", borderRadius: 9999, textDecoration: "none",
            boxShadow: "0 12px 40px rgba(123,44,191,0.4)", display: "inline-flex", alignItems: "center", gap: "0.5rem" 
          }}>
            Postula ahora
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Logos marquee style */}
        <div className="hero-logos hero-partners" style={{ marginTop: "1.5rem", opacity: 0.9, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", alignItems: "start", gap: "clamp(2rem, 5vw, 4rem)", width: "min(100%, 570px)" }}>
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

      {/* ═══════════════════ SKILLS ═══════════════════ */}
      <section id="habilidades" style={{ padding: "clamp(4rem, 8vw, 7rem) 1.25rem", background: c.cream }}>
        <div style={{ width: "100%", maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ maxWidth: 1050, margin: "0 auto clamp(2.5rem, 5vw, 4.5rem)", textAlign: "center" }}>
            <p className="hero-sub" style={{
              color: "rgba(255,255,255,0.72)", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
              lineHeight: 1.5, marginBottom: "0.75rem",
            }}>
              El mundo está cambiando más rápido que nunca y necesita
            </p>
            <h2 className="section-heading" style={{
              fontSize: "clamp(2rem, 4.6vw, 4.25rem)", lineHeight: 1.02,
              letterSpacing: "-0.035em", marginBottom: "1rem",
            }}>
              Personas preparadas para él.
            </h2>
            <p style={{
              color: c.white, fontFamily: "var(--font-primary)", textTransform: "uppercase",
              fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)", lineHeight: 1.2,
            }}>
              Lo que aprendes hoy puede cambiar lo que hagas mañana.
            </p>
          </div>

          <div className="skills-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "0.55rem",
          }}>
            {[
              "Emprendimiento",
              "Liderazgo",
              "IA y tecnología",
              "Comunicación",
              "Pensamiento crítico",
              "Colaboración",
              "Adaptabilidad",
              "Ejecución",
            ].map((skill) => (
              <div key={skill} className="skill-card">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WEEK PROGRAM ═══════════════════ */}
      <section id="programa" className="week-program-section" style={{
        minHeight: "100svh", padding: "clamp(4rem, 7vw, 6rem) 1.25rem",
        display: "flex", alignItems: "center", background: c.cream,
      }}>
        <div style={{ width: "100%", maxWidth: 1480, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 850, margin: "0 auto clamp(2rem, 4vw, 3.5rem)" }}>
            <h2 className="section-heading" style={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)", lineHeight: 1,
              letterSpacing: "-0.035em", marginBottom: "1rem",
            }}>
              5 días para ponerte a prueba.
            </h2>
            <p className="hero-sub" style={{
              color: "rgba(255,255,255,0.72)", fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)", lineHeight: 1.6,
            }}>
              Cada día suma un nuevo desafío. Vas a descubrir problemas, construir soluciones y convertir una idea en algo real.
            </p>
          </div>

          <style>{`
            .program-toggle {
              position: absolute !important;
              left: 50% !important;
              bottom: 1.25rem !important;
              width: 1px !important;
              height: 1px !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            .program-toggle:checked ~ .program-card-content {
              max-height: 1200px !important;
            }
            .program-label-open {
              display: none !important;
            }
            .program-toggle:checked ~ .program-expand-button .program-label-closed {
              display: none !important;
            }
            .program-toggle:checked ~ .program-expand-button .program-label-open {
              display: inline !important;
            }
            .program-toggle:checked ~ .program-expand-button svg {
              transform: rotate(180deg);
            }
          `}</style>
          <div className="program-card" style={{ background: "#5a189a", boxShadow: "none" }}>
            <input
              id="program-toggle"
              className="program-toggle"
              type="checkbox"
              tabIndex={-1}
              aria-label="Mostrar u ocultar el programa completo"
            />
            <div className="program-card-content">
              <div
                className="program-scroll"
                role="region"
                aria-label="Programa de cinco días"
                tabIndex={0}
                style={{ background: "transparent" }}
              >
                <div className="program-grid">
              {[
                { day: "Lun", date: "14", theme: "Problema", events: [
                  ["09:00 — 10:00", "Think Like a Founder", "accent"],
                  ["10:00 — 11:15", "Empathy & Problem", "standard"],
                  ["11:15 — 11:30", "Break", "break"],
                  ["11:30 — 12:30", "Problem Hunting Lab", "lab"],
                  ["12:30 — 13:30", "Definir el Problema", "standard"],
                  ["13:30 — 14:15", "Almuerzo", "break"],
                  ["14:15 — 15:30", "Checkpoint", "checkpoint"],
                  ["15:30 — 16:00", "Mindset y Reflexión", "accent"],
                ] },
                { day: "Mar", date: "15", theme: "Solución", events: [
                  ["09:00 — 10:00", "Customer Discovery", "standard"],
                  ["10:00 — 11:15", "Ideación", "standard"],
                  ["11:15 — 11:30", "Break", "break"],
                  ["11:30 — 12:30", "Validación de la Solución", "lab"],
                  ["12:30 — 13:30", "Prototipado Rápido", "standard"],
                  ["13:30 — 14:15", "Almuerzo", "break"],
                  ["14:15 — 15:30", "AI Prototyping Lab", "lab"],
                  ["15:30 — 16:30", "Ops y Estructura", "standard"],
                  ["16:30 — 17:00", "Checkpoint", "checkpoint"],
                ] },
                { day: "Mié", date: "16", theme: "Construcción", events: [
                  ["09:00 — 10:00", "Análisis Estratégico", "standard"],
                  ["10:00 — 11:15", "Product Build Lab", "lab"],
                  ["11:15 — 11:30", "Break", "break"],
                  ["11:30 — 13:30", "AI Product Studio", "lab"],
                  ["13:30 — 14:15", "Almuerzo", "break"],
                  ["14:15 — 15:30", "Modelo de Negocio", "standard"],
                  ["15:30 — 16:30", "Consumer Experience", "standard"],
                  ["16:30 — 17:00", "Entregables", "checkpoint"],
                  ["20:00 — 21:00", "Lab Vespertino", "checkpoint"],
                ] },
                { day: "Jue", date: "17", theme: "Crecimiento", events: [
                  ["09:00 — 10:00", "Go-To-Market", "standard"],
                  ["10:00 — 11:15", "Marketing y Redes", "standard"],
                  ["11:15 — 11:30", "Break", "break"],
                  ["11:30 — 12:30", "Meta Pitch", "lab"],
                  ["12:30 — 13:30", "Buscar Inversión", "lab"],
                  ["13:30 — 14:15", "Almuerzo", "break"],
                  ["14:15 — 15:30", "¿Tu Startup Realmente Funciona?", "checkpoint"],
                  ["15:30 — 16:00", "Mindset y Gestión del Estrés", "accent"],
                ] },
                { day: "Vie", date: "18", theme: "Demo Day", events: [
                  ["09:00 — 10:00", "Ensayos Pitch Final", "accent"],
                  ["10:00 — 12:30", "Checklist Final / Pre-Demo", "accent"],
                  ["12:30 — 13:30", "¿Y qué sigue?", "standard"],
                  ["13:30 — 14:15", "Almuerzo", "break"],
                  ["14:30 — 15:00", "Mindset y Gestión del Estrés", "accent"],
                  ["15:00 — 18:00", "Pitch Demos", "lab"],
                  ["18:00", "Cóctel", "break"],
                  ["18:00", "Anuncio del Ganador", "checkpoint"],
                  ["19:00", "Apertura, Autoridades y Charlas", "standard"],
                ] },
              ].map((day) => (
                <article key={day.date} className="program-day">
                  <header className="program-day-header">
                    <div><span>{day.day}</span><strong>{day.date}</strong></div>
                    <p>{day.theme}</p>
                  </header>
                  <div className="program-events">
                    {day.events.map(([time, title, tone]) => (
                      <div key={title} className={`program-event program-event-${tone}`}>
                        <span>{time}</span>
                        <h3>{title}</h3>
                      </div>
                    ))}
                  </div>
                </article>
                  ))}
                </div>
              </div>
            </div>
            <label
              htmlFor="program-toggle"
              className="program-expand-button"
              onClick={() => {
                const currentScroll = window.scrollY;
                requestAnimationFrame(() => window.scrollTo({ top: currentScroll, behavior: "auto" }));
                window.setTimeout(() => window.scrollTo({ top: currentScroll, behavior: "auto" }), 80);
              }}
            >
              <span className="program-label-closed">Ver programa completo</span>
              <span className="program-label-open">Ocultar programa</span>
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </label>
          </div>
        </div>
      </section>


      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="faq-section" style={{
        minHeight: "auto", padding: "clamp(3.5rem, 5vw, 5rem) 1rem 0",
        background: "transparent",
        position: "relative", overflow: "hidden",
      }}>
        <div className="faq-container" style={{
          maxWidth: 1000, margin: "0 auto",
          background: "transparent",
          borderRadius: 0,
          padding: "clamp(1.5rem, 3vw, 2.5rem) 2rem 0.5rem",
          position: "relative", zIndex: 1,
          overflow: "visible",
          color: c.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "none",
          boxShadow: "none"
        }}>
          <img
            src="/faq-balloon.png"
            alt=""
            aria-hidden="true"
            className="faq-balloon"
          />
          <img
            src="/program-plane.png"
            alt=""
            aria-hidden="true"
            className="faq-plane"
          />
          
          <div className="faq-header" style={{ textAlign: "center", marginBottom: "clamp(1.5rem, 3vw, 2.25rem)", maxWidth: "600px" }}>
            <h2 className="faq-title" style={{ fontSize: "clamp(4.5rem, 12vw, 7.5rem)", margin: 0, lineHeight: 1, letterSpacing: "-0.03em" }}>FAQ</h2>
            <p className="faq-subtitle" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500, fontSize: "1.1rem", marginTop: "1rem" }}>
              Todo lo que necesitas saber sobre el programa
            </p>
          </div>

          <div className="faq-list" style={{ width: "100%", maxWidth: "800px" }}>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" style={{ marginBottom: "1rem" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  style={{
                    width: "100%", textAlign: "left" as const,
                    background: openFaq === index ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 24, padding: "1.5rem 2rem",
                    color: c.white, cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (openFaq !== index) e.currentTarget.style.background = "rgba(255,255,255,0.27)";
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    if (openFaq !== index) e.currentTarget.style.background = "rgba(255,255,255,0.2)";
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
                <div id={`faq-answer-${index}`} style={{
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
      <section className="cta-section" style={{
        minHeight: "clamp(480px, 68svh, 680px)", padding: "0 1rem clamp(2rem, 4vw, 3.5rem)",
        backgroundColor: "transparent", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div className="cta-bg" aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/footer-journey.png')", backgroundSize: "cover",
          backgroundPosition: "center bottom", backgroundRepeat: "no-repeat", backgroundAttachment: "scroll",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 10%, #000 30%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 10%, #000 30%)",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(39, 12, 75, 0.12) 24%, rgba(24, 8, 43, 0.66) 100%)",
        }} />
        <div className="cta-section-inner" style={{
          maxWidth: 1100, margin: "0 auto", zIndex: 1,
          padding: "clamp(1.5rem, 3vw, 3rem) clamp(1.25rem, 3vw, 2rem)", textAlign: "center", position: "relative"
        }}>
          
          <h2 style={{ fontSize: "clamp(2.4rem, 6vw, 3.8rem)", color: c.white, marginBottom: "1.5rem", fontWeight: 400, lineHeight: 1 }}>
            Tu viaje comienza aquí
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", maxWidth: 600, margin: "0 auto 3rem", lineHeight: 1.6, fontWeight: 500 }}>
            No esperes a que el futuro suceda. Créalo. Postulaciones abiertas para el próximo semestre.
          </p>
          <Link href="/apply" className="cta-apply-static" style={{
            background: "transparent", color: "#ffffff", fontWeight: 900, fontSize: "1.1rem",
            padding: "1.2rem 3rem", borderRadius: 9999, textDecoration: "none", border: "2px solid #ffffff",
            boxShadow: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem"
          }}>
            Aplicar ahora
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer style={{
        background: "#5A189A", color: "rgba(255,255,255,0.9)",
        padding: "clamp(3rem, 6vw, 6rem) 1.25rem clamp(1.5rem, 3vw, 3rem)",
        borderTop: `1px solid ${c.glassBorder}`,
      }}>
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
