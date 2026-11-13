import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GlobalShell } from "@/components/GlobalShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mutyala Mohan Surendra | AI Systems Engineer & Full-Stack Developer",
  description:
    "Engineering portfolio and case studies of Mutyala Mohan Surendra (Amrita Vishwa Vidyapeetham, Chennai). Deterministic local-first AI agents, Linux biometric security, PyTorch Transformers from scratch, and MILP operations research.",
  keywords: [
    "Mutyala Mohan Surendra",
    "Mohan Surendra",
    "AI Systems Engineer",
    "Deep Learning Researcher",
    "Full-Stack Developer",
    "VIDURA Agent",
    "BLINK Linux PAM",
    "VARUNA Maritime MILP",
    "NanoCoder PyTorch Transformer",
    "Amrita Vishwa Vidyapeetham",
    "FLASH National Hackathon Winner",
  ],
  authors: [{ name: "Mutyala Mohan Surendra" }],
  creator: "Mutyala Mohan Surendra",
  openGraph: {
    title: "Mutyala Mohan Surendra | AI Systems Engineer & Full-Stack Developer",
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
    <html lang="en" className="bg-[#DCE6F7] text-zinc-900 scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#DCE6F7] text-slate-800 min-h-screen bg-gradient-to-br from-[#DCE6F7] via-[#E4E9F8] to-[#D8E8F0]`}
      >
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
