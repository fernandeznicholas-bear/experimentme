import type { Metadata } from "next";
import { Playfair_Display, Lora, Nunito, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SplashScreen } from "@/components/SplashScreen";
import { SessionTimeout } from "@/components/SessionTimeout";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Experiment Me — The Science of You",
  description:
    "Take validated psychological assessments and get instant, personalized results. Evidence-based self-discovery — not pop quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="scroll-restore" strategy="beforeInteractive">{`if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; window.scrollTo(0, 0);`}</Script>
      </head>
      <body
        className={`${playfair.variable} ${lora.variable} ${nunito.variable} ${dmSerif.variable} antialiased`}
      >
        <SplashScreen />
        <Navbar />
        <SessionTimeout />
        {children}
      </body>
    </html>
  );
}
