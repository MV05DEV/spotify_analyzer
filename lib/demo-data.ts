// Demo data simulating a diverse music listener profile
import type { PersonalityProfile } from "@/lib/personality"

export const DEMO_PROFILE: PersonalityProfile = {
  archetype: {
    id: "explorer",
    name: "The Sonic Explorer",
    emoji: "🎧",
    tagline: "Music is my map to new worlds",
    description:
      "You treat every playlist like a passport. From indie bedroom pop to Afrobeats, jazz fusion to hyperpop — your ears have no borders. You don't just follow trends; you discover them.",
    traits: ["Adventurous", "Open-minded", "Trend-setter", "Eclectic"],
    color: "#1db954",
  },
  moodSpectrum: {
    energy: 72,
    happiness: 65,
    danceability: 78,
    acousticness: 28,
    instrumentalness: 12,
  },
  genreDNA: [
    { genre: "Pop", count: 12, percentage: 35, color: "#1DB954" },
    { genre: "Hip-Hop", count: 8, percentage: 24, color: "#f4a261" },
    { genre: "Indie / Alt", count: 6, percentage: 18, color: "#06d6a0" },
    { genre: "Electronic", count: 4, percentage: 12, color: "#4361ee" },
    { genre: "R&B / Soul", count: 4, percentage: 11, color: "#ff6b6b" },
  ],
  topGenres: ["Pop", "Hip-Hop", "Indie / Alt", "Electronic", "R&B / Soul"],
  alterEgo: {
    name: "The Frequency Chaser",
    title: "Inter-dimensional Beat Collector",
    quote: "Every genre is just a different room in the same house",
    superpower: "Detects a banger within the first 3 seconds",
    weakness: "Has 47 different playlists and never picks one",
  },
  musicDNAScore: 76,
  diversityScore: 68,
}

export const DEMO_TOP_TRACKS = [
  { id: "1", name: "Blinding Lights", artists: [{ name: "The Weeknd" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ef017e899c0547766997d874" }] }, popularity: 97 },
  { id: "2", name: "As It Was", artists: [{ name: "Harry Styles" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14" }] }, popularity: 95 },
  { id: "3", name: "Stay", artists: [{ name: "The Kid LAROI, Justin Bieber" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1" }] }, popularity: 91 },
  { id: "4", name: "Heat Waves", artists: [{ name: "Glass Animals" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464" }] }, popularity: 90 },
  { id: "5", name: "Anti-Hero", artists: [{ name: "Taylor Swift" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5" }] }, popularity: 96 },
  { id: "6", name: "Bad Habit", artists: [{ name: "Steve Lacy" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b2739b99a7f9a4f90e4f1ebdda0c" }] }, popularity: 88 },
  { id: "7", name: "Unholy", artists: [{ name: "Sam Smith, Kim Petras" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b273d9a1b33a2387b8a26475dd89" }] }, popularity: 87 },
  { id: "8", name: "Flowers", artists: [{ name: "Miley Cyrus" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b27308f7ae8bcd7480f08fac57e3" }] }, popularity: 93 },
  { id: "9", name: "Calm Down", artists: [{ name: "Rema, Selena Gomez" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b27381b9b6f78e26c6bfbcf5d3b3" }] }, popularity: 89 },
  { id: "10", name: "Escapism.", artists: [{ name: "RAYE, 070 Shake" }], album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b27328b0a2b96a5714c08f9a9dcf" }] }, popularity: 85 },
]

export const DEMO_TOP_ARTISTS = [
  { id: "1", name: "The Weeknd", images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" }], genres: ["pop", "r&b"], popularity: 98 },
  { id: "2", name: "Taylor Swift", images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" }], genres: ["pop"], popularity: 100 },
  { id: "3", name: "Harry Styles", images: [{ url: "https://i.scdn.co/image/ab6761610000e5ebd84932380fe8c4d49e2ef5b9" }], genres: ["pop", "indie"], popularity: 93 },
  { id: "4", name: "Drake", images: [{ url: "https://i.scdn.co/image/ab6761610000e5ebe6f564572af8e7b5c8f3b0c2" }], genres: ["hip-hop", "rap"], popularity: 97 },
  { id: "5", name: "Doja Cat", images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb2c5b1a7b23f3da60a48a3a8a" }], genres: ["pop", "hip-hop"], popularity: 95 },
  { id: "6", name: "SZA", images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb7c436d7d95a54831b8f5e5d2" }], genres: ["r&b", "soul"], popularity: 91 },
  { id: "7", name: "Glass Animals", images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb3b3c7b45ad3d11e391a8b5a0" }], genres: ["indie", "alternative"], popularity: 85 },
  { id: "8", name: "Steve Lacy", images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb8f5b3b12a40e8ed3f24e89c2" }], genres: ["r&b", "indie"], popularity: 88 },
]
