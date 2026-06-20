import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Safyrus AI | Engineering the Future through Intelligence, Innovation & Civilization",
  description: "We create AI-powered digital ecosystems, intelligent products, immersive experiences, and transformative technologies inspired by timeless knowledge and modern innovation.",
  keywords: ["AI Innovation Studio", "Three.js", "Creative Agency", "Futuristic Tech", "Web3", "Deep Tech", "Hindu Architecture", "Aesthetic Design", "Next.js"],
  authors: [{ name: "Safyrus AI" }],
  openGraph: {
    title: "Safyrus AI | Engineering the Future",
    description: "A futuristic AI innovation studio blending ancient Indian wisdom with cutting-edge technology.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safyrus AI | Engineering the Future",
    description: "A futuristic AI innovation studio blending ancient Indian wisdom with cutting-edge technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${cinzel.variable} antialiased bg-space-bg text-slate-100 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
