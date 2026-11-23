import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { TopProgress } from "@/components/top-progress";
import { Loader } from "@/components/loader";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://082it187-hwa-hackathon-eight.vercel.app"),
  title: "ForageGrid | Smart 6-Zone Kibble Console for Dogs",
  description: "ForageGrid is the smart 6-zone kibble console that turns lonely hours into sniffing, solving and calm.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "ForageGrid | Smart 6-Zone Kibble Console for Dogs",
    description: "ForageGrid is the smart 6-zone kibble console that turns lonely hours into sniffing, solving and calm.",
    images: ["/media/foragegrid-hero.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ForageGrid | Smart 6-Zone Kibble Console for Dogs",
    description: "ForageGrid is the smart 6-zone kibble console that turns lonely hours into sniffing, solving and calm.",
    images: ["/media/foragegrid-hero.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-ink">
        <LenisProvider>
          <TopProgress />
          <Loader />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}