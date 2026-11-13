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
  title: "Mutyala Mohan Surendra | Software & AI Developer",
  description:
    "Portfolio of Mutyala Mohan Surendra (Amrita Vishwa Vidyapeetham, Chennai). Building practical software—offline AI coding helpers, instant Linux face-unlock security, and lightweight tools that run without cloud servers.",
  keywords: [
    "Mutyala Mohan Surendra",
    "Mohan Surendra",
    "Software Developer",
    "AI Developer",
    "Full-Stack Developer",
    "VIDURA AI",
    "BLINK Linux Face Unlock",
    "VARUNA Ship Route Planner",
    "NanoCoder PyTorch",
    "Amrita Vishwa Vidyapeetham",
    "FLASH National Hackathon Winner",
  ],
  authors: [{ name: "Mutyala Mohan Surendra" }],
  creator: "Mutyala Mohan Surendra",
  openGraph: {
    title: "Mutyala Mohan Surendra | Software & AI Developer",
    description:
      "Building practical, reliable software—including offline AI coding helpers, instant face-unlock security for Linux laptops, and lightweight tools that run without expensive cloud servers.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#DCE6F7] text-slate-800 min-h-screen bg-gradient-to-br from-[#DCE6F7] via-[#E4E9F8] to-[#D8E8F0] overflow-x-hidden`}
      >
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
