import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pokysql-academy.jet-two-holiday.chatgpt.site"),
  title: "PokéSQL Academy",
  description:
    "A progressive, hands-on SQL and AdTech interview academy built for The Trade Desk Platform Support Analyst path.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "PokéSQL Academy",
    description: "SQL → AdTech → Interview Ready",
    type: "website",
    images: [
      {
        url: "/og-pokysql-academy.png",
        width: 1200,
        height: 630,
        alt: "PokéSQL Academy — SQL to AdTech to interview ready",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PokéSQL Academy",
    description: "SQL → AdTech → Interview Ready",
    images: ["/og-pokysql-academy.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
