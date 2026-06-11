import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import ChatBot from "@/components/chatbot/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.brand} | ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.brand}`,
  },
  description: SITE_CONFIG.intro,
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "Landing Pages",
    "Next.js",
    "React",
    "Portfolio",
    "Freelance Developer",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.brand,
    title: `${SITE_CONFIG.brand} | ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.headline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.brand} | ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.headline,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-slate-100 antialiased">
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
