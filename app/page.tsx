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
  orange: "#FA6742",
  orangeDark: "#e5522e",
  orangeLight: "#FFCBB8",
  orangePale: "#FFF0EB",
  cream: "#F9F4E1",
  dark: "#1A1208",
  muted: "#7A5C4F",
  white: "#ffffff",
  forest: "#43a574",
  lime: "#D4F84B",
  purple: "#B197FC",
};

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "¿La primera clase es realmente gratis?", a: "¡Sí! Creemos en que debes experimentar nuestra metodología antes de comprometerte. La sesión de diagnóstico y la primera clase introductoria son totalmente gratuitas." },
    { q: "¿Cómo eligen al mentor adecuado?", a: "Realizamos un match basado en tus objetivos de carrera, personalidad y el área de impacto que deseas desarrollar." },
    { q: "¿El mentor da feedback de tareas?", a: "Más que tareas, trabajamos en proyectos reales. Tu mentor revisará tus avances semanalmente y te dará feedback accionable." },
    { q: "¿Qué pasa si pierdo una sesión?", a: "Todas nuestras sesiones grupales se graban y las mentorías 1:1 pueden reagendarse con 24h de anticipación." },
    { q: "¿Qué pasa si necesito ayuda extra?", a: "Nuestra comunidad en Slack está activa 24/7 y tenemos horas de oficina semanales para resolver dudas técnicas." },
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

    // ── Stats counter ──
    gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
      const target = parseInt(el.getAttribute("data-value") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const prefix = el.getAttribute("data-prefix") || "";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        onUpdate: () => {
          el.textContent = prefix + Math.round(obj.val) + suffix;
        },
      });
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
    gsap.from(".testimonial-card", {
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

    return () => {
      lenis.destroy();
      magneticBtns.forEach(btn => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, { scope: container });

  return (
    <div ref={container} className="bg-cream min-h-screen">
      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          backgroundColor: c.orange,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "8rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden",
        }}
      >




        {/* Decorative Hero SVGs */}
        <img src="/hero/Hero%201.svg" alt="" style={{ position: "absolute", top: "22%", left: "4%", width: "clamp(70px, 10vw, 140px)", zIndex: 1, animation: "float 6s ease-in-out infinite", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/Hero%202.svg" alt="" style={{ position: "absolute", top: "18%", right: "6%", width: "clamp(60px, 8vw, 120px)", zIndex: 1, animation: "float 8s ease-in-out infinite reverse", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/Hero%203.svg" alt="" style={{ position: "absolute", bottom: "18%", left: "6%", width: "clamp(80px, 12vw, 160px)", zIndex: 1, animation: "float 7s ease-in-out infinite 1s", pointerEvents: "none" }} className="hero-svg" />
        <img src="/hero/Hero%204.svg" alt="" style={{ position: "absolute", bottom: "15%", right: "8%", width: "clamp(70px, 10vw, 140px)", zIndex: 1, animation: "float 9s ease-in-out infinite 0.5s", pointerEvents: "none" }} className="hero-svg" />

        <h1 style={{
          fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, color: c.white,
          lineHeight: 1, maxWidth: 1100, marginBottom: "1.5rem", letterSpacing: "-0.04em",
          position: "relative", zIndex: 2
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span className="hero-title-line" style={{ display: "block" }}>Conviértete en el líder</span>
          </span>
          <span style={{ display: "block", overflow: "hidden", marginTop: "-0.05em" }}>
            <span className="hero-title-line" style={{ display: "inline-block", background: "rgba(255,255,255,0.18)", borderRadius: "24px", padding: "0 0.4em" }}>del mañana</span>
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

        <div className="hero-cta-wrap" style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" as const, justifyContent: "center" }}>
          <Link href="/apply" className="magnetic-btn" style={{ 
            background: c.white, color: c.orange, fontWeight: 800, fontSize: "1.05rem", 
            padding: "1rem 2.5rem", borderRadius: 9999, textDecoration: "none", 
            boxShadow: "0 12px 40px rgba(26,18,8,0.22)", display: "inline-flex", alignItems: "center", gap: "0.5rem" 
          }}>
            Quiero aplicar
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="#programa" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)",
            border: "2px solid rgba(255,255,255,0.5)", color: c.white,
            fontWeight: 700, fontSize: "1.05rem", padding: "1rem 2.5rem",
            borderRadius: 9999, textDecoration: "none", transition: "background 0.3s ease"
          }}>
            Ver programa
          </a>
        </div>

        {/* Logos marquee style */}
        <div className="hero-logos" style={{ marginTop: "5rem", opacity: 0.8 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.2em", marginBottom: "1.5rem" }}>Avalado por instituciones líderes</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" as const, alignItems: "center" }}>
            {["Harvard", "MIT", "Stanford", "TEC", "UNAM"].map((name) => (
              <span key={name} style={{ color: c.white, fontWeight: 800, fontSize: "1.2rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, opacity: 0.65 }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROGRAM OVERVIEW ═══════════════════ */}
      <section id="programa" style={{ padding: "8rem 0", background: c.cream }}>
        <div className="section-container" style={{ maxWidth: "1000px" }}>
          <div style={{ marginBottom: "5rem" }}>
            <h2 className="section-heading" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "2rem" }}>
              Cómo Funciona el Programa
            </h2>
            <p style={{ fontSize: "1.2rem", color: c.dark, lineHeight: 1.6, maxWidth: "800px", opacity: 0.8 }}>
              Bootcamp de innovación, emprendimiento y tecnología diseñado para la próxima generación de builders, founders y agentes de cambio.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", marginBottom: "6rem" }}>
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.2rem", color: c.orange, textTransform: "uppercase" }}>Metodología</h3>
              <p style={{ color: c.dark, opacity: 0.7, lineHeight: 1.7, fontSize: "1.05rem" }}>
                Leaders of Tomorrow está diseñado bajo una metodología práctica y orientada a ejecución real. 
                Los módulos combinan contenidos de innovación, emprendimiento y tecnología con construcción práctica.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.2rem", color: c.orange, textTransform: "uppercase" }}>Módulos</h3>
              <p style={{ color: c.dark, opacity: 0.7, lineHeight: 1.7, fontSize: "1.05rem" }}>
                A medida que avanzan las sesiones, los equipos aplican inmediatamente lo aprendido en su proyecto mediante entregables, validaciones e iteraciones constantes.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
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
                background: "rgba(26,18,8,0.03)", 
                padding: "3rem 2rem", 
                borderRadius: "32px", 
                border: "1px solid rgba(26,18,8,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(250,103,66,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1rem", textTransform: "uppercase" }}>{item.title}</h4>
                  <p style={{ color: c.dark, opacity: 0.7, lineHeight: 1.7, fontSize: "1rem", margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ VIDEO SECTION ═══════════════════ */}
      <section style={{ padding: "6rem 1.5rem", background: c.cream, position: "relative", overflow: "hidden" }}>
        {/* Decorative background element */}
        <div style={{ position: "absolute", width: "30%", height: "30%", top: "10%", left: "-10%", background: `radial-gradient(circle, ${c.orangeLight} 0%, transparent 70%)`, opacity: 0.1, pointerEvents: "none" }} />
        
        <div className="section-container" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          
          {/* Video Container (Left) */}
          <div style={{ 
            position: "relative", 
            borderRadius: "32px",
            padding: "0.8rem",
            background: c.white,
            boxShadow: "0 30px 100px rgba(26,18,8,0.12)",
            border: "1px solid rgba(250,103,66,0.1)",
          }}>
            <div style={{ 
              position: "relative", 
              paddingBottom: "56.25%", 
              height: 0, 
              overflow: "hidden", 
              borderRadius: "24px",
            }}>
              <iframe 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                src="https://www.youtube.com/embed/y8xZJ0Mg4yY"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Text Content (Right) */}
          <div style={{ textAlign: "left" }}>
            <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              Revive la Experiencia
            </h2>
            <p style={{ color: c.muted, fontSize: "1.15rem", lineHeight: 1.6, marginBottom: "2rem", maxWidth: "450px" }}>
              Descubre por qué Leaders of Tomorrow es el programa que está transformando el ecosistema joven. Un vistazo a la energía y el impacto de nuestras ediciones pasadas.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <span style={{ fontSize: "0.9rem", color: c.orange, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", background: "rgba(250,103,66,0.1)", padding: "0.4rem 1rem", borderRadius: "99px" }}>
                #ImpactoReal
              </span>
              <span style={{ fontSize: "0.9rem", color: c.orange, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", background: "rgba(250,103,66,0.1)", padding: "0.4rem 1rem", borderRadius: "99px" }}>
                #CBA
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section style={{ padding: "6rem 0", background: c.cream, borderTop: `1px solid rgba(250,103,66,0.08)`, borderBottom: `1px solid rgba(250,103,66,0.08)` }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", textAlign: "center" }}>
            {[
              { value: 250, prefix: "+", suffix: "", label: "Alumni Impactando" },
              { value: 12, prefix: "", suffix: "", label: "Semanas Intensivas" },
              { value: 98, prefix: "", suffix: "%", label: "Satisfacción NPS" },
              { value: 45, prefix: "+", suffix: "", label: "Mentores Globales" },
            ].map((s) => (
              <div key={s.label}>
                <p className="stat-number" data-value={s.value} data-suffix={s.suffix} data-prefix={s.prefix} style={{ fontSize: "4.5rem", fontWeight: 800, color: c.orange }}>0</p>
                <p className="stat-label" style={{ fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", fontSize: "0.85rem", color: c.muted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section id="testimonios" style={{ padding: "8rem 0", background: c.cream }}>
        <div className="section-container">
          <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
            <p className="section-heading" style={{ color: c.orange, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, textAlign: "center" }}>
              Nuestra Red
            </p>
          </div>
          <div style={{ overflow: "hidden", margin: "0 auto 4.5rem", maxWidth: 700 }}>
            <h2 className="section-heading" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", lineHeight: 1.1 }}>
              Historias de transformación real
            </h2>
          </div>

          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
            {[
              { name: "Sofía Martínez", role: "CEO, BioGreen", quote: "Leaders of Tomorrow no solo me dio herramientas, me dio una familia. El nivel de los mentores es otro mundo." },
              { name: "Andrés Silva", role: "Founder, DataImpact", quote: "Llegué buscando contactos y me fui con una visión clara de cómo quería cambiar mi país. Inversión 100% recomendada." },
              { name: "Elena Paz", role: "Directora Innovación", quote: "Lo que más destaco es la metodología práctica. No es teoría aburrida, es ensuciarse las manos y crear." },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <p style={{ fontSize: "1.15rem", lineHeight: 1.6, color: c.muted, marginBottom: "2rem", fontStyle: "italic", fontWeight: 500 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg, ${c.orange}, ${c.orangeLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: c.white, fontWeight: 900, fontSize: "1rem" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: "1rem", color: c.dark }}>{t.name}</p>
                    <p style={{ fontSize: "0.85rem", color: c.muted, fontWeight: 600 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="faq-section" style={{ padding: "8rem 1.5rem", background: c.cream }}>
        <div className="faq-container" style={{
          maxWidth: 1000, margin: "0 auto",
          backgroundColor: c.forest,
          borderRadius: 48,
          padding: "6rem 2rem",
          position: "relative",
          overflow: "hidden",
          color: c.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 40px 100px rgba(67, 165, 116, 0.2)"
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
                    background: openFaq === index ? c.lime : "rgba(255,255,255,0.15)",
                    color: openFaq === index ? c.forest : c.white,
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
      <section className="cta-section" style={{ padding: "6rem 1.5rem", background: c.cream }}>
        <div className="cta-section-inner" style={{
          maxWidth: 1100, margin: "0 auto",
          background: `linear-gradient(145deg, ${c.orange}, #FF7D5A)`,
          borderRadius: 48, padding: "6rem 2rem", textAlign: "center", position: "relative", overflow: "hidden",
          boxShadow: "0 30px 90px rgba(250,103,66,0.3)"
        }}>
          <div style={{ position: "absolute", width: 400, height: 400, top: -100, right: -100, borderRadius: "50%", background: "rgba(255,255,255,0.15)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 250, height: 250, bottom: -50, left: -50, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
          
          <h2 style={{ fontSize: "clamp(2.4rem, 6vw, 3.8rem)", color: c.white, marginBottom: "1.5rem", fontWeight: 400, lineHeight: 1 }}>
            Tu viaje comienza aquí
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", maxWidth: 600, margin: "0 auto 3rem", lineHeight: 1.6, fontWeight: 500 }}>
            No esperes a que el futuro suceda. Créalo. Postulaciones abiertas para el próximo semestre.
          </p>
          <Link href="/apply" className="magnetic-btn" style={{
            background: c.white, color: c.orange, fontWeight: 900, fontSize: "1.1rem",
            padding: "1.2rem 3rem", borderRadius: 9999, textDecoration: "none",
            boxShadow: "0 15px 45px rgba(0,0,0,0.15)", display: "inline-flex", alignItems: "center", gap: "0.6rem"
          }}>
            Aplicar ahora
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer style={{ background: c.orange, color: "rgba(255,255,255,0.9)", padding: "6rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "4rem", marginBottom: "4rem" }}>
          <div className="footer-col">
            <Image src="/Leaders Of Tomorrow Lab.svg" alt="Logo" width={180} height={50} style={{ height: "auto", marginBottom: "1.5rem" }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 300 }}>La plataforma líder en formación de liderazgo joven en Iberoamérica. Creando impacto desde 2018.</p>
          </div>
          {[
            { title: "Inmersión", links: ["Currículo", "Mentores", "Admisiones", "Becas"] },
            { title: "Red", links: ["Directorio Alumni", "Partner Schools", "Corporate Connect", "Impact Reports"] },
            { title: "Lab", links: ["Blog", "Podcast", "Recursos Abiertos", "Newsletter"] },
          ].map((col) => (
            <div key={col.title} className="footer-col">
              <p style={{ fontWeight: 800, color: c.white, marginBottom: "1.8rem", fontSize: "1rem", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{col.title}</p>
              {col.links.map((link) => (
                <a key={link} href="#" style={{ display: "block", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", marginBottom: "0.8rem", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = c.white; e.currentTarget.style.transform = "translateX(5px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "translateX(0)"; }}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1rem" }}>
          <p style={{ fontSize: "0.9rem" }}>© {new Date().getFullYear()} Leaders of Tomorrow by CBA</p>
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
