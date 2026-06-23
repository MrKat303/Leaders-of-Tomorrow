"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScheduleItem {
  time: string;
  activity: string;
  type: "intro" | "break" | "workshop" | "lunch" | "checkpoint" | "mindset" | "general" | "pitch" | "party";
  contents: string;
  highlight?: boolean;
}

interface Day {
  id: number;
  name: string;
  date: string;
  theme: string;
  items: ScheduleItem[];
}

const DAYS: Day[] = [
  {
    id: 1,
    name: "Día 1",
    date: "Lunes",
    theme: "PROBLEMA",
    items: [
      { 
        time: "09:00 - 10:00", 
        activity: "Think Like a Founder", 
        type: "intro", 
        contents: "El viaje real de un founder · Inicio → Pivots → Growth → Reward · Qué esperar esta semana",
        highlight: true 
      },
      { time: "10:00 - 11:15", activity: "Empathy & Problem", type: "workshop", contents: "Qué es Design Thinking · Empatizar → Definir · Entrevistas etnográficas · Journey Map · Persona Map" },
      { time: "11:15 - 11:30", activity: "Break", type: "break", contents: "—" },
      { time: "11:30 - 12:30", activity: "Workshop: Problem Hunting Lab", type: "workshop", contents: "Pasar de una idea vaga a un problema real validado" },
      { time: "12:30 - 13:30", activity: "Definir el Problema", type: "general", contents: "Idea vs problema real · Detección de necesidades · Design Brief · Point of View · HMW (How Might We)" },
      { time: "13:30 - 14:15", activity: "Almuerzo", type: "lunch", contents: "—" },
      { time: "14:15 - 15:30", activity: "Checkpoint", type: "checkpoint", contents: "Presentación del problema y feedback estructurado" },
      { time: "15:30 - 16:00", activity: "Mindset & Reflexión del Día", type: "mindset", contents: "Reflexión sobre aprendizajes y construcción de mentalidad emprendedora" }
    ]
  },
  {
    id: 2,
    name: "Día 2",
    date: "Martes",
    theme: "SOLUCIÓN",
    items: [
      { time: "09:00 - 10:00", activity: "Customer Discovery", type: "workshop", contents: "Cliente objetivo · Segmentación · Pain Points · Contexto de uso · Mind Mapping · Criterios" },
      { time: "10:00 - 11:15", activity: "Ideación", type: "workshop", contents: "Brainstorming · SCAMPER · Crazy 8s · Lean Canvas · Selección de soluciones" },
      { time: "11:15 - 11:30", activity: "Break", type: "break", contents: "—" },
      { time: "11:30 - 12:30", activity: "Workshop: Validación de la Solución", type: "workshop", contents: "Q&A con emprendedor de aceleradora" },
      { time: "12:30 - 13:30", activity: "Prototipado Rápido", type: "workshop", contents: "Qué es un prototipo · Wireframes · v0.dev" },
      { time: "13:30 - 14:15", activity: "Almuerzo", type: "lunch", contents: "—" },
      { time: "14:15 - 15:30", activity: "AI Prototyping Lab", type: "workshop", contents: "Uso de Stitch · Google AI Studio · Construcción de prototipos funcionales" },
      { time: "15:30 - 16:30", activity: "Ops & Estructura", type: "general", contents: "Roles del equipo · MVP Roadmap · KPIs para la semana" },
      { time: "16:30 - 17:00", activity: "Checkpoint", type: "checkpoint", contents: "Revisión de avances y feedback" }
    ]
  },
  {
    id: 3,
    name: "Día 3",
    date: "Miércoles",
    theme: "CONSTRUCCIÓN",
    items: [
      { time: "09:00 - 10:00", activity: "Análisis Estratégico", type: "general", contents: "FODA · Entrepreneurial Compass · Microentorno · Macroentorno" },
      { time: "10:00 - 11:15", activity: "Product Build Lab", type: "workshop", contents: "Construcción práctica del producto y ejecución" },
      { time: "11:15 - 11:30", activity: "Break", type: "break", contents: "—" },
      { time: "11:30 - 13:30", activity: "AI Product Studio", type: "workshop", contents: "De wireframe a producto funcional · Antigravity → Vercel · A/B Testing" },
      { time: "13:30 - 14:15", activity: "Almuerzo", type: "lunch", contents: "—" },
      { time: "14:15 - 15:30", activity: "Modelo de Negocio", type: "workshop", contents: "Business Model Canvas · Streams de ingresos · Estructura de costos · Carta Gantt" },
      { time: "15:30 - 16:30", activity: "Consumer Experience", type: "workshop", contents: "Comprensión del usuario y experiencia de cliente" },
      { time: "16:30 - 17:00", activity: "Entregables", type: "general", contents: "Presentación de avances" },
      { time: "20:00 - 21:00", activity: "Lab Vespertino", type: "workshop", contents: "Product Refinement · Iteración y mejora del producto" }
    ]
  },
  {
    id: 4,
    name: "Día 4",
    date: "Jueves",
    theme: "CRECIMIENTO",
    items: [
      { time: "09:00 - 10:00", activity: "Go-To-Market", type: "workshop", contents: "Canales de adquisición · Estrategia de lanzamiento · Benchmark competitivo" },
      { time: "10:00 - 11:15", activity: "Marketing / Redes Sociales", type: "workshop", contents: "Estudio de mercado · Cadena de Valor · Marketing Mix" },
      { time: "11:15 - 11:30", activity: "Break", type: "break", contents: "—" },
      { time: "11:30 - 12:30", activity: "Workshop: Meta Pitch", type: "workshop", contents: "Pitching · Elevator Pitch · Storytelling" },
      { time: "12:30 - 13:30", activity: "Workshop: Buscar Inversión", type: "workshop", contents: "Cómo piensan los inversionistas · Due Diligence básico · Fondos y financiamiento" },
      { time: "13:30 - 14:15", activity: "Almuerzo", type: "lunch", contents: "—" },
      { time: "14:15 - 15:30", activity: "Workshop: ¿Tu Startup Realmente Funciona?", type: "workshop", contents: "Presentación rápida de equipos · Feedback experto · Validación de hipótesis" },
      { time: "15:30 - 16:00", activity: "Mindset · Gestión del Estrés", type: "mindset", contents: "Herramientas para liderazgo, resiliencia y manejo de presión" }
    ]
  },
  {
    id: 5,
    name: "Día 5",
    date: "Viernes",
    theme: "DEMO DAY",
    items: [
      { time: "09:00 - 10:00", activity: "Ensayos Pitch Final", type: "pitch", contents: "Preparación de presentaciones finales" },
      { time: "10:00 - 12:30", activity: "Checklist Final / Pre-Demo", type: "pitch", contents: "Revisión de entregables, pitch y producto" },
      { time: "12:30 - 13:30", activity: "Workshop: ¿Y Qué Sigue?", type: "general", contents: "Continuidad de proyectos · Comunidad · Próximas oportunidades" },
      { time: "13:30 - 14:15", activity: "Almuerzo", type: "lunch", contents: "—" },
      { time: "14:30 - 15:00", activity: "Mindset · Gestión del Estrés", type: "mindset", contents: "Preparación mental para Demo Day" },
      { time: "15:00 - 18:00", activity: "Pitch Demos", type: "pitch", contents: "Presentación oficial frente a jurado" },
      { time: "18:00", activity: "Cóctel", type: "party", contents: "Networking" },
      { time: "18:00", activity: "Anuncio del Ganador", type: "pitch", contents: "Premiación" },
      { time: "19:00", activity: "Apertura, Palabras de Autoridades y Charlas", type: "general", contents: "Cierre institucional y speakers invitados" }
    ]
  }
];

