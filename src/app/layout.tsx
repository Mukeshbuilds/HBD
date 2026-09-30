import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFE8F0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Happy 25th Birthday, Shalini! 🎂💗",
  description: "A cute, playful, and romantic birthday surprise made just for Shalini R.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Happy 25th Birthday, Shalini! 🎂💗",
    description: "A little something made just for you 💕",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-gradient-to-b from-[#FFF5F8] via-[#FFF0F5] to-[#FBEBFA] text-[#4A2838] font-sans antialiased selection:bg-[#FF85A1]/25 selection:text-[#B80D57] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
