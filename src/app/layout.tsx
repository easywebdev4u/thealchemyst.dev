import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajay Kumar Singh — Tech Lead & Senior Frontend Engineer",
  description:
    "Portfolio of Ajay Kumar Singh (AJ) — Tech Lead & Senior Frontend Engineer with 9+ years of experience building products at the intersection of Web3, fintech, and great UX.",
  keywords: [
    "Ajay Kumar Singh",
    "Frontend Engineer",
    "Tech Lead",
    "React",
    "Next.js",
    "Web3",
    "TypeScript",
    "Bengaluru",
  ],
  authors: [{ name: "Ajay Kumar Singh" }],
  creator: "Ajay Kumar Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ajaysingh.dev",
    title: "Ajay Kumar Singh — Tech Lead & Senior Frontend Engineer",
    description:
      "Building products at the intersection of Web3, fintech, and great UX.",
    siteName: "Ajay Kumar Singh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Kumar Singh — Tech Lead & Senior Frontend Engineer",
    description:
      "Building products at the intersection of Web3, fintech, and great UX.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
