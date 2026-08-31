import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/poppins-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const cenura = localFont({
  src: "./fonts/cenura.otf",
  variable: "--font-cenura",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Leaders of Tomorrow by CBA · Bootcamp de Liderazgo",
  description:
    "Programa intensivo para jóvenes que quieren desarrollar habilidades de liderazgo, emprendimiento e impacto social. Cohorte 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full ${poppins.variable} ${cenura.variable}`}>
      <head>
        {/* Keep the original backgrounds, but ask the browser for them immediately. */}
        <link rel="preload" href="/hero/hero.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="/image.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="/city.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="/beach.webp" as="image" fetchPriority="high" />
      </head>
      <body
        suppressHydrationWarning
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </body>
    </html>
  );
}
