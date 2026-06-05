"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

const glassBorder = "rgba(255,255,255,0.08)";

interface Video {
  videoId: string;
  title: string;
  type: "full" | "highlight";
  episodeNum: number;
  guest: string;
  role: string;
  country: string;
  duration: string;
  publishedTime: string;
  viewCount: string;
  url: string;
  thumbnail: string;
}

const VIDEOS: Video[] = [
  {
    "videoId": "9IoPXYARI7I",
    "title": "El viaje del Líder | Escala Chile | Hernán Pasman (COO de LATAM Airlines) | Ep. #14",
    "type": "full",
    "episodeNum": 14,
    "guest": "Hernán Pasman",
    "role": "COO de LATAM Airlines",
    "country": "Chile",
    "duration": "1:10:49",
    "publishedTime": "hace 9 días",
    "viewCount": "39 k",
    "url": "https://www.youtube.com/watch?v=9IoPXYARI7I",
    "thumbnail": "https://img.youtube.com/vi/9IoPXYARI7I/maxresdefault.jpg"
  },
  {
    "videoId": "YWq_zT4tEDI",
    "title": "Lo mejor de Hernán Pasman, COO de LATAM Airlines | Ep. #14",
    "type": "highlight",
    "episodeNum": 14,
    "guest": "Hernán Pasman",
    "role": "COO de LATAM Airlines",
    "country": "Chile",
    "duration": "0:48",
    "publishedTime": "hace 11 días",
    "viewCount": "251",
    "url": "https://www.youtube.com/watch?v=YWq_zT4tEDI",
    "thumbnail": "https://img.youtube.com/vi/YWq_zT4tEDI/maxresdefault.jpg"
  },
  {
    "videoId": "Aqui2TZUAP4",
    "title": "El viaje del Líder | Escala México | Angelines Diez (Board Member MAPFRE) | Ep. #13",
    "type": "full",
    "episodeNum": 13,
    "guest": "Angelines Diez",
    "role": "Board Member MAPFRE",
    "country": "México",
    "duration": "1:02:52",
    "publishedTime": "hace 4 sem.",
    "viewCount": "51 k",
    "url": "https://www.youtube.com/watch?v=Aqui2TZUAP4",
    "thumbnail": "https://img.youtube.com/vi/Aqui2TZUAP4/maxresdefault.jpg"
  },
  {
    "videoId": "Bky22ZmJfMk",
    "title": "Lo mejor de Angelines Diez, Board Member MAPFRE | Ep. #13",
    "type": "highlight",
    "episodeNum": 13,
    "guest": "Angelines Diez",
    "role": "Board Member MAPFRE",
    "country": "México",
    "duration": "0:51",
    "publishedTime": "hace 1 m",
    "viewCount": "10",
    "url": "https://www.youtube.com/watch?v=Bky22ZmJfMk",
    "thumbnail": "https://img.youtube.com/vi/Bky22ZmJfMk/maxresdefault.jpg"
  },
  {
    "videoId": "OXNyI-GlsW8",
    "title": "El viaje del Líder | Escala Argentina | Gustavo Brey (Co-Fundador de Ingenia) | Ep. #12",
    "type": "full",
    "episodeNum": 12,
    "guest": "Gustavo Brey",
    "role": "Co-Fundador de Ingenia",
    "country": "Argentina",
    "duration": "1:39:58",
    "publishedTime": "hace 1 m",
    "viewCount": "251",
    "url": "https://www.youtube.com/watch?v=OXNyI-GlsW8",
    "thumbnail": "https://img.youtube.com/vi/OXNyI-GlsW8/maxresdefault.jpg"
  },
  {
    "videoId": "-jtr3bO3IRw",
    "title": "Lo mejor de Gustavo Brey, Co-Fundador de Ingenia | Ep. #12",
    "type": "highlight",
    "episodeNum": 12,
    "guest": "Gustavo Brey",
    "role": "Co-Fundador de Ingenia",
    "country": "Argentina",
    "duration": "0:52",
    "publishedTime": "hace 1 m",
    "viewCount": "55",
    "url": "https://www.youtube.com/watch?v=-jtr3bO3IRw",
    "thumbnail": "https://img.youtube.com/vi/-jtr3bO3IRw/maxresdefault.jpg"
  },
  {
    "videoId": "4rH7BdoCNXY",
    "title": "El viaje del Líder | Escala Chile | Roberto Alvo - CEO de LATAM Airlines | Ep. #11",
    "type": "full",
    "episodeNum": 11,
    "guest": "Roberto Alvo",
    "role": "CEO de LATAM Airlines",
    "country": "Chile",
    "duration": "1:10:28",
    "publishedTime": "hace 2 m",
    "viewCount": "116 k",
    "url": "https://www.youtube.com/watch?v=4rH7BdoCNXY",
    "thumbnail": "https://img.youtube.com/vi/4rH7BdoCNXY/maxresdefault.jpg"
  },
  {
    "videoId": "cT6j5v3SRw4",
    "title": "Lo mejor de Roberto Alvo (CEO de LATAM Airlines) | Ep. #11",
    "type": "highlight",
    "episodeNum": 11,
    "guest": "Roberto Alvo",
    "role": "CEO de LATAM Airlines",
    "country": "Chile",
    "duration": "0:48",
    "publishedTime": "hace 2 m",
    "viewCount": "70",
    "url": "https://www.youtube.com/watch?v=cT6j5v3SRw4",
    "thumbnail": "https://img.youtube.com/vi/cT6j5v3SRw4/maxresdefault.jpg"
  },
  {
    "videoId": "IMd64DWV3TQ",
    "title": "El viaje del Líder | Escala Panamá | Juan Octavio Díaz (CEO de La Casa de la Baterias) | Ep. #10",
    "type": "full",
    "episodeNum": 10,
    "guest": "Juan Octavio Díaz",
    "role": "CEO de La Casa de la Baterias",
    "country": "Panamá",
    "duration": "1:03:48",
    "publishedTime": "hace 2 m",
    "viewCount": "108 k",
    "url": "https://www.youtube.com/watch?v=IMd64DWV3TQ",
    "thumbnail": "https://img.youtube.com/vi/IMd64DWV3TQ/maxresdefault.jpg"
  },
  {
    "videoId": "WIE_ReKCXDE",
    "title": "Lo mejor de Juan Octavio Díaz, CEO de La Casa de la Baterias | Ep. #10",
    "type": "highlight",
    "episodeNum": 10,
    "guest": "Juan Octavio Díaz",
    "role": "CEO de La Casa de la Baterias",
    "country": "Panamá",
    "duration": "0:43",
    "publishedTime": "hace 2 m",
    "viewCount": "15",
    "url": "https://www.youtube.com/watch?v=WIE_ReKCXDE",
    "thumbnail": "https://img.youtube.com/vi/WIE_ReKCXDE/maxresdefault.jpg"
  },
  {
    "videoId": "y__-0fgtbj4",
    "title": "El viaje del Líder | Escala Perú | Ana Romero (CEO The Professional Branding Agency) | Ep. #09",
    "type": "full",
    "episodeNum": 9,
    "guest": "Ana Romero",
    "role": "CEO The Professional Branding Agency",
    "country": "Perú",
    "duration": "1:22:29",
    "publishedTime": "hace 3 m",
    "viewCount": "24 k",
    "url": "https://www.youtube.com/watch?v=y__-0fgtbj4",
    "thumbnail": "https://img.youtube.com/vi/y__-0fgtbj4/maxresdefault.jpg"
  },
  {
    "videoId": "q0L5eEOxa1k",
    "title": "Lo mejor de Ana Romero, CEO The Professional Branding Agency | Ep. #09",
    "type": "highlight",
    "episodeNum": 9,
    "guest": "Ana Romero",
    "role": "CEO The Professional Branding Agency",
    "country": "Perú",
    "duration": "1:19",
    "publishedTime": "hace 3 m",
    "viewCount": "31",
    "url": "https://www.youtube.com/watch?v=q0L5eEOxa1k",
    "thumbnail": "https://img.youtube.com/vi/q0L5eEOxa1k/maxresdefault.jpg"
  },
  {
    "videoId": "_4siCpVgjFM",
    "title": "El viaje del Líder | Escala Chile | Sebastián Rojas (Managing Director & Partner Apprecio) | Ep. #08",
    "type": "full",
    "episodeNum": 8,
    "guest": "Sebastián Rojas",
    "role": "Managing Director & Partner Apprecio",
    "country": "Chile",
    "duration": "42:36",
    "publishedTime": "hace 3 m",
    "viewCount": "26 k",
    "url": "https://www.youtube.com/watch?v=_4siCpVgjFM",
    "thumbnail": "https://img.youtube.com/vi/_4siCpVgjFM/maxresdefault.jpg"
  },
  {
    "videoId": "5EkrRZ1uDy0",
    "title": "Lo mejor de Sebastian Rojas, Managing Director & Partner de Apprecio | Ep. #08",
    "type": "highlight",
    "episodeNum": 8,
    "guest": "Sebastián Rojas",
    "role": "Managing Director & Partner de Apprecio",
    "country": "Chile",
    "duration": "0:41",
    "publishedTime": "hace 3 m",
    "viewCount": "41",
    "url": "https://www.youtube.com/watch?v=5EkrRZ1uDy0",
    "thumbnail": "https://img.youtube.com/vi/5EkrRZ1uDy0/maxresdefault.jpg"
  },
  {
    "videoId": "lC9i2OoVlmc",
    "title": "El viaje del Líder | Escala México | Luciana Bengardino (Country Manager Méx en Ackermann) | Ep. #07",
    "type": "full",
    "episodeNum": 7,
    "guest": "Luciana Bengardino",
    "role": "Country Manager Méx en Ackermann",
    "country": "México",
    "duration": "57:55",
    "publishedTime": "hace 4 m",
    "viewCount": "70 k",
    "url": "https://www.youtube.com/watch?v=lC9i2OoVlmc",
    "thumbnail": "https://img.youtube.com/vi/lC9i2OoVlmc/maxresdefault.jpg"
  },
  {
    "videoId": "t5SS7d5rxN0",
    "title": "Lo mejor de Luciana Bengardino (Country Manager México en Ackermann) | Ep. #07",
    "type": "highlight",
    "episodeNum": 7,
    "guest": "Luciana Bengardino",
    "role": "Country Manager México en Ackermann",
    "country": "México",
    "duration": "0:50",
    "publishedTime": "hace 4 m",
    "viewCount": "32",
    "url": "https://www.youtube.com/watch?v=t5SS7d5rxN0",
    "thumbnail": "https://img.youtube.com/vi/t5SS7d5rxN0/maxresdefault.jpg"
  },
  {
    "videoId": "UBEHZu8W6VE",
    "title": "El viaje del Líder | Escala Chile | Alejandra Mustakis (Empresaria) | Ep. #06",
    "type": "full",
    "episodeNum": 6,
    "guest": "Alejandra Mustakis",
    "role": "Empresaria",
    "country": "Chile",
    "duration": "56:57",
    "publishedTime": "hace 4 m",
    "viewCount": "49 k",
    "url": "https://www.youtube.com/watch?v=UBEHZu8W6VE",
    "thumbnail": "https://img.youtube.com/vi/UBEHZu8W6VE/maxresdefault.jpg"
  },
  {
    "videoId": "8kPtOERQQDo",
    "title": "Lo mejor de Alejandra Mustakis, empresaria | Ep. #06",
    "type": "highlight",
    "episodeNum": 6,
    "guest": "Alejandra Mustakis",
    "role": "Empresaria",
    "country": "Chile",
    "duration": "0:42",
    "publishedTime": "hace 4 m",
    "viewCount": "28",
    "url": "https://www.youtube.com/watch?v=8kPtOERQQDo",
    "thumbnail": "https://img.youtube.com/vi/8kPtOERQQDo/maxresdefault.jpg"
  },
  {
    "videoId": "NyAZaFnVQpA",
    "title": "El viaje del Líder | Escala Panamá | Ilya Marotta - Subadministradora del Canal de Panamá | Ep. #05",
    "type": "full",
    "episodeNum": 5,
    "guest": "Ilya Marotta",
    "role": "Subadministradora del Canal de Panamá",
    "country": "Panamá",
    "duration": "1:04:12",
    "publishedTime": "hace 4 m",
    "viewCount": "52 k",
    "url": "https://www.youtube.com/watch?v=NyAZaFnVQpA",
    "thumbnail": "https://img.youtube.com/vi/NyAZaFnVQpA/maxresdefault.jpg"
  },
  {
    "videoId": "CskiBtZ2pC8",
    "title": "Lo mejor de Ilya Marotta (Subadministradora del Canal de Panamá) | Ep. #05",
    "type": "highlight",
    "episodeNum": 5,
    "guest": "Ilya Marotta",
    "role": "Subadministradora del Canal de Panamá",
    "country": "Panamá",
    "duration": "0:53",
    "publishedTime": "hace 5 m",
    "viewCount": "58",
    "url": "https://www.youtube.com/watch?v=CskiBtZ2pC8",
    "thumbnail": "https://img.youtube.com/vi/CskiBtZ2pC8/maxresdefault.jpg"
  },
  {
    "videoId": "Jv1-YwM-XmQ",
    "title": "El viaje del Líder | Escala Reino Unido | Peter Templeton, Fundador de YPMH | Ep. #04",
    "type": "full",
    "episodeNum": 4,
    "guest": "Peter Templeton",
    "role": "Fundador de YPMH",
    "country": "Reino Unido",
    "duration": "47:20",
    "publishedTime": "hace 5 m",
    "viewCount": "6.7 K",
    "url": "https://www.youtube.com/watch?v=Jv1-YwM-XmQ",
    "thumbnail": "https://img.youtube.com/vi/Jv1-YwM-XmQ/maxresdefault.jpg"
  },
  {
    "videoId": "rM-gn-7vCko",
    "title": "Lo mejor de Peter Templeton (Fundador de YPMH) | Ep. #04",
    "type": "highlight",
    "episodeNum": 4,
    "guest": "Peter Templeton",
    "role": "Fundador de YPMH",
    "country": "Reino Unido",
    "duration": "0:39",
    "publishedTime": "hace 5 m",
    "viewCount": "8",
    "url": "https://www.youtube.com/watch?v=rM-gn-7vCko",
    "thumbnail": "https://img.youtube.com/vi/rM-gn-7vCko/maxresdefault.jpg"
  },
  {
    "videoId": "jRTV-4puWIw",
    "title": "El viaje del Líder | Escala Perú | Leonie Roca - Presidenta de AFIN | Ep. #03",
    "type": "full",
    "episodeNum": 3,
    "guest": "Leonie Roca",
    "role": "Presidenta de AFIN",
    "country": "Perú",
    "duration": "1:14:53",
    "publishedTime": "hace 5 m",
    "viewCount": "41 k",
    "url": "https://www.youtube.com/watch?v=jRTV-4puWIw",
    "thumbnail": "https://img.youtube.com/vi/jRTV-4puWIw/maxresdefault.jpg"
  },
  {
    "videoId": "Ra-HhB_xRI8",
    "title": "Lo mejor de Leonie Roca (Presidenta de AFIN) | Ep. #03",
    "type": "highlight",
    "episodeNum": 3,
    "guest": "Leonie Roca",
    "role": "Presidenta de AFIN",
    "country": "Perú",
    "duration": "0:51",
    "publishedTime": "hace 5 m",
    "viewCount": "36",
    "url": "https://www.youtube.com/watch?v=Ra-HhB_xRI8",
    "thumbnail": "https://img.youtube.com/vi/Ra-HhB_xRI8/maxresdefault.jpg"
  },
  {
    "videoId": "4d7Cv3tC4po",
    "title": "El viaje del Líder | Escala México | Antonio Catena - Managing Partner Americas Ackermann | Ep. #02",
    "type": "full",
    "episodeNum": 2,
    "guest": "Antonio Catena",
    "role": "Managing Partner Americas Ackermann",
    "country": "México",
    "duration": "59:57",
    "publishedTime": "hace 6 m",
    "viewCount": "102 k",
    "url": "https://www.youtube.com/watch?v=4d7Cv3tC4po",
    "thumbnail": "https://img.youtube.com/vi/4d7Cv3tC4po/maxresdefault.jpg"
  },
  {
    "videoId": "yisZHPYTXzE",
    "title": "Lo mejor de Antonio Catena (Managing Partner Americas Ackermann) | Ep. #02",
    "type": "highlight",
    "episodeNum": 2,
    "guest": "Antonio Catena",
    "role": "Managing Partner Americas Ackermann",
    "country": "México",
    "duration": "0:44",
    "publishedTime": "hace 6 m",
    "viewCount": "135",
    "url": "https://www.youtube.com/watch?v=yisZHPYTXzE",
    "thumbnail": "https://img.youtube.com/vi/yisZHPYTXzE/maxresdefault.jpg"
  },
  {
    "videoId": "AToNDXx7GgM",
    "title": "El viaje del Líder | Escala Uruguay | Fernanda Varini - Directora de Prosegur Alarmas | Episodio #01",
    "type": "full",
    "episodeNum": 1,
    "guest": "Fernanda Varini",
    "role": "Directora de Prosegur Alarmas",
    "country": "Uruguay",
    "duration": "42:03",
    "publishedTime": "hace 6 m",
    "viewCount": "138 k",
    "url": "https://www.youtube.com/watch?v=AToNDXx7GgM",
    "thumbnail": "https://img.youtube.com/vi/AToNDXx7GgM/maxresdefault.jpg"
  },
  {
    "videoId": "IfLi_vHT5IM",
    "title": "Lo mejor de Fernanda Varini (Directora General de Prosegur Alarms Uruguay) | El viaje del Líder",
    "type": "highlight",
    "episodeNum": 1,
    "guest": "Fernanda Varini",
    "role": "Directora de Prosegur Alarmas",
    "country": "Uruguay",
    "duration": "0:41",
    "publishedTime": "hace 6 m",
    "viewCount": "147",
    "url": "https://www.youtube.com/watch?v=IfLi_vHT5IM",
    "thumbnail": "https://img.youtube.com/vi/IfLi_vHT5IM/maxresdefault.jpg"
  }
];

