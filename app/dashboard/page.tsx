"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef, useCallback } from "react"
import { toast } from "sonner"
import {
  Music2,
  LogOut,
  Share2,
  Download,
  RefreshCw,
  Sparkles,
  Users,
  Disc3,
} from "lucide-react"
import type { PersonalityProfile } from "@/lib/personality"
import { GenreDNAChart } from "@/components/genre-dna-chart"
import { MoodSpectrum } from "@/components/mood-spectrum"
import { PersonalityCard } from "@/components/personality-card"

interface AnalysisData {
  profile: PersonalityProfile
  topTracks: Array<{
    id: string
    name: string
    artists: Array<{ name: string }>
    album: { images: Array<{ url: string }> }
    popularity: number
    preview_url: string | null
  }>
  topArtists: Array<{
    id: string
    name: string
    images: Array<{ url: string }>
    genres: string[]
    popularity: number
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("medium_term")
  const cardRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [audioProgress, setAudioProgress] = useState(0)

  const playPreview = useCallback((trackId: string, previewUrl: string | null) => {
    if (!previewUrl) return
    if (playingId === trackId) {
      audioRef.current?.pause()
      setPlayingId(null)
      return
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = previewUrl
      audioRef.current.play()
      setPlayingId(trackId)
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setAudioProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
        }
      }
      audioRef.current.onended = () => {
        setPlayingId(null)
        setAudioProgress(0)
      }
    }
  }, [playingId])

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = 0.7
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalysis()
    }
  }, [status])

  const fetchAnalysis = async (range: "short_term" | "medium_term" | "long_term" = timeRange) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/analysis?time_range=${range}`)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Failed to analyze")
      }
      const result = await res.json()
      setData(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    if (!cardRef.current || !data) return
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
      link.download = `soundscape-${session?.user?.name?.replace(/\s+/g, "-").toLowerCase() ?? "my"}-personality.png`
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
    if (!data) return
    const text = `I'm "${data.profile.archetype.name}" ${data.profile.archetype.emoji} — ${data.profile.archetype.tagline}. Find your music personality at Soundscape!`
    if (navigator.share) {
      await navigator.share({ title: "My Music Personality", text })
    } else {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!")
    }
  }

  if (status === "loading" || loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#080810",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "3rem" }}>😕</div>
        <h2 style={{ fontFamily: "Outfit", fontSize: "1.8rem", fontWeight: 700 }}>
          Analysis failed
        </h2>
        <p style={{ color: "#6b6b8a", maxWidth: 400 }}>{error}</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => fetchAnalysis()} className="btn-spotify" style={{ padding: "12px 28px" }}>
            <RefreshCw size={16} /> Try Again
          </button>
          <button onClick={() => { window.location.href = "/api/signout" }} className="btn-outline" style={{ padding: "12px 28px" }}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { profile, topTracks, topArtists } = data

  return (
    <div style={{ minHeight: "100vh", background: "#080810", paddingBottom: "4rem" }}>
      {/* Top Nav */}
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
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name ?? ""}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #1db954" }}
            />
          )}
          <span style={{ color: "#a0a0c0", fontSize: "0.9rem" }}>{session?.user?.name}</span>
          <button
            onClick={() => { window.location.href = "/api/signout" }}
            className="btn-outline"
            style={{ padding: "8px 16px", fontSize: "0.85rem", gap: 6 }}
            id="signout-btn"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Export Actions */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => fetchAnalysis()}
            className="btn-outline"
            style={{ padding: "10px 20px", fontSize: "0.9rem" }}
            id="refresh-analysis-btn"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
          <button
            onClick={handleShare}
            className="btn-outline"
            style={{ padding: "10px 20px", fontSize: "0.9rem" }}
            id="share-btn"
          >
            <Share2 size={15} />
            Share
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-spotify"
            style={{ padding: "10px 24px", fontSize: "0.9rem" }}
            id="export-card-btn"
          >
            <Download size={15} />
            {isExporting ? "Exporting..." : "Download Card"}
          </button>
        </div>

        {/* Time Range Selector */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 4,
            gap: 4,
          }}>
            {([
              { key: "short_term", label: "🕐 4 Weeks" },
              { key: "medium_term", label: "📅 6 Months" },
              { key: "long_term", label: "🗓️ All Time" },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setTimeRange(key)
                  fetchAnalysis(key)
                }}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9,
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: timeRange === key ? 700 : 400,
                  background: timeRange === key
                    ? "linear-gradient(135deg, #1db954, #17a347)"
                    : "transparent",
                  color: timeRange === key ? "#000" : "#6b6b8a",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── PERSONALITY CARD (exportable) ── */}
        <div ref={cardRef}>
          <PersonalityCard
            profile={profile}
            userName={session?.user?.name ?? "Music Lover"}
            userImage={session?.user?.image ?? undefined}
            topArtists={topArtists}
            topTracks={topTracks}
          />
        </div>

        {/* ── GENRE DNA ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <SectionCard title="Genre DNA" icon={<Disc3 size={18} color="#1db954" />}>
            <GenreDNAChart data={profile.genreDNA} />
          </SectionCard>

          <SectionCard title="Mood Spectrum" icon={<Sparkles size={18} color="#9b5cf6" />}>
            <MoodSpectrum data={profile.moodSpectrum} />
          </SectionCard>
        </div>

        {/* ── TOP ARTISTS ── */}
        <SectionCard
          title={`Top Artists`}
          icon={<Users size={18} color="#f59e0b" />}
          style={{ marginTop: "1.5rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "1rem",
            }}
          >
            {topArtists.slice(0, 10).map((artist, i) => (
              <div
                key={artist.id}
                className="card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "1rem",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: "default",
                }}
              >
                <div style={{ position: "relative" }}>
                  {artist.images[0] ? (
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                      style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "rgba(29,185,84,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      🎵
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: i < 3 ? "#f59e0b" : "#1a1a35",
                      border: "2px solid #080810",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: i < 3 ? "#000" : "#6b6b8a",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    textAlign: "center",
                    lineHeight: 1.3,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {artist.name}
                </p>
                <p style={{ fontSize: "0.7rem", color: "#6b6b8a", textAlign: "center" }}>
                  {artist.genres[0] ?? "artist"}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── TOP TRACKS ── */}
        <SectionCard
          title="Top Tracks"
          icon={<Music2 size={18} color="#ec4899" />}
          style={{ marginTop: "1.5rem" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {topTracks.slice(0, 10).map((track, i) => {
              const isPlaying = playingId === track.id
              const hasPreview = !!track.preview_url
              return (
                <div
                  key={track.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 12px",
                    borderRadius: 10,
                    transition: "background 0.2s",
                    background: isPlaying ? "rgba(29,185,84,0.07)" : "transparent",
                    border: isPlaying ? "1px solid rgba(29,185,84,0.2)" : "1px solid transparent",
                    cursor: hasPreview ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    if (!isPlaying) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isPlaying) (e.currentTarget as HTMLDivElement).style.background = "transparent"
                  }}
                >
                  {/* Play button */}
                  <button
                    onClick={() => playPreview(track.id, track.preview_url)}
                    disabled={!hasPreview}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isPlaying
                        ? "#1db954"
                        : hasPreview
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.03)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: hasPreview ? "pointer" : "not-allowed",
                      flexShrink: 0,
                      color: isPlaying ? "#000" : hasPreview ? "#fff" : "#333",
                      fontSize: "0.7rem",
                      transition: "all 0.2s",
                    }}
                    title={hasPreview ? (isPlaying ? "Pause" : "Play 30s preview") : "No preview available"}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>

                  <span style={{ width: 20, textAlign: "center", color: i < 3 ? "#f59e0b" : "#4a4a6a", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                    {i + 1}
                  </span>

                  {/* Album art */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    {track.album?.images?.[0] && (
                      <img
                        src={track.album.images[0].url}
                        alt={track.name}
                        style={{ width: 40, height: 40, borderRadius: 6, display: "block" }}
                        crossOrigin="anonymous"
                      />
                    )}
                    {isPlaying && (
                      <div style={{
                        position: "absolute", inset: 0, borderRadius: 6,
                        background: "rgba(29,185,84,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1rem"
                      }}>🎵</div>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: isPlaying ? "#1db954" : "inherit" }}>
                      {track.name}
                    </p>
                    <p style={{ color: "#6b6b8a", fontSize: "0.8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {track.artists.map((a) => a.name).join(", ")}
                    </p>
                    {isPlaying && (
                      <div style={{ marginTop: 4, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${audioProgress}%`, background: "#1db954", transition: "width 0.5s linear" }} />
                      </div>
                    )}
                  </div>

                  <div style={{ flexShrink: 0, fontSize: "0.75rem", color: "#4a4a6a", padding: "3px 8px", borderRadius: 50, background: "rgba(255,255,255,0.05)" }}>
                    {track.popularity}%
                  </div>
                </div>
              )
            })}
          </div>
          <p style={{ textAlign: "center", color: "#3a3a5a", fontSize: "0.75rem", marginTop: "1rem" }}>
            ▶ Click a track to hear a 30-second Spotify preview
          </p>
        </SectionCard>
      </div>

      {/* Floating Now Playing bar */}
      {playingId && data && (() => {
        const playing = data.topTracks.find(t => t.id === playingId)
        if (!playing) return null
        return (
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
            background: "rgba(8,8,16,0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(29,185,84,0.3)",
            padding: "12px 2rem",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            {playing.album?.images?.[0] && (
              <img src={playing.album.images[0].url} alt={playing.name}
                style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1db954", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {playing.name}
              </p>
              <p style={{ color: "#6b6b8a", fontSize: "0.78rem" }}>
                {playing.artists.map(a => a.name).join(", ")} · 30s preview
              </p>
            </div>
            <div style={{ width: 120, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${audioProgress}%`, background: "#1db954", transition: "width 0.5s linear" }} />
            </div>
            <button
              onClick={() => playPreview(playingId, playing.preview_url)}
              style={{ background: "#1db954", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: "0.9rem", flexShrink: 0 }}
            >
              ⏸
            </button>
          </div>
        )
      })()}
    </div>
  )
}

function SectionCard({
  title,
  icon,
  children,
  style,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "1.8rem",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {icon}
        <h3 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.1rem" }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "#080810", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            paddingTop: "6rem",
          }}
        >
          <div className="flex gap-1 items-end" style={{ height: 48 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="eq-bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <h2 style={{ fontFamily: "Outfit", fontSize: "1.6rem", fontWeight: 700, color: "#f0f0ff" }}>
            Analyzing your music...
          </h2>
          <p style={{ color: "#6b6b8a" }}>Fetching your Spotify data and running the personality engine</p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: 400,
              marginTop: "0.5rem",
            }}
          >
            {["Top tracks", "Top artists", "Audio features", "Genre DNA", "Personality"].map((step, i) => (
              <span
                key={step}
                style={{
                  padding: "4px 12px",
                  borderRadius: 50,
                  background: "rgba(29,185,84,0.08)",
                  border: "1px solid rgba(29,185,84,0.2)",
                  color: "#1db954",
                  fontSize: "0.8rem",
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
