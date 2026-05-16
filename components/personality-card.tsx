"use client"

import type { PersonalityProfile } from "@/lib/personality"
import { Music2 } from "lucide-react"

interface PersonalityCardProps {
  profile: PersonalityProfile
  userName: string
  userImage?: string
  topArtists: Array<{
    id: string
    name: string
    images: Array<{ url: string }>
    genres: string[]
  }>
  topTracks?: Array<{
    id: string
    name: string
    artists: Array<{ name: string }>
    album: { images: Array<{ url: string }> }
    popularity: number
  }>
}

const MOOD_META: Record<string, { label: string; emoji: string; color: string }> = {
  energy:           { label: "Energy",        emoji: "⚡", color: "#f97316" },
  happiness:        { label: "Happiness",     emoji: "😊", color: "#facc15" },
  danceability:     { label: "Danceability",  emoji: "💃", color: "#ec4899" },
  acousticness:     { label: "Acousticness",  emoji: "🎸", color: "#22c55e" },
  instrumentalness: { label: "Instrumental",  emoji: "🎹", color: "#8b5cf6" },
}

export function PersonalityCard({
  profile,
  userName,
  userImage,
  topArtists,
  topTracks = [],
}: PersonalityCardProps) {
  const { archetype, moodSpectrum, genreDNA, alterEgo, musicDNAScore, diversityScore } = profile
  const color = archetype.color

  return (
    <div
      id="personality-card"
      style={{
        width: "100%",
        background: "linear-gradient(160deg, #07070f 0%, #0d0d1e 60%, #080810 100%)",
        border: `1px solid ${color}35`,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: `0 0 60px ${color}18`,
        position: "relative",
        fontFamily: "'Outfit', system-ui, sans-serif",
        color: "#f0f0ff",
      }}
    >
      {/* Glow overlay */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 260,
          background: `radial-gradient(ellipse 70% 80% at 50% -10%, ${color}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* ══ HEADER ══ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.4rem 1.8rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Logo + User */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "linear-gradient(135deg, #1db954, #9b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Music2 size={13} color="#000" />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1db954" }}>Soundscape</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {userImage && (
              <img
                src={userImage}
                alt={userName}
                style={{ width: 38, height: 38, borderRadius: "50%", border: `2px solid ${color}`, objectFit: "cover" }}
                crossOrigin="anonymous"
              />
            )}
            <div>
              <p style={{ color: "#5a5a7a", fontSize: "0.72rem", marginBottom: 1 }}>Music Personality of</p>
              <p style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.01em" }}>{userName}</p>
            </div>
          </div>
        </div>

        {/* Right: Score badge */}
        <div
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "12px 18px", borderRadius: 14,
            background: `${color}14`, border: `1px solid ${color}30`,
          }}
        >
          <span style={{ fontSize: "2rem", fontWeight: 900, color, lineHeight: 1 }}>{musicDNAScore}</span>
          <span style={{ fontSize: "0.58rem", color: "#5a5a7a", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Music Score</span>
        </div>
      </div>

      {/* ══ ARCHETYPE HERO ══ */}
      <div
        style={{
          padding: "1.2rem 1.8rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative", zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Emoji box — fixed size, perfectly centered */}
          <div
            style={{
              width: 78, height: 78,
              borderRadius: 18,
              background: `${color}14`,
              border: `2px solid ${color}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2.2rem",
              flexShrink: 0,
              lineHeight: 1,
              boxShadow: `0 4px 24px ${color}20`,
            }}
          >
            <span style={{ lineHeight: 1, display: "block" }}>{archetype.emoji}</span>
          </div>

          {/* Text */}
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#5a5a7a", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
              Your Archetype
            </p>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "1.8rem",
                color,
                lineHeight: 1.05,
                marginBottom: 5,
                letterSpacing: "-0.02em",
              }}
            >
              {archetype.name}
            </h2>
            <p style={{ color: "#8a8aaa", fontSize: "0.88rem", fontStyle: "italic" }}>
              "{archetype.tagline}"
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            color: "#7a7a9a",
            lineHeight: 1.6,
            marginTop: "1rem",
            fontSize: "0.82rem",
          }}
        >
          {archetype.description}
        </p>

        {/* Trait badges */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "0.75rem" }}>
          {archetype.traits.map((trait) => (
            <span
              key={trait}
              style={{
                padding: "3px 12px",
                borderRadius: 50,
                background: `${color}12`,
                border: `1px solid ${color}28`,
                color,
                fontSize: "0.72rem",
                fontWeight: 600,
              }}
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ROW ══ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "relative", zIndex: 1,
        }}
      >
        {[
          { label: "Music Score", value: `${musicDNAScore}`, suffix: "/100" },
          { label: "Diversity",   value: `${diversityScore}`, suffix: "%" },
          { label: "Top Genres",  value: `${profile.genreDNA.length}`, suffix: "" },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "1rem 0.5rem",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : undefined,
            }}
          >
            <p style={{ fontWeight: 900, fontSize: "1.6rem", color, lineHeight: 1, marginBottom: 4 }}>
              {s.value}
              <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{s.suffix}</span>
            </p>
            <p style={{ color: "#5a5a7a", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ══ GENRE DNA + MOOD SPECTRUM ══ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "relative", zIndex: 1,
        }}
      >
        {/* Genre DNA */}
        <div style={{ padding: "1.2rem 1.5rem", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "#5a5a7a", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.8rem" }}>
            🎨 Genre DNA
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {genreDNA.slice(0, 5).map((g) => (
              <div key={g.genre}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.75rem", color: "#c0c0d8", fontWeight: 500, textDecoration: "none", lineHeight: 1 }}>{g.genre}</span>
                  <span style={{ fontSize: "0.72rem", color: g.color, fontWeight: 700, textDecoration: "none", lineHeight: 1 }}>{g.percentage}%</span>
                </div>
                <div style={{ height: 7, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${g.percentage}%`, background: `linear-gradient(90deg, ${g.color}cc, ${g.color})`, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Spectrum */}
        <div style={{ padding: "1.2rem 1.5rem" }}>
          <p style={{ color: "#5a5a7a", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.8rem" }}>
            🌊 Mood Spectrum
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(Object.entries(moodSpectrum) as [string, number][]).map(([key, val]) => {
              const m = MOOD_META[key] ?? { label: key, emoji: "🎵", color: "#6b6b8a" }
              return (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.75rem", color: "#c0c0d8", fontWeight: 500, textDecoration: "none", lineHeight: 1 }}>
                      {m.emoji} {m.label}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: m.color, fontWeight: 700, textDecoration: "none", lineHeight: 1 }}>{val}%</span>
                  </div>
                  <div style={{ height: 7, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${val}%`, background: `linear-gradient(90deg, ${m.color}bb, ${m.color})`, borderRadius: 4 }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══ ALTER EGO ══ */}
      <div
        style={{
          padding: "1.2rem 1.8rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "relative", zIndex: 1,
        }}
      >
        <p style={{ color: "#5a5a7a", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          🎭 Music Alter Ego
        </p>
        <div
          style={{
            padding: "1rem 1.4rem",
            borderRadius: 12,
            background: "rgba(155,92,246,0.07)",
            border: "1px solid rgba(155,92,246,0.18)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#a855f7", margin: 0 }}>{alterEgo.name}</h3>
            <p style={{ color: "#9b5cf6", fontSize: "0.78rem" }}>{alterEgo.title}</p>
            <p style={{ color: "#7a7a9a", fontSize: "0.78rem", fontStyle: "italic" }}>"{alterEgo.tagline}"</p>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: 4 }}>
              <p style={{ fontSize: "0.73rem" }}>
                <span style={{ color: "#1db954" }}>⚡ Superpower: </span>
                <span style={{ color: "#8a8aaa" }}>{alterEgo.superpower}</span>
              </p>
              <p style={{ fontSize: "0.73rem" }}>
                <span style={{ color: "#ec4899" }}>💫 Weakness: </span>
                <span style={{ color: "#8a8aaa" }}>{alterEgo.weakness}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TOP TRACKS — single column, clean rows ══ */}
      {topTracks.length > 0 && (
        <div
          style={{
            padding: "1.2rem 1.8rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            position: "relative", zIndex: 1,
          }}
        >
          <p style={{ color: "#5a5a7a", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
            🎵 Top Tracks
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {topTracks.slice(0, 8).map((track, i) => {
              // Max 2 artists shown
              const artists = track.artists.slice(0, 2).map(a => a.name).join(", ")
              const hasMore = track.artists.length > 2
              return (
                <div
                  key={track.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "transparent",
                  }}
                >
                  {/* Rank */}
                  <span
                    style={{
                      width: 22,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      color: i < 3 ? "#f59e0b" : "#3a3a5a",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Album art */}
                  {track.album?.images?.[0] ? (
                    <img
                      src={track.album.images[0].url}
                      alt=""
                      style={{ width: 34, height: 34, borderRadius: 5, objectFit: "cover", flexShrink: 0, display: "block" }}
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div style={{ width: 34, height: 34, borderRadius: 5, background: `${color}20`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>🎵</div>
                  )}

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        color: "#e0e0f0",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginBottom: 1,
                      }}
                    >
                      {track.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#5a5a7a",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {artists}{hasMore ? " & more" : ""}
                    </p>
                  </div>

                  {/* Popularity pill */}
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "0.65rem",
                      color: "#3a3a5a",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "2px 7px",
                      borderRadius: 50,
                    }}
                  >
                    {track.popularity}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ══ TOP ARTISTS ══ */}
      {topArtists.length > 0 && (
        <div
          style={{
            padding: "1.2rem 1.8rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            position: "relative", zIndex: 1,
          }}
        >
          <p style={{ color: "#5a5a7a", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
            🎤 Top Artists
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {topArtists.slice(0, 7).map((artist) => (
              <div key={artist.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 58 }}>
                {artist.images[0] ? (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: `2px solid ${color}28`, display: "block" }}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    🎵
                  </div>
                )}
                <p
                  style={{
                    fontSize: "0.62rem",
                    textAlign: "center",
                    color: "#8a8aaa",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ FOOTER ══ */}
      <div
        style={{
          padding: "0.9rem 1.8rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative", zIndex: 1,
        }}
      >
        <p style={{ color: "#2e2e4a", fontSize: "0.7rem" }}>soundscape.app · Find your music personality</p>
        <div style={{ display: "flex", gap: 5 }}>
          {["#1db954", "#9b5cf6", "#ec4899", "#f59e0b"].map((c) => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}
