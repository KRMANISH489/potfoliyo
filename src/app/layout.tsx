import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { siteJsonLd } from "@/lib/seo";
import ChatBot from "@/components/chatbot/ChatBot";
import { IntroLoader } from "@/components/ui/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const socialTitle = `${SITE_CONFIG.brand} | ${SITE_CONFIG.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: socialTitle,
    template: `%s | ${SITE_CONFIG.brand}`,
  },
  description: SITE_CONFIG.metaDescription,
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "Landing Pages",
    "Next.js",
    "React",
    "Portfolio",
    "Freelance Developer",
    "SEO",
    "Technical SEO",
    "Local SEO",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_CONFIG.brand,
    title: socialTitle,
    description: SITE_CONFIG.metaDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: socialTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: SITE_CONFIG.metaDescription,
    images: ["/opengraph-image"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
        <IntroLoader />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