const c = {
  purple: "#7b2cbf",
  purpleLight: "#c77dff",
  purplePale: "rgba(123, 44, 191, 0.15)",
  purpleGlow: "rgba(199, 125, 255, 0.25)",
  white: "#ffffff",
  textMuted: "#9a8fb5",
  glassBg: "rgba(255, 255, 255, 0.05)",
  glassBorder: "rgba(255, 255, 255, 0.09)",
  glassHover: "rgba(255, 255, 255, 0.12)",
};

const getIcon = (type: string) => {
  switch (type) {
    // 1. Módulos
    case "intro":
    case "mindset":
    case "general":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    // 2. Workshops
    case "workshop":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <line x1="10" y1="22" x2="14" y2="22" />
        </svg>
      );
    // 3. Checkpoints
    case "checkpoint":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      );
    // 4. Comida (Break, Lunch)
    case "break":
    case "lunch":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    // 5. Demo Day / Pitch / Party
    case "pitch":
    case "party":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

const getColor = (type: string) => {
  switch (type) {
    case "intro":
    case "mindset":
    case "general":
      return "#ffaa00"; // Módulos
    case "workshop":
      return "#c77dff"; // Workshops
    case "checkpoint":
      return "#4cc9f0"; // Checkpoints
    case "break":
    case "lunch":
      return "#ffafcc"; // Comida
    case "pitch":
    case "party":
      return "#f72585"; // Demo Day
    default:
      return "#e8e0f0";
  }
};

