"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const c = {
  orange: "#FA6742",
  orangeDark: "#e5522e",
  cream: "#F9F4E1",
  dark: "#1A1208",
  muted: "#7A5C4F",
  white: "#ffffff",
  forest: "#43a574",
};

export default function ApplyPage() {
  const container = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

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
    gsap.to(".step-content", {
      x: -20,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setStep(2);
        gsap.fromTo(".step-content", { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
      }
    });
  };

  const prevStep = () => {
    gsap.to(".step-content", {
      x: 20,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setStep(1);
        gsap.fromTo(".step-content", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    padding: "1rem 1.25rem",
    borderRadius: "14px",
    border: "2px solid rgba(26,18,8,0.08)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
    background: "white"
  };

  const labelStyle = {
    display: "block",
    fontWeight: 800,
    marginBottom: "0.6rem",
    fontSize: "0.75rem",
    color: c.dark,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em"
  };

  const handleFocus = (e: any) => {
    e.target.style.borderColor = c.orange;
    e.target.style.boxShadow = "0 0 0 4px rgba(250,103,66,0.08)";
  };

  const handleBlur = (e: any) => {
    e.target.style.borderColor = "rgba(26,18,8,0.08)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div ref={container} style={{ backgroundColor: c.orange, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Navbar solid={true} />
      
      <div style={{ position: "absolute", top: "15%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(0,0,0,0.05)", filter: "blur(80px)", pointerEvents: "none" }} />

      <main style={{ padding: "120px 1.5rem 60px", maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="form-header" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.8rem", color: c.white, marginBottom: "0.75rem", lineHeight: 1.1, fontWeight: 400 }}>Únete ahora</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", fontWeight: 500 }}>Solo toma 2 minutos.</p>
        </div>

        <div className="form-card" style={{ 
          background: "rgba(255, 255, 255, 0.98)", 
          backdropFilter: "blur(20px)",
          borderRadius: "32px", 
          padding: "2.5rem", 
          boxShadow: "0 40px 100px rgba(0,0,0,0.12)",
        }}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {/* Progress Bar */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
                <div style={{ flex: 1, height: "4px", background: step >= 1 ? c.orange : "rgba(0,0,0,0.05)", borderRadius: "2px", transition: "0.3s" }} />
                <div style={{ flex: 1, height: "4px", background: step >= 2 ? c.orange : "rgba(0,0,0,0.05)", borderRadius: "2px", transition: "0.3s" }} />
              </div>

              <div className="step-content">
                {step === 1 ? (
                  <div style={{ display: "grid", gap: "1.5rem" }}>
                    <div>
                      <label htmlFor="name" style={labelStyle}>Nombre Completo</label>
                      <input type="text" id="name" required placeholder="Tu nombre" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email</label>
                      <input type="email" id="email" required placeholder="tu@email.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label htmlFor="phone" style={labelStyle}>WhatsApp</label>
                      <input type="tel" id="phone" required placeholder="+56 9..." style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <button type="button" onClick={nextStep} style={{ 
                      width: "100%", background: c.orange, color: "white", padding: "1.1rem", 
                      borderRadius: "16px", border: "none", fontWeight: 800, fontSize: "1rem", 
                      cursor: "pointer", marginTop: "1rem", transition: "transform 0.2s"
                    }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                      Continuar
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: "1.5rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label htmlFor="school" style={labelStyle}>Institución</label>
                        <input type="text" id="school" required placeholder="Colegio/U" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                      <div>
                        <label htmlFor="course" style={labelStyle}>Curso</label>
                        <select id="course" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}>
                          <option value="">Selecciona</option>
                          <option value="1">1ro Medio</option>
                          <option value="2">2do Medio</option>
                          <option value="3">3ro Medio</option>
                          <option value="4">4to Medio</option>
                          <option value="u">Universidad</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="motivation" style={labelStyle}>¿Por qué quieres entrar?</label>
                      <textarea id="motivation" required rows={3} placeholder="Cuéntanos brevemente..." style={{ ...inputStyle, resize: "none" }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                      <button type="button" onClick={prevStep} style={{ 
                        flex: 1, background: "rgba(0,0,0,0.05)", color: c.dark, padding: "1.1rem", 
                        borderRadius: "16px", border: "none", fontWeight: 700, cursor: "pointer"
                      }}>Atrás</button>
                      <button type="submit" style={{ 
                        flex: 2, background: c.orange, color: "white", padding: "1.1rem", 
                        borderRadius: "16px", border: "none", fontWeight: 800, cursor: "pointer"
                      }}>Finalizar postulación</button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(67, 165, 116, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: c.forest }}>
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontSize: "1.8rem", color: c.dark, marginBottom: "0.75rem", fontWeight: 400 }}>¡Listo!</h2>
              <p style={{ color: c.muted, fontSize: "1rem", marginBottom: "2rem" }}>Te contactaremos muy pronto.</p>
              <Link href="/" style={{ background: c.dark, color: "white", padding: "0.9rem 2rem", borderRadius: "99px", textDecoration: "none", fontWeight: 700, display: "inline-block" }}>Volver</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
