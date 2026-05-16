"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Music2, Sparkles, Zap, Share2, Mic2, BarChart3, ArrowRight, Star } from "lucide-react"

const ARCHETYPES_PREVIEW = [
  { emoji: "🌙", name: "The Night Owl", color: "#6366f1" },
  { emoji: "🎉", name: "The Party Animal", color: "#f59e0b" },
  { emoji: "🧘", name: "The Zen Master", color: "#10b981" },
  { emoji: "🔥", name: "The Trendsetter", color: "#ec4899" },
  { emoji: "💔", name: "The Emotional Poet", color: "#8b5cf6" },
  { emoji: "🌍", name: "The Adventurer", color: "#06b6d4" },
  { emoji: "🎸", name: "The Loyalist", color: "#d97706" },
  { emoji: "🎵", name: "The Deep Diver", color: "#0ea5e9" },
  { emoji: "⚡", name: "The Energizer", color: "#f97316" },
  { emoji: "🎭", name: "The Eclectic Soul", color: "#a855f7" },
]

const FEATURES = [
  {
    icon: BarChart3,
    title: "Genre DNA",
    description: "A visual pie chart of your listening landscape across all genres.",
    color: "#1db954",
  },
  {
    icon: Zap,
    title: "Mood Spectrum",
    description: "Energy, happiness, and danceability decoded from Spotify's audio features.",
    color: "#9b5cf6",
  },
  {
    icon: Mic2,
    title: "Music Alter Ego",
    description: "A creative persona based on your listening habits with a unique name and story.",
    color: "#f59e0b",
  },
  {
    icon: Sparkles,
    title: "Archetype Classification",
    description: "Classified into one of 10+ listener archetypes with deep personality insights.",
    color: "#ec4899",
  },
  {
    icon: Music2,
    title: "Top Artists & Tracks",
    description: "Your most-played artists and songs visualized in a stunning layout.",
    color: "#06b6d4",
  },
  {
    icon: Share2,
    title: "One-Tap Share",
    description: "Export a beautiful shareable card — perfect for social media.",
    color: "#10b981",
  },
]

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeArchetype, setActiveArchetype] = useState(0)

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArchetype((prev) => (prev + 1) % ARCHETYPES_PREVIEW.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    await signIn("spotify", { callbackUrl: "/dashboard" })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080810" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1 items-end h-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="eq-bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p style={{ color: "#6b6b8a", fontSize: "0.9rem" }}>Loading Soundscape...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid-bg" style={{ background: "#080810" }}>
      {/* Nav */}
      <nav
        className="glass"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1db954, #9b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Music2 size={18} color="#000" />
          </div>
          <span style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.2rem", color: "#f0f0ff" }}>
            Soundscape
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => router.push("/demo")}
            className="btn-outline"
            style={{ padding: "9px 20px", fontSize: "0.85rem" }}
          >
            ✨ Try Demo
          </button>
          <button onClick={handleLogin} className="btn-spotify" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
            <SpotifyIcon size={16} />
            Connect Spotify
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="hero-gradient"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,185,84,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
          className="animate-float"
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "8%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,92,246,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
          className="animate-float-delay-2"
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
          className="animate-float-delay-1"
        />

        {/* Floating emoji notes */}
        {["🎵", "🎸", "🎧", "🎶", "🎤", "🎹"].map((note, i) => (
          <div
            key={i}
            className={`animate-float-delay-${i % 4}`}
            style={{
              position: "absolute",
              top: `${15 + i * 13}%`,
              left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined,
              fontSize: "1.5rem",
              opacity: 0.15,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {note}
          </div>
        ))}

        <div style={{ maxWidth: 800, position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 50,
              border: "1px solid rgba(29,185,84,0.3)",
              background: "rgba(29,185,84,0.08)",
              marginBottom: "2rem",
              color: "#1db954",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            <Star size={14} fill="#1db954" />
            Spotify-Wrapped Style Analysis
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "Outfit",
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Your music reveals{" "}
            <span className="gradient-text">who you are.</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
              color: "#a0a0c0",
              lineHeight: 1.7,
              marginBottom: "1rem",
              maxWidth: 600,
              margin: "0 auto 2rem",
            }}
          >
            Connect Spotify and get your listening archetype, genre DNA, mood spectrum, and unique music alter ego — all in one shareable card.
          </p>

          {/* Animated archetype preview */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 24px",
              borderRadius: 12,
              background: "rgba(15,15,26,0.8)",
              border: `1px solid ${ARCHETYPES_PREVIEW[activeArchetype].color}40`,
              marginBottom: "2.5rem",
              transition: "border-color 0.5s ease",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{ARCHETYPES_PREVIEW[activeArchetype].emoji}</span>
            <span style={{ color: "#a0a0c0", fontSize: "0.9rem" }}>Are you</span>
            <span
              style={{
                fontWeight: 700,
                color: ARCHETYPES_PREVIEW[activeArchetype].color,
                transition: "color 0.5s ease",
                fontSize: "1rem",
              }}
            >
              {ARCHETYPES_PREVIEW[activeArchetype].name}?
            </span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="btn-spotify animate-pulse-glow"
              style={{ fontSize: "1.1rem", padding: "16px 40px" }}
              id="hero-connect-spotify-btn"
            >
              <SpotifyIcon size={22} />
              {isLoading ? "Connecting..." : "Analyze My Music"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
            <button
              onClick={() => router.push("/demo")}
              className="btn-outline"
              style={{ fontSize: "1.1rem", padding: "16px 36px" }}
              id="hero-try-demo-btn"
            >
              ✨ Try Demo
            </button>
          </div>

          <p style={{ color: "#4a4a6a", fontSize: "0.8rem", marginTop: "1rem" }}>
            Free • No email required • Instant results
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontFamily: "Outfit",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              marginBottom: "1rem",
            }}
          >
            What you&apos;ll discover
          </h2>
          <p style={{ color: "#a0a0c0", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>
            Six deep dives into your musical identity, powered by Spotify&apos;s audio analysis.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className="glass-card card-hover"
              style={{
                padding: "1.8rem",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${feat.color}20`,
                  border: `1px solid ${feat.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.2rem",
                }}
              >
                <feat.icon size={22} color={feat.color} />
              </div>
              <h3 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.6rem" }}>
                {feat.title}
              </h3>
              <p style={{ color: "#6b6b8a", lineHeight: 1.6, fontSize: "0.95rem" }}>{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Archetypes Showcase */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "rgba(15,15,26,0.5)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Outfit", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.8rem" }}>
            10 Listener Archetypes
          </h2>
          <p style={{ color: "#6b6b8a" }}>Which one are you?</p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.8rem",
            justifyContent: "center",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {ARCHETYPES_PREVIEW.map((arch, i) => (
            <div
              key={arch.name}
              className="card-hover"
              style={{
                padding: "12px 20px",
                borderRadius: 50,
                background: `${arch.color}12`,
                border: `1px solid ${arch.color}30`,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "default",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{arch.emoji}</span>
              <span style={{ color: arch.color, fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                {arch.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          padding: "6rem 2rem",
          textAlign: "center",
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(29,185,84,0.06) 0%, transparent 70%)",
        }}
      >
        <h2
          style={{
            fontFamily: "Outfit",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Ready to meet your{" "}
          <span className="gradient-text-green">music self?</span>
        </h2>
        <p style={{ color: "#6b6b8a", fontSize: "1.1rem", marginBottom: "2.5rem" }}>
          Takes 30 seconds. No account needed.
        </p>
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="btn-spotify"
          style={{ fontSize: "1.15rem", padding: "18px 48px" }}
          id="bottom-connect-spotify-btn"
        >
          <SpotifyIcon size={22} />
          {isLoading ? "Connecting..." : "Get My Personality"}
          {!isLoading && <ArrowRight size={18} />}
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "#4a4a6a",
          fontSize: "0.85rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <Music2 size={14} color="#1db954" />
          <span style={{ color: "#1db954", fontWeight: 600 }}>Soundscape</span>
        </div>
        <p>Powered by Spotify API · Not affiliated with Spotify AB</p>
      </footer>
    </div>
  )
}

function SpotifyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}
