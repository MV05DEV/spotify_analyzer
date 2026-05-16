"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import type { GenreSlice } from "@/lib/personality"
import type { PieLabelRenderProps } from "recharts"

interface GenreDNAChartProps {
  data: GenreSlice[]
  compact?: boolean
}

const RADIAN = Math.PI / 180

function renderCustomLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  if (
    percent === undefined ||
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined
  ) return null
  if (percent < 0.08) return null

  const ir = typeof innerRadius === "number" ? innerRadius : 0
  const or = typeof outerRadius === "number" ? outerRadius : 0
  const cxNum = typeof cx === "number" ? cx : 0
  const cyNum = typeof cy === "number" ? cy : 0
  const angle = typeof midAngle === "number" ? midAngle : 0

  const radius = ir + (or - ir) * 0.55
  const x = cxNum + radius * Math.cos(-angle * RADIAN)
  const y = cyNum + radius * Math.sin(-angle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
      fontWeight={600}
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  )
}

export function GenreDNAChart({ data, compact = false }: GenreDNAChartProps) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: "center", color: "#4a4a6a", padding: "2rem" }}>
        No genre data available
      </div>
    )
  }

  if (compact) {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.slice(0, 5).map((item) => (
            <div key={item.genre} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: "0.75rem", color: "#a0a0c0" }}>{item.genre}</span>
                  <span style={{ fontSize: "0.75rem", color: item.color, fontWeight: 700 }}>{item.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${item.percentage}%`, background: item.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            innerRadius={40}
            dataKey="percentage"
            nameKey="genre"
            strokeWidth={2}
            stroke="#080810"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0f0f1a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              color: "#f0f0ff",
              fontSize: "0.85rem",
            }}
            formatter={(value: number | string) => [`${value}%`, "Share"]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "0.5rem" }}>
        {data.map((item) => (
          <div key={item.genre} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
            <span style={{ fontSize: "0.78rem", color: "#a0a0c0" }}>{item.genre}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
