"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Music2,
  Share2,
  Download,
  RefreshCw,
  Sparkles,
  Users,
  Disc3,
  ArrowLeft,
} from "lucide-react"
import { GenreDNAChart } from "@/components/genre-dna-chart"
import { MoodSpectrum } from "@/components/mood-spectrum"
import { PersonalityCard } from "@/components/personality-card"
import { DEMO_PROFILE, DEMO_TOP_TRACKS, DEMO_TOP_ARTISTS } from "@/lib/demo-data"
import { toast } from "sonner"
import { useRef } from "react"

export default function DemoPage() {
  const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#080810",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })
      const link = document.createElement("a")
      link.download = "soundscape-demo-personality.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
      toast.success("Card downloaded! 🎉")
    } catch {
      toast.error("Export failed — try right-clicking the card")
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    const text = `I'm "${DEMO_PROFILE.archetype.name}" ${DEMO_PROFILE.archetype.emoji} — ${DEMO_PROFILE.archetype.tagline}. Find your music personality at Soundscape!`
    if (navigator.share) {
      await navigator.share({ title: "My Music Personality", text })
    } else {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!")
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080810", paddingBottom: "4rem" }}>
      {/* Demo Banner */}
      <div
        style={{
          background: "linear-gradient(90deg, #f59e0b22, #1db95422)",
          borderBottom: "1px solid rgba(245,158,11,0.3)",
          padding: "10px 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: "0.85rem",
          color: "#f59e0b",
          textAlign: "center",
        }}
      >
        <span>⚡</span>
        <span>
          <strong>Demo Mode</strong> — This is sample data. Connect your Spotify account for your real music personality!
        </span>
        <button
          onClick={() => router.push("/")}
          className="btn-spotify"
          style={{ padding: "5px 14px", fontSize: "0.78rem", marginLeft: 8 }}
        >
          Connect Spotify →
        </button>
      </div>

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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1db954, #9b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Music2 size={16} color="#000" />
          </div>
          <span style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.1rem" }}>Soundscape</span>
          <span
            style={{
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.4)",
              color: "#f59e0b",
              padding: "2px 10px",
              borderRadius: 50,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            DEMO
          </span>
        </div>

        <button
          onClick={() => router.push("/")}
          className="btn-outline"
          style={{ padding: "8px 16px", fontSize: "0.85rem", gap: 6 }}
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Export Actions */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginBottom: "2rem", flexWrap: "wrap" }}>
          <button onClick={handleShare} className="btn-outline" style={{ padding: "10px 20px", fontSize: "0.9rem" }}>
            <Share2 size={15} /> Share
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-spotify"
            style={{ padding: "10px 24px", fontSize: "0.9rem" }}
          >
            <Download size={15} />
            {isExporting ? "Exporting..." : "Download Card"}
          </button>
        </div>

        {/* Personality Card */}
        <div ref={cardRef}>
          <PersonalityCard
            profile={DEMO_PROFILE}
            userName="Demo Listener"
            userImage={undefined}
            topArtists={DEMO_TOP_ARTISTS}
          />
        </div>

        {/* Genre DNA + Mood Spectrum */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <SectionCard title="Genre DNA" icon={<Disc3 size={18} color="#1db954" />}>
            <GenreDNAChart data={DEMO_PROFILE.genreDNA} />
          </SectionCard>
          <SectionCard title="Mood Spectrum" icon={<Sparkles size={18} color="#9b5cf6" />}>
            <MoodSpectrum data={DEMO_PROFILE.moodSpectrum} />
          </SectionCard>
        </div>

        {/* Top Artists */}
        <SectionCard title="Top Artists" icon={<Users size={18} color="#f59e0b" />} style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }}>
            {DEMO_TOP_ARTISTS.map((artist, i) => (
              <div
                key={artist.id}
                className="card-hover"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "1rem", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div style={{ position: "relative" }}>
                  {artist.images[0] ? (
                    <img src={artist.images[0].url} alt={artist.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} crossOrigin="anonymous" />
                  ) : (
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(29,185,84,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🎵</div>
                  )}
                  <div style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: "50%", background: i < 3 ? "#f59e0b" : "#1a1a35", border: "2px solid #080810", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: i < 3 ? "#000" : "#6b6b8a" }}>
                    {i + 1}
                  </div>
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.8rem", textAlign: "center", lineHeight: 1.3 }}>{artist.name}</p>
                <p style={{ fontSize: "0.7rem", color: "#6b6b8a", textAlign: "center" }}>{artist.genres[0] ?? "artist"}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Top Tracks */}
        <SectionCard title="Top Tracks" icon={<Music2 size={18} color="#ec4899" />} style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {DEMO_TOP_TRACKS.map((track, i) => (
              <div
                key={track.id}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 12px", borderRadius: 10, transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
              >
                <span style={{ width: 24, textAlign: "center", color: i < 3 ? "#f59e0b" : "#4a4a6a", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>{i + 1}</span>
                {track.album?.images?.[0] && (
                  <img src={track.album.images[0].url} alt={track.name} style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0 }} crossOrigin="anonymous" />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.name}</p>
                  <p style={{ color: "#6b6b8a", fontSize: "0.8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.artists.map((a) => a.name).join(", ")}</p>
                </div>
                <div style={{ flexShrink: 0, fontSize: "0.75rem", color: "#4a4a6a", padding: "3px 8px", borderRadius: 50, background: "rgba(255,255,255,0.05)" }}>
                  {track.popularity}%
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* CTA */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2.5rem",
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(29,185,84,0.1), rgba(155,92,246,0.1))",
            border: "1px solid rgba(29,185,84,0.2)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "Outfit", fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Ready to see YOUR music personality? 🎵
          </h2>
          <p style={{ color: "#a0a0c0", marginBottom: "1.5rem", maxWidth: 500, margin: "0 auto 1.5rem" }}>
            Connect your Spotify account and discover your unique archetype based on your actual listening data.
          </p>
          <button onClick={() => router.push("/")} className="btn-spotify" style={{ padding: "14px 36px", fontSize: "1rem" }}>
            Connect Spotify & Analyze My Music →
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionCard({ title, icon, children, style }: { title: string; icon: React.ReactNode; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="glass-card" style={{ padding: "1.8rem", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {icon}
        <h3 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.1rem" }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}
