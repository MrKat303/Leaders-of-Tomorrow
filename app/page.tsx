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

interface Mentor {
  name: string;
  role: string;
  description: string;
  linkedin: string;
  initials: string;
  image: string;
  details: string;
  tags: string[];
  gradient: string;
}

const MENTORS: Mentor[] = [
  {
    name: "Alejandra Mustakis",
    role: "Empresaria / Emprendedora",
    description: "Reconocida empresaria y emprendedora chilena, impulsora del ecosistema de innovación y emprendimiento en Latinoamérica.",
    linkedin: "https://linkedin.com",
    initials: "AM",
    image: "/mentors/alejandra-mustakis.jpg",
    details: "Alejandra Mustakis es una referente del ecosistema emprendedor latinoamericano. Ha fundado múltiples empresas, lidera iniciativas de impacto social y es una voz influyente en innovación y liderazgo en la región.",
    tags: ["Emprendimiento", "Innovación", "Liderazgo"],
    gradient: "linear-gradient(135deg, #7b2cbf 0%, #c77dff 100%)"
  },
  {
    name: "Juliana Ospina",
    role: "CBA Board Member",
    description: "Miembro del Board de CBA. Líder estratégica con amplia experiencia en gobernanza corporativa y desarrollo de talento joven.",
    linkedin: "https://linkedin.com",
    initials: "JO",
    image: "/mentors/juliana-ospina.jpg",
    details: "Juliana Ospina aporta una visión estratégica y de gobernanza al programa. Como miembro del Board de CBA, se enfoca en impulsar el talento joven y conectar a la próxima generación con oportunidades de alto impacto.",
    tags: ["Board Member", "CBA", "Estrategia"],
    gradient: "linear-gradient(135deg, #5a189a 0%, #9d4edd 100%)"
  },
  {
    name: "Michelle Schnitzer",
    role: "Emprendedora · CEO de Bondup",
    description: "Fundadora y CEO de Bondup. Emprendedora con visión de producto y pasión por construir soluciones que conectan personas.",
    linkedin: "https://linkedin.com",
    initials: "MS",
    image: "/mentors/michelle-schnitzer.jpg",
    details: "Michelle Schnitzer es la fundadora y CEO de Bondup, una plataforma que conecta personas a través de experiencias. Con un enfoque en producto y comunidad, aporta una perspectiva fresca y práctica al ecosistema emprendedor.",
    tags: ["CEO", "Startup", "Producto"],
    gradient: "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)"
  }
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredLinkedin, setHoveredLinkedin] = useState<number | null>(null);
  const [hoveredMore, setHoveredMore] = useState<number | null>(null);

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

    // ── Mentor cards stagger ──
    gsap.from(".mentor-card-wrapper", {
      opacity: 0,
      y: 60,
      rotation: -1,
      stagger: 0.12,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".mentors-grid",
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
            backgroundImage: "url('/image.png')",
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
            backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 18, 0.2), rgba(10, 10, 18, 0.75)), url('/hero/hero.png')",
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

        <div className="hero-cta-wrap" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const, justifyContent: "center", width: "100%", maxWidth: "500px" }}>
          <Link href="/apply" className="magnetic-btn" style={{ 
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
        <div className="hero-logos" style={{ marginTop: "3rem", opacity: 0.8 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.15em", marginBottom: "1rem" }}>Organizado por</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(2rem, 5vw, 4rem)", flexWrap: "wrap" as const, alignItems: "center" }}>
            <img src="/hero/logos/Cba.png" alt="CBA Logo" style={{ height: "48px", objectFit: "contain", opacity: 0.9 }} />
            <img src="/hero/logos/hiveyoung.svg" alt="Hiveyoung Logo" style={{ height: "38px", objectFit: "contain", opacity: 0.9 }} />
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

      {/* ═══════════════════ VIDEO SECTION ═══════════════════ */}
      <section style={{ padding: "clamp(3rem, 6vw, 6rem) 1.25rem", background: c.cream, position: "relative", overflow: "hidden" }}>
        {/* Decorative background element */}
        <div style={{ position: "absolute", width: "30%", height: "30%", top: "10%", left: "-10%", background: `radial-gradient(circle, rgba(123,44,191,0.15) 0%, transparent 70%)`, opacity: 0.5, pointerEvents: "none" }} />
        
        <div className="section-container" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          
          {/* Video Container (Left) */}
          <div style={{ position: "relative" }}>
            {/* Background Glow */}
            <div style={{
              position: "absolute",
              top: "-5%", left: "-5%", right: "-5%", bottom: "-5%",
              background: "linear-gradient(135deg, #e0aaff, #7b2cbf)",
              filter: "blur(40px)",
              opacity: 0.3,
              borderRadius: "32px",
              zIndex: 0
            }} />
            <div style={{ 
              position: "relative", 
              paddingBottom: "56.25%", 
              height: 0, 
              overflow: "hidden", 
              borderRadius: "24px",
              border: `1px solid rgba(255, 255, 255, 0.2)`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset",
              zIndex: 1,
              background: "#000"
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
          <div style={{ textAlign: "left", paddingLeft: "clamp(0px, 2vw, 2rem)" }}>
            <h2 className="section-heading" style={{ fontSize: "clamp(2.4rem, 5vw, 3.2rem)", marginBottom: "1.5rem", lineHeight: 1.1, color: c.white }}>
              Revive la Experiencia
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.15rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "500px", fontWeight: 400 }}>
              Descubre por qué Leaders of Tomorrow es el programa que está transformando el ecosistema joven. Un vistazo a la energía y el impacto de nuestras ediciones pasadas.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ 
                fontSize: "0.85rem", color: c.white, fontWeight: 600, textTransform: "uppercase", 
                letterSpacing: "0.05em", background: "rgba(255, 255, 255, 0.1)", 
                border: "1px solid rgba(255, 255, 255, 0.15)", padding: "0.6rem 1.4rem", 
                borderRadius: "99px", backdropFilter: "blur(10px)" 
              }}>
                #ImpactoReal
              </span>
              <span style={{ 
                fontSize: "0.85rem", color: c.white, fontWeight: 600, textTransform: "uppercase", 
                letterSpacing: "0.05em", background: "rgba(255, 255, 255, 0.1)", 
                border: "1px solid rgba(255, 255, 255, 0.15)", padding: "0.6rem 1.4rem", 
                borderRadius: "99px", backdropFilter: "blur(10px)" 
              }}>
                #CBA
              </span>
            </div>
          </div>

        </div>
      </section>



      {/* ═══════════════════ MENTORES ═══════════════════ */}
      <section id="mentores" style={{ padding: "clamp(3rem, 6vw, 6rem) 0 clamp(1rem, 2vw, 2rem)", background: c.cream }}>
        <div className="section-container">
          <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
            <p className="section-heading" style={{ color: c.orange, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>
              Aprende de los mejores
            </p>
          </div>
          <div style={{ overflow: "hidden", margin: "0 auto 4.5rem", maxWidth: 700 }}>
            <h2 className="section-heading" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", lineHeight: 1.1 }}>
              Nuestros Mentores
            </h2>
          </div>

          <div className="mentors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
            {MENTORS.map((m, index) => {
              const isHovered = hoveredCard === index;
              const isLinkedinHovered = hoveredLinkedin === index;

              return (
                <div
                  key={m.name}
                  className="mentor-card-wrapper"
                >
                  <div
                    className="mentor-card"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => { setHoveredCard(null); setHoveredLinkedin(null); }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      padding: "2rem 1.5rem 1.5rem",
                      borderRadius: "24px",
                      background: isHovered ? "rgba(255,255,255,0.1)" : c.glassBg,
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: `1px solid ${isHovered ? "rgba(224,170,255,0.4)" : c.glassBorder}`,
                      boxShadow: isHovered ? "0 20px 50px rgba(123,44,191,0.25)" : "0 4px 20px rgba(0,0,0,0.15)",
                      transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                      transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                      cursor: "default",
                      height: "100%",
                    }}
                  >
                    {/* Photo */}
                    <div style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: "1.2rem",
                      border: isHovered ? "3px solid rgba(199,125,255,0.6)" : "3px solid rgba(255,255,255,0.12)",
                      boxShadow: isHovered ? "0 8px 24px rgba(123,44,191,0.35)" : "0 4px 16px rgba(0,0,0,0.3)",
                      transition: "all 0.35s ease",
                      transform: isHovered ? "scale(1.06)" : "scale(1)",
                      flexShrink: 0,
                    }}>
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Name */}
                    <h3 style={{
                      fontSize: "1.1rem",
                      fontWeight: "normal",
                      color: c.white,
                      fontFamily: "var(--font-primary)",
                      textTransform: "uppercase",
                      marginBottom: "0.35rem",
                      lineHeight: 1.2,
                    }}>
                      {m.name}
                    </h3>

                    {/* Role */}
                    <p style={{
                      fontSize: "0.8rem",
                      color: c.orange,
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      marginBottom: "0.8rem",
                      lineHeight: 1.4,
                    }}>
                      {m.role}
                    </p>

                    {/* Description */}
                    <p style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "var(--font-sans)",
                      lineHeight: 1.6,
                      marginBottom: "1.2rem",
                      flex: 1,
                    }}>
                      {m.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "1rem" }}>
                      {m.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: "0.65rem",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          background: "rgba(123,44,191,0.15)",
                          color: c.orange,
                          border: "1px solid rgba(199,125,255,0.15)",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "99px",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* LinkedIn */}
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${m.name}`}
                      onMouseEnter={() => setHoveredLinkedin(index)}
                      onMouseLeave={() => setHoveredLinkedin(null)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: isLinkedinHovered ? "#0077b5" : "rgba(255,255,255,0.08)",
                        border: `1px solid ${isLinkedinHovered ? "#0077b5" : "rgba(255,255,255,0.15)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: c.white,
                        transition: "all 0.25s ease",
                        transform: isLinkedinHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section id="testimonios" style={{ padding: "clamp(1rem, 2vw, 2rem) 0 clamp(3rem, 6vw, 6rem)", background: c.cream }}>
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

          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            {[
              { name: "Sofía Martínez", role: "CEO, BioGreen", quote: "Leaders of Tomorrow no solo me dio herramientas, me dio una familia. El nivel de los mentores es otro mundo." },
              { name: "Andrés Silva", role: "Founder, DataImpact", quote: "Llegué buscando contactos y me fui con una visión clara de cómo quería cambiar mi país. Inversión 100% recomendada." },
              { name: "Elena Paz", role: "Directora de Innovación", quote: "Lo que más destaco es la metodología práctica. No es teoría aburrida, es ensuciarse las manos y crear." },
            ].map((t, index) => (
              <div key={t.name} className="testimonial-card-wrapper" style={{ height: "100%" }}>
                <div 
                  className="testimonial-card" 
                  style={{ 
                    height: "100%", 
                    position: "relative",
                    background: c.glassBg,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRadius: "32px",
                    padding: "3rem 2.5rem 2.5rem",
                    border: `1px solid ${c.glassBorder}`,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 24px 60px rgba(123, 44, 191, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(199,125,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.2)";
                    e.currentTarget.style.borderColor = c.glassBorder;
                  }}
                >
                  {/* Decorative Quote Icon */}
                  <div style={{ position: "absolute", top: "2rem", right: "2rem", opacity: 0.1, color: c.orange }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L16.411 14.286C17.705 10.952 18.999 7.619 20.293 4.286H24L20.293 21H14.017ZM3.724 21L6.118 14.286C7.412 10.952 8.706 7.619 10 4.286H13.707L10 21H3.724Z" />
                    </svg>
                  </div>
                  
                  <p style={{ 
                    fontSize: "1.1rem", 
                    lineHeight: 1.7, 
                    color: c.dark, 
                    marginBottom: "2.5rem", 
                    fontWeight: 500,
                    position: "relative",
                    zIndex: 1
                  }}>
                    "{t.quote}"
                  </p>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto" }}>
                    <div style={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: "50%", 
                      background: `linear-gradient(135deg, #7b2cbf, #c77dff)`, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: c.white, 
                      fontWeight: 900, 
                      fontSize: "1.2rem",
                      boxShadow: "0 8px 20px rgba(123, 44, 191, 0.3)"
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: "1.05rem", color: c.dark, marginBottom: "0.2rem" }}>{t.name}</p>
                      <p style={{ fontSize: "0.85rem", color: c.orange, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 300, textAlign: "center", margin: "0 auto" }}>La plataforma líder en formación de liderazgo joven en Iberoamérica. Creando impacto desde 2018.</p>
          </div>
          {[
            { title: "Inmersión", links: ["Currículo", "Mentores", "Admisiones", "Becas"] },
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

          <p style={{ fontSize: "0.9rem" }}>© {new Date().getFullYear()} Leaders of Tomorrow by CBA</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Twitter", "LinkedIn", "Instagram", "Spotify"].map(s => (
              <a key={s} href="#" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ═══════════════════ MENTOR DETAIL MODAL ═══════════════════ */}
      {selectedMentor && (
        <div 
          onClick={() => setSelectedMentor(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2000,
            backgroundColor: "rgba(26,18,8,0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="mentor-modal-content"
            style={{
              background: c.white,
              borderRadius: "32px",
              width: "100%",
              maxWidth: "540px",
              padding: "3rem 2.5rem",
              boxShadow: "0 30px 90px rgba(26,18,8,0.25)",
              border: "1px solid rgba(139, 92, 246,0.1)",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMentor(null)}
              aria-label="Cerrar modal"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(26,18,8,0.05)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: c.dark,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.orange;
                e.currentTarget.style.color = c.white;
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(26,18,8,0.05)";
                e.currentTarget.style.color = c.dark;
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Body */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div 
                className="mentor-monogram" 
                style={{ 
                  background: selectedMentor.gradient,
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.white,
                  fontFamily: "var(--font-primary)",
                  textTransform: "uppercase",
                  fontSize: "2.2rem",
                  fontWeight: "normal",
                  marginBottom: "1.5rem",
                  boxShadow: "0 10px 30px rgba(139, 92, 246,0.2)"
                }}
              >
                {selectedMentor.initials}
              </div>

              <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", fontFamily: "var(--font-primary)", textTransform: "uppercase" }}>{selectedMentor.name}</h3>
              <p className="mentor-role" style={{ fontSize: "1rem", fontFamily: "var(--font-sans)", fontWeight: 700, color: c.orange, marginBottom: "1rem" }}>{selectedMentor.role}</p>
              
              <div className="mentor-tags" style={{ justifyContent: "center", marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {selectedMentor.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="mentor-tag"
                    style={{
                      background: c.orangePale,
                      color: c.orange,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "0.35rem 0.8rem",
                      borderRadius: "99px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      border: `1px solid rgba(139, 92, 246, 0.1)`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ 
                width: "100%", 
                height: "1px", 
                background: "rgba(26,18,8,0.08)", 
                margin: "1.5rem 0" 
              }} />

              <h4 style={{ 
                fontSize: "0.85rem", 
                fontWeight: 800, 
                color: c.dark, 
                textTransform: "uppercase", 
                letterSpacing: "0.08em",
                alignSelf: "flex-start",
                marginBottom: "0.75rem"
              }}>
                Experiencia y Mentoría
              </h4>
              
              <p style={{ 
                fontFamily: "Plus Jakarta Sans",
                fontSize: "1rem", 
                lineHeight: 1.6, 
                color: c.muted, 
                textAlign: "left",
                marginBottom: "2rem",
                width: "100%"
              }}>
                {selectedMentor.details}
              </p>

              <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                <a 
                  href={selectedMentor.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ 
                    flex: 1, 
                    justifyContent: "center",
                    padding: "1rem",
                    borderRadius: "16px",
                    fontFamily: "var(--font-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "0.85rem",
                  }}
                >
                  LinkedIn
                </a>
                
                <button 
                  onClick={() => setSelectedMentor(null)}
                  style={{
                    flex: 1,
                    background: "rgba(26,18,8,0.05)",
                    border: "none",
                    borderRadius: "16px",
                    color: c.dark,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(26,18,8,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(26,18,8,0.05)"}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
