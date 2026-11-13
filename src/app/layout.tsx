import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mutyala Mohan Surendra | AI Systems Engineer & Full-Stack Architect",
  description:
    "Production-grade portfolio and systems engineering showcase for Mutyala Mohan Surendra. Deterministic AI agents, Linux C-PAM biometric security, PyTorch Transformers from scratch, and MILP operations research.",
  keywords: [
    "Mutyala Mohan Surendra",
    "Mohan Surendra",
    "AI Systems Engineer",
    "Deep Learning Researcher",
    "Full-Stack Architect",
    "VIDURA AI",
    "BLINK Linux PAM",
    "VARUNA Maritime MILP",
    "NanoCoder PyTorch",
    "Amrita Vishwa Vidyapeetham",
    "FLASH National Hackathon Winner",
  ],
  authors: [{ name: "Mutyala Mohan Surendra" }],
  creator: "Mutyala Mohan Surendra",
  openGraph: {
    title: "Mutyala Mohan Surendra | AI Systems Engineer & Full-Stack Architect",
    description:
      "Deterministic local-first AI agents, low-latency Linux biometric security systems, from-scratch PyTorch Transformers, and explainable quantitative decision engines.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#07090E] text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
