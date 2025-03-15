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
  title: "SG Bus Arrival Info - Real-time Singapore Bus Timings",
  description: "Get instant, accurate Singapore bus arrival times and information. Track your bus location, check seat availability, and plan your journey efficiently.",
  keywords: "Singapore bus, bus arrival, bus timing, SG transport, public transport, real-time bus tracking",
  authors: [{ name: "dominik" }],
  openGraph: {
    title: "SG Bus Arrival Info - Real-time Singapore Bus Timings",
    description: "Get instant, accurate Singapore bus arrival times and information. Track your bus location, check seat availability, and plan your journey efficiently.",
    type: "website",
    locale: "en_SG",
    siteName: "SG Bus Arrival Info"
  },
  twitter: {
    card: "summary",
    title: "SG Bus Arrival Info - Real-time Singapore Bus Timings",
    description: "Get instant, accurate Singapore bus arrival times and information. Track your bus location, check seat availability, and plan your journey efficiently."
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://sgbusinfo.vercel.app"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
