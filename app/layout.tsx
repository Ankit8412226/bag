import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-loaded",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BagCorner – Carry Your Style Everywhere",
    template: "%s | BagCorner",
  },
  description:
    "Discover stylish and practical bags for every journey. Shop premium leather backpacks, totes, handbags, and more at BagCorner.",
  keywords: ["bags", "backpacks", "handbags", "leather bags", "tote bags", "BagCorner", "sabagcorner"],
  metadataBase: new URL("https://sabagcorner.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sabagcorner.com",
    siteName: "BagCorner",
    title: "BagCorner – Carry Your Style Everywhere",
    description: "Discover stylish and practical bags for every journey.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
