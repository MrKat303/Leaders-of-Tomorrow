import Image from "next/image";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        overflow: "hidden"
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}>
          <Image
            src="/proximamente.webp"
            alt="Próximamente"
            fill
            style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.65)" }}
            priority
          />
        </div>

        {/* Content */}
        <div style={{
          textAlign: "center",
          color: "#fff",
          maxWidth: "800px",
          padding: "2rem",
          borderRadius: "20px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #fff 0%, #c77dff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em"
          }}>
            Próximamente
          </h1>
          <p style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.9)",
            fontWeight: 400
          }}>
            Educación para el futuro, accesible desde cualquier parte del mundo. 
            <br />
            Estamos construyendo una plataforma revolucionaria para transformar tu aprendizaje.
          </p>
        </div>

        {/* HiveYoung Logo */}
        <div style={{
          position: "absolute",
          bottom: "4rem",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Image
            src="/hero/logos/hiveyoung.svg"
            alt="HiveYoung"
            width={200}
            height={60}
            style={{ opacity: 0.85, filter: "brightness(0) invert(1)" }}
          />
        </div>
      </main>
    </>
  );
}
