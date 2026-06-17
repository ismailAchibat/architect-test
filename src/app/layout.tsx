import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ATELIER NOIR — Architecture & Spatial Design",
  description:
    "An award-winning architecture studio crafting modern homes where light, structure and silence meet. Scroll to step inside.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${display.variable}`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" />
      </body>
    </html>
  );
}