export default function PodcastPage() {
  const container = useRef<HTMLDivElement>(null);
  
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Filter and sort videos
  const filteredVideos = VIDEOS.filter(video => video.type === "full").sort((a, b) => {
    if (sortOrder === "newest") {
      return b.episodeNum - a.episodeNum;
    } else {
      return a.episodeNum - b.episodeNum;
    }
  });

  const getCountryColor = (country: string) => {
    switch (country.toLowerCase()) {
      case "chile": return "rgba(58, 134, 255, 0.12)";
      case "méxico":
      case "mexico": return "rgba(46, 196, 182, 0.12)";
      case "argentina": return "rgba(78, 168, 222, 0.12)";
      case "panamá":
      case "panama": return "rgba(244, 162, 97, 0.12)";
      case "perú":
      case "peru": return "rgba(230, 57, 70, 0.12)";
      case "uruguay": return "rgba(0, 180, 216, 0.12)";
      case "reino unido": return "rgba(168, 218, 220, 0.12)";
      default: return "rgba(255, 255, 255, 0.06)";
    }
  };

  const getCountryTextColor = (country: string) => {
    switch (country.toLowerCase()) {
      case "chile": return "#3a86ff";
      case "méxico":
      case "mexico": return "#2ec4b6";
      case "argentina": return "#90e0ef";
      case "panamá":
      case "panama": return "#f4a261";
      case "perú":
      case "peru": return "#ffb703";
      case "uruguay": return "#00b4d8";
      case "reino unido": return "#a8dadc";
      default: return "#ffffff";
    }
  };

  return (
    <div ref={container} style={{
      backgroundImage: "url('/plane.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundColor: "#0a0a12",
      minHeight: "100vh",
      position: "relative",
      color: "#fff"
    }}>
      {/* Dark overlay over background */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 10, 18, 0.60)",
        zIndex: 0,
        pointerEvents: "none",
      }} />
      <Navbar solid={true} />
      <main style={{ padding: "140px 1.5rem 100px", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link href="/">
            <Image 
              src="/hero/logos/Cba.png" 
              alt="CBA Logo" 
              width={150} 
              height={72} 
              style={{ objectFit: "contain", margin: "0 auto 2rem", opacity: 0.9, cursor: "pointer", transition: "opacity 0.2s" }}
            />
          </Link>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 6vw, 4rem)", 
            color: "#ffffff", 
            marginBottom: "1rem", 
            lineHeight: 1.1, 
            fontWeight: 800,
            letterSpacing: "-0.03em"
          }}>
            El Viaje del Líder
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Historias, aprendizajes y reflexiones sobre el camino del emprendimiento y el liderazgo regional.
          </p>
        </div>

        {/* Chapters Section */}
        <section>
          {/* Section Header & Tabs */}
          <div style={{ 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            justifyContent: "space-between", 
            marginBottom: "2.5rem", 
            borderBottom: "1px solid rgba(255,255,255,0.08)", 
            paddingBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1.5rem"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: 0 }}>Capítulos</h2>
          </div>

          {/* Sort controls */}
          <div style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2.5rem",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}>
            {/* Sort Toggle Button */}
            <button
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 18px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span>{sortOrder === "newest" ? "Más recientes" : "Primeros capítulos"}</span>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                style={{ transform: sortOrder === "newest" ? "none" : "rotate(180deg)", transition: "transform 0.3s" }}
              >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </button>
          </div>
          
          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "2.5rem 2rem",
            }}>
              {filteredVideos.map((video) => {
                const isHovered = hoveredCard === video.videoId;
                return (
                  <div
                    key={video.videoId}
                    onClick={() => setSelectedVideo(video)}
                    onMouseEnter={() => setHoveredCard(video.videoId)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                      borderColor: isHovered ? "rgba(199, 125, 255, 0.3)" : "rgba(255, 255, 255, 0.06)",
                      boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.5), 0 0 25px rgba(123,44,191,0.15)" : "none",
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#06060c" }}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                          transform: isHovered ? "scale(1.05)" : "scale(1)",
                        }}
                        onError={(e) => {
                          // Fallback to standard quality if maxres is missing
                          e.currentTarget.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(10, 10, 18, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}>
                        <div style={{
                          background: "#7b2cbf",
                          borderRadius: "50%",
                          width: "48px",
                          height: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transform: isHovered ? "scale(1)" : "scale(0.8)",
                          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                          boxShadow: "0 0 20px rgba(123, 44, 191, 0.6)",
                        }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {video.duration && (
                        <span style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          background: "rgba(10,10,18,0.8)",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          backdropFilter: "blur(4px)",
                          color: "#fff",
                        }}>
                          {video.duration}
                        </span>
                      )}

                      {/* Type Badge */}
                      <span style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        background: "rgba(123, 44, 191, 0.9)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                        Episodio
                      </span>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      {/* Meta top (Ep # & Country) */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                        <span style={{
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          color: "#c77dff",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}>
                          {video.episodeNum > 0 ? `Episodio #${video.episodeNum}` : ""}
                        </span>
                        
                        {video.country && (
                          <span style={{
                            background: getCountryColor(video.country),
                            color: getCountryTextColor(video.country),
                            padding: "2px 8px",
                            borderRadius: "20px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}>
                            {video.country}
                          </span>
                        )}
                      </div>

                      {/* Guest name */}
                      <h3 style={{
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        lineHeight: 1.3,
                        marginBottom: "0.4rem",
                        color: "#fff",
                      }}>
                        {video.guest}
                      </h3>

                      {/* Guest Role */}
                      <p style={{
                        fontSize: "0.85rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        lineHeight: 1.4,
                        marginBottom: "1.25rem",
                        flexGrow: 1,
                      }}>
                        {video.role}
                      </p>

                      {/* Footer Row (Time and Views) */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.75rem",
                        color: "rgba(255, 255, 255, 0.4)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        paddingTop: "0.8rem",
                      }}>
                        <span>{video.publishedTime}</span>
                        {video.viewCount && (
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            {video.viewCount} {video.viewCount.toLowerCase().includes('vistas') ? '' : 'vistas'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ 
              background: "rgba(255,255,255,0.02)", 
              padding: "4rem 2rem", 
              borderRadius: "20px", 
              border: "1px dashed rgba(255,255,255,0.1)",
              textAlign: "center"
            }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Aún no hay capítulos disponibles.
              </p>
            </div>
          )}
        </section>

      </main>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer style={{ background: "#5A189A", color: "rgba(255,255,255,0.9)", padding: "clamp(3rem, 6vw, 6rem) 1.25rem clamp(1.5rem, 3vw, 3rem)", borderTop: `1px solid ${glassBorder}`, position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "clamp(2rem, 4vw, 4rem)", marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Image src="/logo-white.svg" alt="Logo" width={180} height={50} style={{ height: "auto", marginBottom: "1.5rem", display: "block" }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 300, textAlign: "center", margin: "0 auto" }}>La plataforma líder en formación de liderazgo joven en Iberoamérica. Creando impacto desde 2018.</p>
          </div>
          {[
            { title: "Inmersión", links: ["Currículo", "Mentores", "Admisiones", "Becas"] },
            { title: "Red", links: ["Directorio Alumni", "Partner Schools", "Corporate Connect", "Impact Reports"] },
            { title: "Lab", links: ["Blog", "Podcast", "Recursos Abiertos", "Newsletter"] },
          ].map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <p style={{ fontWeight: 800, color: "#fff", marginBottom: "1.8rem", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", width: "100%" }}>{col.title}</p>
              {col.links.map((link) => {
                const isPodcast = link === "Podcast";
                const LinkComp = isPodcast ? Link : "a";
                return (
                  <LinkComp
                    key={link}
                    href={isPodcast ? "/podcast" : "#"}
                    style={{ display: "inline-block", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", marginBottom: "0.8rem", transition: "all 0.3s", textAlign: "center" }}
                  >
                    {link}
                  </LinkComp>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${glassBorder}`, paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: "0.9rem" }}>© {new Date().getFullYear()} Leaders of Tomorrow by CBA</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Twitter", "LinkedIn", "Instagram", "Spotify"].map(s => (
              <a key={s} href="#" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* YouTube Lightbox Modal */}
      {selectedVideo && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 6, 10, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
        onClick={() => setSelectedVideo(null)}
        >
          <div style={{
            background: "#0c0c16",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "850px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 45px rgba(123, 44, 191, 0.2)",
            animation: "scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Embed Video Iframe */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video metadata & actions */}
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#c77dff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Episodio #{selectedVideo.episodeNum}
                  </span>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginTop: "4px", margin: 0 }}>
                    {selectedVideo.guest}
                  </h2>
                </div>

                {selectedVideo.country && (
                  <span style={{
                    background: getCountryColor(selectedVideo.country),
                    color: getCountryTextColor(selectedVideo.country),
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                  }}>
                    {selectedVideo.country}
                  </span>
                )}
              </div>

              <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.5, marginBottom: "1.5rem", margin: 0 }}>
                {selectedVideo.role}
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href={selectedVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#7b2cbf",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background 0.2s",
                  }}
                >
                  <span>Ver en YouTube</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>

                <button
                  onClick={() => setSelectedVideo(null)}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>

            {/* Floating Close Cross Icon */}
            <button
              onClick={() => setSelectedVideo(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(10,10,18,0.7)",
                border: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1.2rem",
                lineHeight: 0,
                zIndex: 1,
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Embedded Styles for animations */}
      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
