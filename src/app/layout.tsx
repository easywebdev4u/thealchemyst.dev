import Script from "next/script";
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
  title: "Ajay Kumar Singh — Tech Lead | Payments Infrastructure, Go & React Native",
  description:
    "Portfolio of Ajay Kumar Singh — Tech Lead with 9+ years building products used by millions. Cross-border payments infrastructure: Go microservices on Kubernetes, React Native, AWS, custodial wallets and KYC orchestration.",
  keywords: [
    "Ajay Kumar Singh",
    "Tech Lead",
    "Frontend Engineer",
    "GenAI Developer",
    "Generative AI",
    "Web3 Developer",
    "React",
    "Next.js",
    "Go Lang",
    "TypeScript",
    "AI-Assisted Development",
    "LLM Integration",
    "Prompt Engineering",
    "Full Stack Developer",
    "Golang",
    "Kubernetes",
    "AWS",
    "Microservices",
    "Distributed Systems",
    "React Native",
    "Payments Infrastructure",
    "Fintech",
    "Bengaluru",
    "India",
  ],
  authors: [{ name: "Ajay Kumar Singh" }],
  creator: "Ajay Kumar Singh",
  metadataBase: new URL("https://thealchemyst.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thealchemyst.dev",
    title: "Ajay Kumar Singh — Tech Lead | Payments Infrastructure, Go & React Native",
    description:
      "Building cross-border payments infrastructure — Go, Kubernetes, AWS, React Native. 9+ years shipping to millions; ex-Paytm, Web3.",
    siteName: "The Alchemyst — Ajay Kumar Singh",
    images: [
      {
        url: "https://assets.thealchemyst.dev/photo.jpg",
        width: 600,
        height: 800,
        alt: "Ajay Kumar Singh — Tech Lead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Kumar Singh — Tech Lead | Payments Infrastructure, Go & React Native",
    description:
      "Building cross-border payments infrastructure — Go, Kubernetes, AWS, React Native.",
    images: ["https://assets.thealchemyst.dev/photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "2a2c8512ef1b41c2850b50e243f7c211"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
