"use client"

import type { MoodSpectrum as MoodSpectrumType } from "@/lib/personality"

interface MoodSpectrumProps {
  data: MoodSpectrumType
  compact?: boolean
}

const MOOD_ITEMS = [
  { key: "energy" as const, label: "Energy", emoji: "⚡", color: "#f97316" },
  { key: "happiness" as const, label: "Happiness", emoji: "☀️", color: "#f59e0b" },
  { key: "danceability" as const, label: "Danceability", emoji: "💃", color: "#ec4899" },
  { key: "acousticness" as const, label: "Acousticness", emoji: "🎸", color: "#10b981" },
  { key: "instrumentalness" as const, label: "Instrumental", emoji: "🎹", color: "#9b5cf6" },
]

function getMoodLabel(value: number): string {
  if (value >= 80) return "Very High"
  if (value >= 60) return "High"
  if (value >= 40) return "Medium"
  if (value >= 20) return "Low"
  return "Very Low"
}

export function MoodSpectrum({ data, compact = false }: MoodSpectrumProps) {
  if (compact) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MOOD_ITEMS.map((item) => {
          const value = data[item.key]
          return (
            <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.85rem", flexShrink: 0 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: "0.72rem", color: "#a0a0c0" }}>{item.label}</span>
                  <span style={{ fontSize: "0.72rem", color: item.color, fontWeight: 700 }}>
                    {value}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${value}%`,
                      background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      {MOOD_ITEMS.map((item) => {
        const value = data[item.key]
        return (
          <div key={item.key}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "1.1rem" }}>{item.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#6b6b8a", fontSize: "0.8rem" }}>{getMoodLabel(value)}</span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: item.color,
                    minWidth: 36,
                    textAlign: "right",
                  }}
                >
                  {value}
                </span>
              </div>
            </div>
            <div
              style={{
                height: 10,
                borderRadius: 5,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${value}%`,
                  borderRadius: 5,
                  background: `linear-gradient(90deg, ${item.color}60, ${item.color})`,
                  boxShadow: `0 0 10px ${item.color}40`,
                  transition: "width 1s ease-out",
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
