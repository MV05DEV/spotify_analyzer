import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { NextAuthProvider } from "@/components/next-auth-provider"
import { Toaster } from "sonner"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Soundscape — Music Personality Analyzer",
  description:
    "Discover your music DNA. Connect Spotify and get your listening archetype, genre DNA, mood spectrum, and unique music alter ego in one stunning shareable card.",
  keywords: ["Spotify", "music personality", "wrapped", "music DNA", "listening habits"],
  openGraph: {
    title: "Soundscape — Music Personality Analyzer",
    description: "What does your music say about you?",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geist.className} antialiased flex flex-col min-h-screen`}>
        <NextAuthProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#0f0f1a",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#f0f0ff",
              },
            }}
          />
        </NextAuthProvider>
      </body>
    </html>
  )
}
