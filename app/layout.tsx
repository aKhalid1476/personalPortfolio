import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { ParticleNetwork } from "@/components/ParticleNetwork";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Abdullah Khalid",
  description: "math & business @ uwaterloo · swe · security · product management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} dark`}>
      <body className="bg-linear-to-br from-zinc-50 via-neutral-100 to-white dark:from-zinc-900 dark:via-neutral-900 dark:to-black min-h-screen font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          <ParticleNetwork />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
