import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience & Education | Mutyala Mohan Surendra",
  description:
    "AI Research Internship at LiveAI, FLASH National Hackathon 1st Place Champion, and Computer Science & Engineering degree at Amrita Vishwa Vidyapeetham, Chennai.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
