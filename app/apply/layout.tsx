import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postula al bootcamp",
  description:
    "Postula a The Builders Camp, el bootcamp intensivo de 5 días para estudiantes de enseñanza media que quieren aprender, crear y construir.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    url: "/apply",
    title: "Postula a The Builders Camp",
    description:
      "Completa tu postulación al bootcamp intensivo de 5 días para estudiantes de enseñanza media.",
  },
};

export default function ApplyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
