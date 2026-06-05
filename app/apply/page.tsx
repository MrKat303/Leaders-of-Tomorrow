"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const mobileStyles = `
  @media (max-width: 600px) {
    .apply-grid-2 {
      grid-template-columns: 1fr !important;
    }
    .apply-main {
      padding: 100px 1rem 60px !important;
    }
    .apply-card {
      padding: 1.5rem 1.2rem !important;
      border-radius: 18px !important;
    }
    .apply-title {
      font-size: 2rem !important;
    }
    .apply-h2 {
      font-size: 1.2rem !important;
    }
    .apply-option-label {
      padding: 0.7rem 0.8rem !important;
      font-size: 0.9rem !important;
    }
    .apply-nav-btn {
      padding: 0.9rem !important;
      font-size: 0.95rem !important;
    }
  }
`;

const c = {
  orange: "#8B5CF6",
  orangeDark: "#7C3AED",
  cream: "#F9F4E1",
  dark: "#1A1208",
  muted: "#7A5C4F",
  white: "#ffffff",
  forest: "#43a574",
};

const step3Questions = [
  {
    id: "q1",
    q: "Un integrante del equipo hace lo mínimo posible. Cuando le asignan tareas, las entrega incompletas o tarde. El resto del equipo está cargando con más trabajo. ¿Qué haces?",
    options: [
      "A. Hago su parte yo para que el proyecto no sufra.",
      "B. Lo confronto frente al equipo para que todos vean el problema.",
      "C. Hablo con él en privado, entiendo qué le pasa y acordamos una tarea concreta que pueda cumplir.",
      "D. Lo reporto al facilitador de inmediato."
    ]
  },
  {
    id: "q2",
    q: "Dos integrantes del equipo tienen visiones opuestas y el conflicto está paralizando el proyecto. ¿Qué haces?",
    options: [
      "A. Apoyo a quien tenga más razón y listo.",
      "B. Propongo que expongan sus argumentos y el equipo decida con criterios claros.",
      "C. Evito el conflicto y cambio el tema.",
      "D. Llamo a un adulto para que resuelva."
    ]
  },
  {
    id: "q3",
    q: "Te eligen líder de un proyecto grupal pero nadie quería ese rol. El equipo está desmotivado. ¿Cómo empiezas?",
    options: [
      "A. Reparto tareas y exijo que se cumplan.",
      "B. Organizo una conversación para entender qué le importa a cada uno y conectarlo con el proyecto.",
      "C. Hago todo yo para asegurarme de que salga bien.",
      "D. Propongo votar un nuevo líder."
    ]
  },
  {
    id: "q4",
    q: "El proyecto que liderabas fracasó. El equipo está desanimado y el tutor pide explicaciones. ¿Qué dices?",
    options: [
      "A. Explico qué errores cometió el equipo.",
      "B. Asumo la responsabilidad, explico qué salió mal y qué haría diferente.",
      "C. Digo que las circunstancias no permitieron un buen resultado.",
      "D. Evito la reunión."
    ]
  },
  {
    id: "q5",
    q: "Tu equipo tiene dos propuestas para resolver el mismo problema. Una es más innovadora pero riesgosa; la otra es más segura pero menos original. ¿Qué recomiendas?",
    options: [
      "A. La segura, siempre es mejor no arriesgarse.",
      "B. La innovadora, sin riesgo no hay recompensa.",
      "C. Analizo qué criterios importan más en este contexto y recomiendo según eso, explicando el razonamiento.",
      "D. Dejo que el equipo decida sin dar mi opinión."
    ]
  },
  {
    id: "q6",
    q: "Tu equipo lleva semanas trabajando en una solución. A último momento descubres que ya existe algo muy similar. ¿Qué decides?",
    options: [
      "A. Ocultarlo para no desmoralizar al equipo.",
      "B. Presentarlo igual, el esfuerzo igual vale.",
      "C. Informar al equipo, analizar qué tiene de diferente tu propuesta y destacar eso.",
      "D. Empezar todo de cero."
    ]
  },
  {
    id: "q7",
    q: "Tu idea inicial no funcionó como esperabas. ¿Cómo reaccionas?",
    options: [
      "A. Me desanimo y busco otra idea desde cero.",
      "B. Analizo qué falló específicamente y ajusto esa parte.",
      "C. Pregunto a otros qué harían y sigo su consejo.",
      "D. Insisto con la misma idea porque creo que es buena."
    ]
  },
  {
    id: "q8",
    q: "Un compañero llega al trabajo grupal muy mal humorado y contesta cortante. Esto afecta el ambiente del equipo. ¿Qué haces?",
    options: [
      "A. Lo ignoro y sigo trabajando.",
      "B. Le digo frente a todos que está afectando al equipo.",
      "C. En un momento tranquilo le pregunto cómo está, sin drama.",
      "D. Le pido al tutor que intervenga."
    ]
  },
  {
    id: "q9",
    q: "Recibes una crítica fuerte a tu trabajo frente a todo el grupo. ¿Cómo reaccionas?",
    options: [
      "A. Me defiendo inmediatamente explicando mis razones.",
      "B. Me quedo callado/a y me siento mal por un buen rato.",
      "C. Escucho, pregunto qué mejoraría específicamente y lo tomo como aprendizaje.",
      "D. Acepto todo sin cuestionarlo aunque no esté de acuerdo."
    ]
  },
  {
    id: "q10",
    q: "Estás bajo mucha presión y sientes que no puedes con todo. ¿Qué haces?",
    options: [
      "A. Sigo adelante sin decirle nada a nadie.",
      "B. Pido ayuda o delego alguna tarea, reconociendo mis límites.",
      "C. Me desconecto del proyecto hasta sentirme mejor.",
      "D. Culpo a otros por la carga excesiva."
    ]
  },
  {
    id: "q11",
    q: "Debes convencer a alguien que no está de acuerdo contigo. ¿Qué estrategia usas?",
    options: [
      "A. Repito mi argumento con más fuerza hasta que entienda.",
      "B. Primero entiendo su punto de vista, luego busco puntos en común y desde ahí construyo.",
      "C. Lo dejo hablar, pero no cambio mi postura.",
      "D. Cedo para evitar el conflicto."
    ]
  }
];

export default function ApplyPage() {
  const container = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hasLiderado, setHasLiderado] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [familySupport, setFamilySupport] = useState("");
  const [attendance, setAttendance] = useState("");
  const [extracurriculares, setExtracurriculares] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const totalSteps = 4;

  const toggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : prev.length < 2 ? [...prev, area] : prev
    );
  };

  const toggleExtra = (item: string) => {
    setExtracurriculares(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleOptionChange = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  useGSAP(() => {
    gsap.from(".form-card", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });
    gsap.from(".form-header > *", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: container });

  const nextStep = () => {
    if (step >= totalSteps) return;
    
    // Quick validation for step 3
    if (step === 3) {
      const unanswered = step3Questions.some(q => !answers[q.id]);
      if (unanswered) {
        alert("Por favor, responde todas las preguntas antes de continuar.");
        return;
      }
    }

    gsap.to(".step-content", {
      x: -20,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        gsap.fromTo(".step-content", { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
      }
    });
  };

  const prevStep = () => {
    if (step <= 1) return;
    gsap.to(".step-content", {
      x: 20,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setStep(step - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        gsap.fromTo(".step-content", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
      return;
    }
    setSubmitted(true);
    gsap.to(".form-card", {
      scale: 0.98,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        gsap.to(".form-card", { scale: 1, opacity: 1, duration: 0.5 });
      }
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.95rem 1.25rem",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
    background: "rgba(0,0,0,0.25)",
    color: c.white
  };

  const selectStyle = {
    width: "100%",
    padding: "0.95rem 2.8rem 0.95rem 1.25rem",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
    background: "rgba(0,0,0,0.25)",
    color: c.white,
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    MozAppearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    cursor: "pointer",
  };

  const labelStyle = {
    display: "block",
    fontWeight: 700,
    marginBottom: "0.5rem",
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em"
  };

  const handleFocus = (e: any) => {
    e.target.style.borderColor = c.orange;
    e.target.style.background = "rgba(0,0,0,0.4)";
    e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.2)";
  };

  const handleBlur = (e: any) => {
    e.target.style.borderColor = "rgba(255,255,255,0.15)";
    e.target.style.background = "rgba(0,0,0,0.25)";
    e.target.style.boxShadow = "none";
  };

  const stepTitles = [
    "1. Datos personales",
    "2. Intereses, experiencia y disponibilidad",
    "3. Situaciones de desafío",
    "4. Reflexión"
  ];

  return (
    <div ref={container} style={{ backgroundColor: "transparent", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{mobileStyles}</style>
      <Navbar solid={true} />
      
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(rgba(26, 18, 8, 0.4), rgba(26, 18, 8, 0.65)), url('/beach.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />
      <div style={{ position: "absolute", top: "15%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(139,92,246,0.15)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(123,44,191,0.1)", filter: "blur(80px)", pointerEvents: "none" }} />

      <main className="apply-main" style={{ padding: "120px 1.5rem 80px", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="form-header" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 className="apply-title" style={{ fontSize: "2.8rem", color: c.white, marginBottom: "0.75rem", lineHeight: 1.1, fontWeight: 400 }}>Únete ahora</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.5rem" }}>Buscamos a los futuros líderes de Chile.</p>
        </div>

        <div className="apply-card form-card" style={{ 
          background: "rgba(26, 18, 40, 0.35)", 
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "24px", 
          padding: "2.2rem", 
          boxShadow: "0 24px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {step > 0 && (
                <>
                  {/* Progress Bar */}
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    {[...Array(totalSteps)].map((_, i) => (
                      <div key={i} style={{ flex: 1, height: "4px", background: step > i ? c.orange : "rgba(255,255,255,0.1)", borderRadius: "2px", transition: "0.3s" }} />
                    ))}
                  </div>
                  
                  <h2 className="apply-h2" style={{ color: c.white, fontSize: "1.4rem", fontWeight: 600, marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
                    {stepTitles[step - 1]}
                  </h2>
                </>
              )}

              <div className="step-content">
                
                {/* STEP 0: INTRO */}
                {step === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "1rem 0 2rem" }}>
                    <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(139, 92, 246, 0.15)", border: "1px solid rgba(139, 92, 246, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: c.orange }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    </div>
                    <h2 style={{ fontSize: "2rem", color: c.white, marginBottom: "1.5rem", fontWeight: 600 }}>Antes de comenzar</h2>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "550px", margin: "0 auto" }}>
                      <p>Este cuestionario es parte del proceso de selección del programa <strong>Leaders of Tomorrow</strong>, enfocado en IA y emprendimiento para jóvenes.</p>
                      <p>No hay respuestas correctas ni incorrectas. Queremos conocerte tal como eres: tu forma de pensar, tus intereses y cómo enfrentas los desafíos.</p>
                      <p>Los postulantes seleccionados serán contactados directamente por WhatsApp con los próximos pasos.</p>
                    </div>
                    
                    <button type="button" onClick={nextStep} style={{ 
                      marginTop: "2.5rem", width: "100%", maxWidth: "300px", background: c.orange, color: "white", padding: "1.1rem", 
                      borderRadius: "14px", border: "none", fontWeight: 800, fontSize: "1.1rem", cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)", transition: "all 0.2s"
                    }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                      Empezar
                    </button>
                  </div>
                )}
                
                {/* STEP 1: DATOS PERSONALES */}
                {step === 1 && (
                  <div style={{ display: "grid", gap: "1.5rem" }}>
                    <div className="apply-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label htmlFor="name" style={labelStyle}>Nombre Completo *</label>
                        <input type="text" id="name" required placeholder="Tu nombre" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                      <div>
                        <label htmlFor="age" style={labelStyle}>Edad *</label>
                        <input type="number" id="age" required placeholder="Ej: 16" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                    </div>
                    
                    <div className="apply-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label htmlFor="school" style={labelStyle}>Colegio *</label>
                        <input type="text" id="school" required placeholder="Tu colegio" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                      <div>
                        <label htmlFor="course" style={labelStyle}>Curso *</label>
                        <select id="course" required style={selectStyle} onFocus={handleFocus} onBlur={handleBlur}>
                          <option value="" style={{ color: "black" }}>Selecciona</option>
                          <option value="1" style={{ color: "black" }}>1ro Medio</option>
                          <option value="2" style={{ color: "black" }}>2do Medio</option>
                          <option value="3" style={{ color: "black" }}>3ro Medio</option>
                          <option value="4" style={{ color: "black" }}>4to Medio</option>
                        </select>
                      </div>
                    </div>

                    <div className="apply-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label htmlFor="region" style={labelStyle}>Región *</label>
                        <select id="region" required style={selectStyle} onFocus={handleFocus} onBlur={handleBlur}>
                          <option value="" style={{ color: "black" }}>Selecciona</option>
                          <option value="Arica y Parinacota" style={{ color: "black" }}>Arica y Parinacota</option>
                          <option value="Tarapacá" style={{ color: "black" }}>Tarapacá</option>
                          <option value="Antofagasta" style={{ color: "black" }}>Antofagasta</option>
                          <option value="Atacama" style={{ color: "black" }}>Atacama</option>
                          <option value="Coquimbo" style={{ color: "black" }}>Coquimbo</option>
                          <option value="Valparaíso" style={{ color: "black" }}>Valparaíso</option>
                          <option value="Metropolitana" style={{ color: "black" }}>Metropolitana</option>
                          <option value="O'Higgins" style={{ color: "black" }}>O'Higgins</option>
                          <option value="Maule" style={{ color: "black" }}>Maule</option>
                          <option value="Ñuble" style={{ color: "black" }}>Ñuble</option>
                          <option value="Biobío" style={{ color: "black" }}>Biobío</option>
                          <option value="La Araucanía" style={{ color: "black" }}>La Araucanía</option>
                          <option value="Los Ríos" style={{ color: "black" }}>Los Ríos</option>
                          <option value="Los Lagos" style={{ color: "black" }}>Los Lagos</option>
                          <option value="Aysén" style={{ color: "black" }}>Aysén</option>
                          <option value="Magallanes" style={{ color: "black" }}>Magallanes</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comuna" style={labelStyle}>Comuna *</label>
                        <input type="text" id="comuna" required placeholder="Ej: Providencia" autoComplete="address-level2" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                    </div>

                    <div className="apply-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label htmlFor="email" style={labelStyle}>Correo *</label>
                        <input type="email" id="email" required placeholder="tu@email.com" autoComplete="email" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                      <div>
                        <label htmlFor="phone" style={labelStyle}>Teléfono *</label>
                        <input type="tel" id="phone" required placeholder="+56 9..." autoComplete="tel" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="gender" style={labelStyle}>Género (opcional)</label>
                      <select id="gender" style={selectStyle} onFocus={handleFocus} onBlur={handleBlur}>
                        <option value="" style={{ color: "black" }}>Selecciona</option>
                        <option value="Femenino" style={{ color: "black" }}>Femenino</option>
                        <option value="Masculino" style={{ color: "black" }}>Masculino</option>
                        <option value="No binario" style={{ color: "black" }}>No binario</option>
                        <option value="Otro" style={{ color: "black" }}>Otro</option>
                        <option value="Prefiero no decirlo" style={{ color: "black" }}>Prefiero no decirlo</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 2: INTERESES Y EXPERIENCIA */}
                {step === 2 && (
                  <div style={{ display: "grid", gap: "2rem" }}>
                    <div>
                      <label htmlFor="tiempo_libre" style={labelStyle}>¿Qué te gusta hacer en tu tiempo libre? *</label>
                      <textarea id="tiempo_libre" required rows={3} placeholder="Cuéntanos sobre tus pasatiempos..." style={{ ...inputStyle, resize: "vertical" }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="actividades" style={labelStyle}>¿Has participado en actividades extracurriculares, concursos, clubes o proyectos fuera del colegio? *</label>
                      <select id="actividades" required onChange={(e) => setHasLiderado(e.target.value)} value={hasLiderado} style={selectStyle} onFocus={handleFocus} onBlur={handleBlur}>
                        <option value="" style={{ color: "black" }}>Selecciona</option>
                        <option value="Sí" style={{ color: "black" }}>Sí</option>
                        <option value="No" style={{ color: "black" }}>No</option>
                      </select>
                    </div>

                    {hasLiderado === "Sí" && (
                      <div>
                        <label htmlFor="actividades_desc" style={labelStyle}>Si respondiste que sí, cuéntanos brevemente qué hiciste (opcional)</label>
                        <textarea id="actividades_desc" rows={3} placeholder="Ej: Participé en un voluntariado, armé un club de debate..." style={{ ...inputStyle, resize: "vertical" }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                      </div>
                    )}

                    <div>
                      <label style={labelStyle}>¿Qué actividades extracurriculares realizas?</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginTop: "0.5rem" }}>
                        {["Voluntariado", "Emprendimiento", "Deportes", "Debate", "Ciencias", "Arte", "Centros de estudiantes", "Otro"].map(act => (
                          <label key={act} onClick={() => toggleExtra(act)} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", padding: "0.65rem 0.9rem", background: extracurriculares.includes(act) ? "rgba(139, 92, 246, 0.2)" : "rgba(0,0,0,0.2)", borderRadius: "10px", border: extracurriculares.includes(act) ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent", transition: "all 0.2s", color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
                            <input type="checkbox" checked={extracurriculares.includes(act)} readOnly style={{ accentColor: c.orange, width: "16px", height: "16px", flexShrink: 0 }} />
                            {act}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>¿Cuál de estas áreas te interesa más explorar durante el bootcamp? Elige hasta 2. *</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginTop: "0.5rem" }}>
                        {["Inteligencia artificial", "Emprendimiento e innovación", "Diseño de soluciones sociales", "Liderazgo y habilidades blandas", "Programación o desarrollo", "Comunicación y presentación de ideas", "No estoy seguro/a aún"].map(area => (
                          <label key={area} onClick={() => toggleArea(area)} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: selectedAreas.includes(area) || selectedAreas.length < 2 ? "pointer" : "not-allowed", padding: "0.65rem 0.9rem", background: selectedAreas.includes(area) ? "rgba(139, 92, 246, 0.2)" : "rgba(0,0,0,0.2)", borderRadius: "10px", border: selectedAreas.includes(area) ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent", transition: "all 0.2s", color: "rgba(255,255,255,0.9)", fontSize: "0.9rem", opacity: !selectedAreas.includes(area) && selectedAreas.length >= 2 ? 0.4 : 1 }}>
                            <input type="checkbox" checked={selectedAreas.includes(area)} readOnly style={{ accentColor: c.orange, width: "16px", height: "16px", flexShrink: 0 }} />
                            {area}
                          </label>
                        ))}
                      </div>
                      {selectedAreas.length >= 2 && <p style={{ color: "rgba(255,200,100,0.8)", fontSize: "0.8rem", marginTop: "0.5rem" }}>Máximo 2 áreas seleccionadas.</p>}
                    </div>

                    <div>
                      <label style={labelStyle}>¿Tienes el apoyo de tu familia o tutor/a para participar en el programa? *</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginTop: "0.5rem" }}>
                        {[
                          "Sí, tienen todo el apoyo",
                          "Sí, aunque aún no les he contado los detalles",
                          "Aún no sé, debo conversarlo con ellos"
                        ].map(opt => (
                          <label key={opt} onClick={() => setFamilySupport(opt)} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", padding: "0.7rem 1rem", background: familySupport === opt ? "rgba(139, 92, 246, 0.2)" : "rgba(0,0,0,0.2)", borderRadius: "10px", border: familySupport === opt ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent", transition: "all 0.2s", color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
                            <input type="radio" name="family" value={opt} checked={familySupport === opt} readOnly style={{ accentColor: c.orange, width: "16px", height: "16px", flexShrink: 0 }} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>El Bootcamp se realizará presencialmente en Santiago durante una semana completa. En caso de ser seleccionado/a, ¿qué tan posible sería tu asistencia? *</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginTop: "0.5rem" }}>
                        {[
                          "Sí, podría asistir sin inconvenientes.",
                          "Sí, podría asistir, pero necesitaría apoyo para transporte y/o alojamiento.",
                          "Tal vez, depende de mi situación en ese momento.",
                          "No podría asistir presencialmente."
                        ].map(opt => (
                          <label key={opt} onClick={() => setAttendance(opt)} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", padding: "0.7rem 1rem", background: attendance === opt ? "rgba(139, 92, 246, 0.2)" : "rgba(0,0,0,0.2)", borderRadius: "10px", border: attendance === opt ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent", transition: "all 0.2s", color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
                            <input type="radio" name="attendance" value={opt} checked={attendance === opt} readOnly style={{ accentColor: c.orange, width: "16px", height: "16px", flexShrink: 0 }} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: SITUACIONES DE DESAFIO */}
                {step === 3 && (
                  <div style={{ display: "grid", gap: "2.5rem" }}>
                    {step3Questions.map((q, idx) => (
                      <div key={q.id} style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <p style={{ color: "white", fontSize: "1rem", fontWeight: 600, marginBottom: "1.2rem", lineHeight: 1.5 }}>
                          {idx + 1}. {q.q}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                          {q.options.map((opt, optIdx) => (
                            <label key={optIdx} className="apply-option-label" style={{ 
                              display: "flex", alignItems: "flex-start", gap: "0.8rem", cursor: "pointer", 
                              padding: "0.8rem 1rem", background: answers[q.id] === opt ? "rgba(139, 92, 246, 0.2)" : "rgba(0,0,0,0.2)", 
                              borderRadius: "10px", border: answers[q.id] === opt ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent",
                              transition: "all 0.2s"
                            }}>
                              <input 
                                type="radio" 
                                name={q.id} 
                                value={opt} 
                                checked={answers[q.id] === opt} 
                                onChange={(e) => handleOptionChange(q.id, e.target.value)}
                                style={{ accentColor: c.orange, width: "18px", height: "18px", marginTop: "2px", flexShrink: 0 }} 
                              />
                              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.4 }}>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* STEP 4: REFLEXION */}
                {step === 4 && (
                  <div style={{ display: "grid", gap: "2rem" }}>
                    <div>
                      <label htmlFor="ref_1" style={labelStyle}>¿Por qué quieres ser parte de Leaders of Tomorrow? Cuéntanos en tus propias palabras. *</label>
                      <textarea id="ref_1" required rows={4} placeholder="Tu motivación..." style={{ ...inputStyle, resize: "vertical" }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                    </div>

                    <div>
                      <label htmlFor="ref_2" style={labelStyle}>¿Qué opinas sobre el rol de la inteligencia artificial en la sociedad? ¿Te genera entusiasmo, preocupación, o ambas cosas a la vez? *</label>
                      <textarea id="ref_2" required rows={4} placeholder="Escribe tu opinión honesta..." style={{ ...inputStyle, resize: "vertical" }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                    </div>

                    <div>
                      <label htmlFor="ref_3" style={labelStyle}>¿Qué significa ser un buen líder? ¿Conoces a alguien (real o ficticio) que lo represente? ¿Por qué? *</label>
                      <textarea id="ref_3" required rows={4} placeholder="Describe tu visión de liderazgo..." style={{ ...inputStyle, resize: "vertical" }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {step > 0 && (
                  <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
                    {step > 1 && (
                      <button type="button" onClick={prevStep} style={{ 
                        flex: 1, background: "rgba(255,255,255,0.08)", color: "white", padding: "1.1rem", 
                        borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", fontWeight: 700, cursor: "pointer",
                        transition: "all 0.2s"
                      }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                        Atrás
                      </button>
                    )}
                    
                    <button type="submit" style={{ 
                      flex: step > 1 ? 2 : 1, background: c.orange, color: "white", padding: "1.1rem", 
                      borderRadius: "14px", border: "none", fontWeight: 800, cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)", transition: "all 0.2s", width: "100%"
                    }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                      {step < totalSteps ? "Continuar" : "Finalizar postulación"}
                    </button>
                  </div>
                )}
                
              </div>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(67, 165, 116, 0.15)", border: "1px solid rgba(67, 165, 116, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", color: c.forest }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontSize: "2.2rem", color: c.white, marginBottom: "1rem", fontWeight: 600 }}>¡Postulación Enviada!</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", marginBottom: "2.5rem", maxWidth: "400px", margin: "0 auto 2.5rem" }}>
                Hemos recibido tu postulación con éxito. Analizaremos tu perfil y te contactaremos muy pronto.
              </p>
              <Link href="/" style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "1rem 2.5rem", borderRadius: "99px", textDecoration: "none", fontWeight: 700, display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                Volver al Inicio
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