const formatContenidos = (text: string) => {
  if (!text || text === "—") return null;

  const parts = text.split("·").map((p) => p.trim());

  return (
    <div className="contents-flex-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.6rem" }}>
      {parts.map((part, idx) => {
        if (part.includes("→")) {
          const steps = part.split("→").map((s) => s.trim());
          return (
            <div
              key={idx}
              className="content-step-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(123, 44, 191, 0.12)",
                border: "1px solid rgba(199, 125, 255, 0.2)",
                padding: "0.3rem 0.65rem",
                borderRadius: "10px",
                fontSize: "0.78rem",
                color: "#e8e0f0",
                fontWeight: 500,
              }}
            >
              {steps.map((step, sIdx) => (
                <span key={sIdx} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  {step}
                  {sIdx < steps.length - 1 && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c77dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          );
        }

        return (
          <span
            key={idx}
            className="content-tag-pill"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.09)",
              padding: "0.3rem 0.65rem",
              borderRadius: "10px",
              fontSize: "0.78rem",
              color: "#c0b8d6",
              fontWeight: 500,
            }}
          >
            {part}
          </span>
        );
      })}
    </div>
  );
};

export default function ProgramaPage() {
  const [activeDay, setActiveDay] = useState(1);
  const container = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Intro animations
  useGSAP(() => {
    gsap.from(".hero-title-line", {
      y: "120%",
      rotation: 3,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out",
    });

    gsap.from(".hero-sub", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".tabs-wrapper", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });

    gsap.from(".day-banner-card", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power3.out",
    });

    // Parallax background
    gsap.to(".parallax-bg-programa", {
      y: "-20vh",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: container });

  const isInitialMount = useRef(true);

  // Tab change timeline animation
  useEffect(() => {
    const cards = timelineRef.current?.querySelectorAll(".timeline-card");
    if (cards && cards.length > 0) {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.8, stagger: 0.08, ease: "power3.out" }
        );
      } else {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" }
        );
      }
    }
  }, [activeDay]);

  const selectedDayData = DAYS.find((d) => d.id === activeDay) || DAYS[0];

  return (
    <div ref={container} style={{ minHeight: "100vh", position: "relative", overflowX: "hidden", backgroundColor: "transparent" }}>
      {/* Background Image: city.png */}
      <div 
        className="parallax-bg-programa"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "120vh",
          backgroundImage: "linear-gradient(rgba(10, 10, 18, 0.4), rgba(10, 10, 18, 0.55)), url('/city.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          zIndex: -2,
          pointerEvents: "none",
          willChange: "transform"
        }}
      />

      <Navbar solid={true} />

      <main className="program-main-container" style={{ padding: "140px 1.5rem 80px", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              lineHeight: 1,
              color: c.white,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              fontWeight: 800,
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ display: "block" }}>
              <span className="hero-title-line" style={{ display: "block" }}>Programa y</span>
            </span>
            <span style={{ display: "block", marginTop: "0.1em" }}>
              <span className="hero-title-line" style={{ display: "inline-block" }}>Contenidos</span>
            </span>
          </h1>
        </div>

        {/* Tab Selection (Optimized horizontal scrolling wrapper on mobile) */}
        <div 
          className="tabs-wrapper"
          style={{
            background: "rgba(90, 24, 154, 0.25)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid rgba(199, 125, 255, 0.2)`,
            borderRadius: "20px",
            padding: "0.3rem",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.3rem",
            maxWidth: "700px",
            margin: "0 auto 3rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {DAYS.map((day) => {
            const isActive = day.id === activeDay;
            return (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className="day-tab-btn"
                style={{
                  background: isActive ? "linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)" : "transparent",
                  color: isActive ? c.white : "rgba(255,255,255,0.7)",
                  border: isActive ? "1px solid rgba(224,170,255,0.3)" : "1px solid transparent",
                  borderRadius: "16px",
                  padding: "0.6rem 0.4rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: isActive ? "scale(1.02) translateY(-2px)" : "scale(1)",
                  boxShadow: isActive ? "0 8px 20px rgba(123,44,191,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                }}
              >
                <span 
                  className="day-tab-title"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "2px",
                    fontWeight: isActive ? 800 : 600,
                  }}
                >
                  {day.name}
                </span>
                <span 
                  className="day-tab-subtitle"
                  style={{
                    fontSize: "0.65rem",
                    opacity: isActive ? 1 : 0.8,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {day.date}
                </span>
              </button>
            );
          })}
        </div>



        {/* Selected Day Banner */}
        <div 
          className="day-banner-card"
          style={{
            background: "transparent",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `2px solid #ffffff`,
            borderRadius: "20px",
            padding: "1.2rem 1.5rem",
            textAlign: "center",
            marginBottom: "2rem",
            boxShadow: "none",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Shine overlay */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)", pointerEvents: "none", borderRadius: "inherit" }} />
          
          <p 
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "0.5rem",
              position: "relative",
              zIndex: 1
            }}
          >
            Enfoque de la Jornada
          </p>
          <h2 
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              margin: 0,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "0.08em",
              fontWeight: 900,
              position: "relative",
              zIndex: 1,
              textShadow: "0 2px 16px rgba(0,0,0,0.3)"
            }}
          >
            {selectedDayData.theme}
          </h2>
        </div>

        {/* Timeline List */}
        <div ref={timelineRef} style={{ display: "grid", gap: "1rem", position: "relative" }}>

          {selectedDayData.items.map((item, index) => {
            const itemColor = getColor(item.type);
            const isDivider = item.type === "break" || item.type === "lunch";
            
            if (isDivider) {
              return (
                <div
                  key={index}
                  className="timeline-card timeline-card-divider"
                  style={{
                    background: "transparent",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "2px dashed rgba(255, 255, 255, 0.5)",
                    borderRadius: "20px",
                    padding: "1rem 2.2rem",
                    display: "grid",
                    gridTemplateColumns: "110px 1fr",
                    gap: "1.5rem",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.3s ease",
                    boxShadow: "none",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.8)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {/* Time Indicator */}
                  <span 
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {item.time}
                  </span>

                  {/* Activity */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div 
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {getIcon(item.type)}
                    </div>
                    <span 
                      style={{
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontFamily: "var(--font-primary)"
                      }}
                    >
                      {item.activity}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="timeline-card"
                style={{
                  background: "transparent",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  border: "2px solid #ffffff",
                  borderRadius: "24px",
                  padding: "1.8rem 2.2rem",
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: "1.5rem",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                  transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                  boxShadow: "none",
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Subtle highlight glow */}
                {item.highlight && <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "inherit", background: "radial-gradient(circle at top left, rgba(224,170,255,0.15), transparent 60%)", pointerEvents: "none" }} />}
                {/* Time Indicator */}
                <div className="card-time-column" style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "6px" }}>
                  <div 
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: itemColor,
                      boxShadow: `0 0 10px ${itemColor}`,
                      flexShrink: 0,
                    }}
                  />
                  <span 
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {item.time.split(" - ")[0]}
                  </span>
                </div>

                {/* Main Content Area */}
                <div className="card-content-column" style={{ display: "flex", gap: "1.25rem", alignItems: "start" }}>
                  {/* Icon Container */}
                  <div 
                    className="card-icon-container"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "14px",
                      backgroundColor: `rgba(${parseInt(itemColor.slice(1,3), 16) || 123}, ${parseInt(itemColor.slice(3,5), 16) || 44}, ${parseInt(itemColor.slice(5,7), 16) || 191}, 0.12)`,
                      border: `1px solid rgba(${parseInt(itemColor.slice(1,3), 16) || 123}, ${parseInt(itemColor.slice(3,5), 16) || 44}, ${parseInt(itemColor.slice(5,7), 16) || 191}, 0.22)`,
                      color: itemColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {getIcon(item.type)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem" }}>
                      <h3 
                        style={{
                          fontSize: "1.3rem",
                          color: c.white,
                          letterSpacing: "0.01em",
                          lineHeight: 1.2,
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {item.activity}
                      </h3>
                      
                      {/* Highlight / Kickoff Badge */}
                      {item.highlight && (
                        <span 
                          style={{
                            fontSize: "0.6rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            fontWeight: 800,
                            padding: "0.2rem 0.5rem",
                            borderRadius: "6px",
                            background: "linear-gradient(90deg, #ffaa00, #ff007f)",
                            color: "#fff",
                            border: "none",
                          }}
                        >
                          Kickoff
                        </span>
                      )}

                      {/* Type Badge */}
                      {!item.highlight && (
                        <span 
                          style={{
                            fontSize: "0.6rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            fontWeight: 800,
                            padding: "0.2rem 0.5rem",
                            borderRadius: "6px",
                            background: `rgba(${parseInt(itemColor.slice(1,3), 16) || 123}, ${parseInt(itemColor.slice(3,5), 16) || 44}, ${parseInt(itemColor.slice(5,7), 16) || 191}, 0.08)`,
                            color: itemColor,
                            border: `1px solid rgba(${parseInt(itemColor.slice(1,3), 16) || 123}, ${parseInt(itemColor.slice(3,5), 16) || 44}, ${parseInt(itemColor.slice(5,7), 16) || 191}, 0.15)`,
                          }}
                        >
                          {item.type}
                        </span>
                      )}
                    </div>

                    {/* Syllabus Tags */}
                    {formatContenidos(item.contents)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            href="/apply"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#7b2cbf",
              color: c.white,
              fontWeight: 800,
              fontSize: "1.05rem",
              padding: "1rem 2.5rem",
              borderRadius: 9999,
              textDecoration: "none",
              boxShadow: "0 12px 40px rgba(123,44,191,0.4)",
              transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
              fontFamily: "var(--font-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5a189a";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 16px 36px rgba(123,44,191,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#7b2cbf";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(123,44,191,0.4)";
            }}
          >
            Quiero aplicar ahora
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer style={{ background: "#5A189A", color: "rgba(255,255,255,0.9)", padding: "clamp(3rem, 6vw, 6rem) 1.25rem clamp(1.5rem, 3vw, 3rem)", borderTop: `1px solid rgba(255, 255, 255, 0.15)` }}>
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
              <p style={{ fontWeight: 800, color: "#ffffff", marginBottom: "1.8rem", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", width: "100%" }}>{col.title}</p>
              {col.links.map((link) => {
                const isPodcast = link === "Podcast";
                const LinkComponent = isPodcast ? Link : "a";
                return (
                  <LinkComponent
                    key={link}
                    href={isPodcast ? "/podcast" : "#"}
                    style={{ display: "inline-block", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", marginBottom: "0.8rem", transition: "all 0.3s", textAlign: "center" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {link}
                  </LinkComponent>
                );
              })}
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ borderTop: `1px solid rgba(255, 255, 255, 0.15)`, paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", maxWidth: 1200, margin: "0 auto" }}>

          <p style={{ fontSize: "0.9rem" }}>© {new Date().getFullYear()} Leaders of Tomorrow by CBA</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Twitter", "LinkedIn", "Instagram", "Spotify"].map(s => (
              <a key={s} href="#" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Media queries for pixel-perfect responsiveness */}
      <style jsx global>{`
        /* Mobile horizontal scroll selector bar */
        @media (max-width: 768px) {
          .program-main-container {
            padding: 100px 1rem 60px !important;
          }

          .tabs-wrapper {
            display: flex !important;
            overflow-x: auto !important;
            scroll-behavior: smooth;
            scrollbar-width: none;
            -ms-overflow-style: none;
            white-space: nowrap !important;
            gap: 0.5rem !important;
            padding: 0.4rem !important;
            border-radius: 20px !important;
          }

          .tabs-wrapper::-webkit-scrollbar {
            display: none !important;
          }

          .day-tab-btn {
            flex: 0 0 100px !important;
            padding: 0.6rem 0.5rem !important;
            border-radius: 14px !important;
          }

          .day-tab-title {
            font-size: 0.85rem !important;
          }

          .day-tab-subtitle {
            font-size: 0.7rem !important;
          }

          .day-banner-card {
            padding: 1.25rem 1.5rem !important;
            border-radius: 20px !important;
            margin-bottom: 1.5rem !important;
          }

          /* Remove timeline connecting line to save mobile space */
          .timeline-connector-line {
            display: none !important;
          }

          /* Convert grid layout to simple stack layout on mobile cards */
          .timeline-card {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
            padding: 1.25rem 1.25rem !important;
            border-radius: 20px !important;
          }

          .timeline-card-divider {
            grid-template-columns: 1fr !important;
            padding: 0.6rem 1.25rem !important;
          }

          .card-time-column {
            margin-top: 0 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding-bottom: 0.5rem !important;
          }

          .card-content-column {
            gap: 0.75rem !important;
          }

          .card-icon-container {
            width: 36px !important;
            height: 36px !important;
            border-radius: 10px !important;
          }

          .card-icon-container svg {
            width: 16px !important;
            height: 16px !important;
          }

          .content-step-pill,
          .content-tag-pill {
            font-size: 0.72rem !important;
            padding: 0.25rem 0.5rem !important;
            border-radius: 8px !important;
          }

          .contents-flex-wrap {
            gap: 0.35rem !important;
            margin-top: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
