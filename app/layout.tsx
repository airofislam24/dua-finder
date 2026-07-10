import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://dua-finder-puce.vercel.app"),

  title: {
    default: "Dua Finder | Find Authentic Quran & Hadith Duas",
    template: "%s | Dua Finder",
  },

  description:
    "Search over 500 authentic Islamic duas from the Quran and Sunnah by emotion, situation, or need.",

  keywords: [
    "Dua",
    "Islam",
    "Quran",
    "Hadith",
    "Muslim",
    "Islamic Duas",
    "Morning Dua",
    "Evening Dua",
    "Marriage Dua",
    "Rizq Dua",
    "Forgiveness Dua",
    "Protection Dua",
    "Dua Finder",
  ],

  authors: [
    {
      name: "Dua Finder",
    },
  ],

  creator: "Dua Finder",

  publisher: "Dua Finder",

  verification: {
    google: "BIoHO-NQnzhTQTWviXppRUE3heXLlwvtg1yHFYVak-s",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Dua Finder | Find Authentic Quran & Hadith Duas",
    description:
      "Search over 500 authentic Quran & Hadith duas with Arabic, transliteration, translation and references.",

    url: "https://dua-finder-puce.vercel.app",

    siteName: "Dua Finder",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dua Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Dua Finder",

    description:
      "Search over 500 authentic Quran & Hadith duas.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}