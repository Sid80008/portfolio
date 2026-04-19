import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

const CanvasBackground = dynamic(
  () => import("@/components/CanvasBackground"),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://siddharthumajwal.com'),
  title: {
    template: '%s | Siddharth Umajwal',
    default: 'Siddharth Umajwal — Designer, Developer & Creative',
  },
  description: 'BTech student at NIT Hamirpur. Freelance graphic designer, web developer, and creative technologist.',
  keywords: ['Siddharth Umajwal', 'Portfolio', 'NIT Hamirpur', 'Graphic Design', 'Web Development', 'Freelancer'],
  openGraph: {
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Siddharth Umajwal",
              jobTitle: "Creative Technologist",
              url: "https://siddharthumajwal.com",
              email: "siddharthumajwal@gmail.com",
              telephone: "+918000819558",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "National Institute of Technology, Hamirpur",
              },
              sameAs: [
                "https://www.instagram.com/professional.sid",
                "https://github.com/siddharthumajwal",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
        <CustomCursor />
        <CanvasBackground />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
