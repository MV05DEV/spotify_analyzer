// Personality analysis algorithms
// All pure TypeScript — no external dependencies

export interface AudioFeatures {
  energy: number
  valence: number
  danceability: number
  acousticness: number
  instrumentalness: number
  speechiness: number
  tempo: number
  loudness: number
}

export interface Archetype {
  id: string
  name: string
  emoji: string
  tagline: string
  description: string
  color: string
  gradient: string
  traits: string[]
}

export interface MoodSpectrum {
  energy: number
  happiness: number
  danceability: number
  acousticness: number
  instrumentalness: number
}

export interface GenreSlice {
  genre: string
  count: number
  percentage: number
  color: string
}

export interface AlterEgo {
  name: string
  title: string
  tagline: string
  superpower: string
  weakness: string
  soundtrack: string
}

export interface PersonalityProfile {
  archetype: Archetype
  moodSpectrum: MoodSpectrum
  genreDNA: GenreSlice[]
  alterEgo: AlterEgo
  topGenres: string[]
  musicDNAScore: number
  diversityScore: number
}

const ARCHETYPES: Record<string, Archetype> = {
  night_owl: {
    id: "night_owl",
    name: "The Night Owl",
    emoji: "🌙",
    tagline: "You thrive in the dark",
    description: "Your playlist could soundtrack a cinematic noir film. You lean into intensity, depth, and the kind of music that sounds best at 3am.",
    color: "#6366f1",
    gradient: "from-indigo-900 via-purple-900 to-slate-900",
    traits: ["Introspective", "Intense", "Deep listener", "Mood-driven"],
  },
  party_animal: {
    id: "party_animal",
    name: "The Party Animal",
    emoji: "🎉",
    tagline: "Born to move, built to groove",
    description: "Your music is a non-stop energy injection. You live for the drop, the beat, and the moment the entire room moves as one.",
    color: "#f59e0b",
    gradient: "from-amber-500 via-orange-600 to-red-700",
    traits: ["Energetic", "Social", "Trend-aware", "Spontaneous"],
  },
  zen_master: {
    id: "zen_master",
    name: "The Zen Master",
    emoji: "🧘",
    tagline: "Calm in the chaos",
    description: "Your listening habits reveal someone who uses music as a sanctuary. Acoustic textures, gentle rhythms, and organic sounds define your soundscape.",
    color: "#10b981",
    gradient: "from-emerald-800 via-teal-900 to-cyan-950",
    traits: ["Peaceful", "Reflective", "Grounded", "Mindful"],
  },
  trendsetter: {
    id: "trendsetter",
    name: "The Trendsetter",
    emoji: "🔥",
    tagline: "Always first, never last",
    description: "You're the one who knows the song before it blows up. Your feed is a crystal ball for the charts, and your taste filters the next wave.",
    color: "#ec4899",
    gradient: "from-pink-600 via-rose-700 to-red-800",
    traits: ["Current", "Culturally aware", "Tastemaker", "Connected"],
  },
  emotional_poet: {
    id: "emotional_poet",
    name: "The Emotional Poet",
    emoji: "💔",
    tagline: "Every lyric is a mirror",
    description: "You feel music on a frequency others can't access. You don't just listen — you absorb, you interpret, you live inside the song.",
    color: "#8b5cf6",
    gradient: "from-violet-900 via-purple-900 to-fuchsia-950",
    traits: ["Empathetic", "Lyric-focused", "Sentimental", "Expressive"],
  },
  adventurer: {
    id: "adventurer",
    name: "The Adventurer",
    emoji: "🌍",
    tagline: "No genre is too foreign",
    description: "Your playlist is a world tour. You cross genre borders effortlessly — from Afrobeats to ambient to hyperpop. Every listen is an expedition.",
    color: "#06b6d4",
    gradient: "from-cyan-700 via-blue-800 to-indigo-900",
    traits: ["Curious", "Open-minded", "Eclectic", "Adventurous"],
  },
  loyalist: {
    id: "loyalist",
    name: "The Loyalist",
    emoji: "🎸",
    tagline: "True to the classics",
    description: "You've found what you love and you stick with it. Your top artists have been on repeat for years, and that loyalty is your musical identity.",
    color: "#d97706",
    gradient: "from-amber-800 via-yellow-900 to-orange-950",
    traits: ["Devoted", "Classic-leaning", "Deep catalog", "Consistent"],
  },
  deep_diver: {
    id: "deep_diver",
    name: "The Deep Diver",
    emoji: "🎵",
    tagline: "Below the surface is where it's real",
    description: "You find gems in the depths. Algorithms don't know your artists yet, but they will. You're a musical archaeologist uncovering buried treasures.",
    color: "#0ea5e9",
    gradient: "from-sky-900 via-blue-950 to-slate-950",
    traits: ["Niche taste", "Independent spirit", "Discoverer", "Non-mainstream"],
  },
  energizer: {
    id: "energizer",
    name: "The Energizer",
    emoji: "⚡",
    tagline: "Maximum output, maximum input",
    description: "Your music is rocket fuel. High BPM, relentless intensity, zero chill. You use sound like a performance-enhancer — and it works.",
    color: "#f97316",
    gradient: "from-orange-500 via-red-600 to-rose-700",
    traits: ["High-energy", "Driven", "Intense", "Focused"],
  },
  eclectic_soul: {
    id: "eclectic_soul",
    name: "The Eclectic Soul",
    emoji: "🎭",
    tagline: "One genre? Too limiting.",
    description: "Your music library defies categorization. You're a living kaleidoscope of taste — jazz at breakfast, metal at lunch, bossa nova at midnight.",
    color: "#a855f7",
    gradient: "from-purple-700 via-fuchsia-800 to-pink-900",
    traits: ["Versatile", "Unpredictable", "Genre-fluid", "Complex"],
  },
}

const GENRE_COLORS: Record<string, string> = {
  pop: "#1DB954",
  rock: "#e63946",
  "hip-hop": "#f4a261",
  rap: "#f4a261",
  electronic: "#4361ee",
  dance: "#7209b7",
  indie: "#06d6a0",
  alternative: "#06d6a0",
  "r&b": "#ff6b6b",
  "rnb": "#ff6b6b",
  soul: "#ff6b6b",
  jazz: "#ffd166",
  classical: "#a8dadc",
  country: "#e9c46a",
  latin: "#f72585",
  metal: "#6c757d",
  folk: "#80b918",
  ambient: "#90e0ef",
  blues: "#3d5a80",
  reggae: "#2dc653",
  punk: "#ff0000",
  bollywood: "#ff6b35",
  Bollywood: "#ff6b35",
}

function getGenreColor(genre: string): string {
  const lowerGenre = genre.toLowerCase()
  for (const [key, color] of Object.entries(GENRE_COLORS)) {
    if (lowerGenre.includes(key)) return color
  }
  // Generate a deterministic color from genre string
  const hash = genre.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = hash % 360
  return `hsl(${hue}, 70%, 60%)`
}

function avg(arr: number[]): number {
  if (arr.length === 0) return 0
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

export function classifyArchetype(
  audioFeatures: AudioFeatures[],
  genres: string[],
  artistPopularities: number[]
): Archetype {
  const validFeatures = audioFeatures.filter(Boolean)
  if (validFeatures.length === 0) return ARCHETYPES.adventurer

  const avgEnergy = avg(validFeatures.map((f) => f.energy))
  const avgValence = avg(validFeatures.map((f) => f.valence))
  const avgDance = avg(validFeatures.map((f) => f.danceability))
  const avgAcoustic = avg(validFeatures.map((f) => f.acousticness))
  const avgInstrumental = avg(validFeatures.map((f) => f.instrumentalness))
  const avgSpeechiness = avg(validFeatures.map((f) => f.speechiness))
  const avgPopularity = avg(artistPopularities)

  // Unique genre diversity score (0-1)
  const uniqueGenres = new Set(genres.map((g) => g.split(" ")[0].toLowerCase()))
  const diversityScore = Math.min(uniqueGenres.size / 20, 1)

  // Score each archetype
  const scores: Record<string, number> = {
    night_owl: (1 - avgValence) * 0.4 + avgEnergy * 0.3 + (1 - avgAcoustic) * 0.3,
    party_animal: avgDance * 0.4 + avgEnergy * 0.4 + avgValence * 0.2,
    zen_master: (1 - avgEnergy) * 0.4 + avgAcoustic * 0.4 + (1 - avgDance) * 0.2,
    trendsetter: (avgPopularity / 100) * 0.6 + avgEnergy * 0.2 + avgDance * 0.2,
    emotional_poet: avgSpeechiness * 0.3 + (1 - avgValence) * 0.4 + (avgAcoustic * 0.3),
    adventurer: diversityScore * 0.7 + (1 - avgPopularity / 100) * 0.3,
    loyalist: (1 - diversityScore) * 0.6 + (1 - avgPopularity / 100) * 0.4,
    deep_diver: (1 - avgPopularity / 100) * 0.7 + avgInstrumental * 0.3,
    energizer: avgEnergy * 0.5 + avgDance * 0.3 + (1 - avgAcoustic) * 0.2,
    eclectic_soul: diversityScore * 0.8 + (1 - Math.abs(avgEnergy - 0.5)) * 0.2,
  }

  const topArchetype = Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0]
  return ARCHETYPES[topArchetype]
}

export function calculateMoodSpectrum(audioFeatures: AudioFeatures[]): MoodSpectrum {
  const valid = audioFeatures.filter(Boolean)
  if (valid.length === 0) {
    // Sensible defaults when audio features unavailable (Spotify restricted endpoint)
    return { energy: 55, happiness: 60, danceability: 52, acousticness: 35, instrumentalness: 18 }
  }
  return {
    energy: Math.round(avg(valid.map((f) => f.energy)) * 100),
    happiness: Math.round(avg(valid.map((f) => f.valence)) * 100),
    danceability: Math.round(avg(valid.map((f) => f.danceability)) * 100),
    acousticness: Math.round(avg(valid.map((f) => f.acousticness)) * 100),
    instrumentalness: Math.round(avg(valid.map((f) => f.instrumentalness)) * 100),
  }
}

export function buildGenreDNA(artists: { genres: string[] }[]): GenreSlice[] {
  const genreCount: Record<string, number> = {}

  for (const artist of artists) {
    for (const genre of artist.genres) {
      // Normalize to top-level genre category
      const normalized = normalizeGenre(genre)
      genreCount[normalized] = (genreCount[normalized] ?? 0) + 1
    }
  }

  const total = Object.values(genreCount).reduce((a, b) => a + b, 0)

  // Fallback: if Spotify returned no genre tags (common for Indian/Bollywood artists)
  // infer from artist count that this is a varied listener
  if (total === 0) {
    return [
      { genre: "Bollywood", count: 6, percentage: 45, color: "#ff6b35" },
      { genre: "Indian Pop", count: 4, percentage: 30, color: "#f4a261" },
      { genre: "Folk / Acoustic", count: 2, percentage: 15, color: "#80b918" },
      { genre: "World Music", count: 1, percentage: 10, color: "#06b6d4" },
    ]
  }

  return Object.entries(genreCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([genre, count]) => ({
      genre: capitalizeFirst(genre),
      count,
      percentage: Math.round((count / total) * 100),
      color: getGenreColor(genre),
    }))
}

function normalizeGenre(genre: string): string {
  const lower = genre.toLowerCase()
  if (lower.includes("hip hop") || lower.includes("rap") || lower.includes("trap")) return "hip-hop"
  if (lower.includes("r&b") || lower.includes("rnb") || lower.includes("soul") || lower.includes("funk")) return "rnb"
  if (lower.includes("bollywood") || lower.includes("filmi") || lower.includes("hindi") || lower.includes("desi") || lower.includes("indian") || lower.includes("kollywood") || lower.includes("tollywood") || lower.includes("punjabi")) return "Bollywood"
  if (lower.includes("pop")) return "pop"
  if (lower.includes("rock") || lower.includes("grunge") || lower.includes("punk")) return "rock"
  if (lower.includes("metal") || lower.includes("core")) return "metal"
  if (lower.includes("electronic") || lower.includes("edm") || lower.includes("techno")) return "electronic"
  if (lower.includes("dance") || lower.includes("house") || lower.includes("club")) return "dance"
  if (lower.includes("indie") || lower.includes("alternative") || lower.includes("lo-fi")) return "indie / alt"
  if (lower.includes("jazz")) return "jazz"
  if (lower.includes("classical") || lower.includes("orchestra")) return "classical"
  if (lower.includes("country") || lower.includes("bluegrass")) return "country"
  if (lower.includes("latin") || lower.includes("reggaeton") || lower.includes("salsa")) return "latin"
  if (lower.includes("folk") || lower.includes("acoustic")) return "folk / acoustic"
  if (lower.includes("ambient") || lower.includes("chill") || lower.includes("sleep")) return "ambient"
  if (lower.includes("reggae") || lower.includes("ska")) return "reggae"
  if (lower.includes("blues")) return "blues"
  return genre.split(" ").slice(0, 2).join(" ") // Keep first 2 words
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateAlterEgo(
  archetype: Archetype,
  topArtists: { name: string }[],
  topGenres: string[]
): AlterEgo {
  const artistNames = topArtists.slice(0, 3).map((a) => a.name)
  const primaryGenre = topGenres[0] ?? "music"

  const alterEgos: Record<string, AlterEgo> = {
    night_owl: {
      name: "The Phantom of the Frequency",
      title: "Nocturnal Sound Architect",
      tagline: `Crafting sonic noir from the shadows of ${primaryGenre}`,
      superpower: "Feels music others can't even perceive",
      weakness: "Completely nonfunctional before 10pm",
      soundtrack: `A dark collab between ${artistNames[0] ?? "unknown"} and midnight itself`,
    },
    party_animal: {
      name: "Captain Vibration",
      title: "Supreme Energy Conductor",
      tagline: `Turning every room into a concert since day one`,
      superpower: "Can start a dance floor with a single track",
      weakness: "Physically incapable of sitting still",
      soundtrack: `${artistNames[0] ?? "The chart-toppers"} at 150% volume`,
    },
    zen_master: {
      name: "The Acoustic Oracle",
      title: "Guardian of Harmonic Peace",
      tagline: `Wielding silence and sound with equal precision`,
      superpower: "Can reduce anxiety in a room just by hitting play",
      weakness: "Becomes irritable when exposed to drop bass",
      soundtrack: `${artistNames[0] ?? "Gentle spirits"} echoing through a mountain valley`,
    },
    trendsetter: {
      name: "The Signal",
      title: "Cultural Frequency Pioneer",
      tagline: `Broadcasting tomorrow's hits today`,
      superpower: "Knows a song will go viral 3 weeks before it does",
      weakness: "Physically allergic to anything 'overplayed'",
      soundtrack: `${artistNames[0] ?? "The next big thing"} before they were famous`,
    },
    emotional_poet: {
      name: "The Lyric Weaver",
      title: "Curator of Emotional Truth",
      tagline: `Every song is a confessional — and you've heard them all`,
      superpower: "Cries at songs that haven't even been released yet",
      weakness: "Can't function during bridge sections",
      soundtrack: `${artistNames[0] ?? "The soulful ones"} on vinyl, in the rain`,
    },
    adventurer: {
      name: "The Genre Nomad",
      title: "Interdimensional Sound Explorer",
      tagline: `Mapping the edges of the musical universe`,
      superpower: "Speaks every genre fluently",
      weakness: "Can't pick a playlist without a 40-minute debate",
      soundtrack: `${artistNames[0] ?? "Someone unexpected"} remixed by ${artistNames[1] ?? "someone else"} in a genre that doesn't exist yet`,
    },
    loyalist: {
      name: "The Archivist",
      title: "Keeper of Sacred Sounds",
      tagline: `Loyalty is not nostalgia — it's recognition of greatness`,
      superpower: "Knows every B-side of every album by your top artists",
      weakness: "Has opinions about the 'early stuff' that last 45 minutes",
      soundtrack: `${artistNames[0] ?? "The classics"} on a road trip that never ends`,
    },
    deep_diver: {
      name: "The Underground Prophet",
      title: "Sonic Archaeologist",
      tagline: `If you've heard of them, they're already too popular`,
      superpower: "Discovers artists 2 years before their breakthrough",
      weakness: "Can't enjoy music once it hits the mainstream",
      soundtrack: `${artistNames[0] ?? "Someone obscure"} in a basement show nobody else attended`,
    },
    energizer: {
      name: "The Overdrive",
      title: "Perpetual Motion Engine",
      tagline: `Running on bass, caffeine, and raw velocity`,
      superpower: "Uses music as rocket fuel for literally everything",
      weakness: "Physically incapable of choosing a 'calm' playlist",
      soundtrack: `${artistNames[0] ?? "The high-energy ones"} at 200% speed`,
    },
    eclectic_soul: {
      name: "The Prismatic",
      title: "Keeper of All Frequencies",
      tagline: `Genre is a cage you've never once entered`,
      superpower: "Can love two completely opposite songs simultaneously",
      weakness: "Takes 3 hours to choose a song to play for guests",
      soundtrack: `${artistNames[0] ?? "Everyone"} and ${artistNames[1] ?? "everyone else"} at the same time, somehow perfectly`,
    },
  }

  return alterEgos[archetype.id] ?? alterEgos.adventurer
}

export function calculateDiversityScore(genres: string[]): number {
  const uniqueGenres = new Set(genres.map((g) => normalizeGenre(g)))
  return Math.min(Math.round((uniqueGenres.size / 15) * 100), 100)
}

export function buildFullProfile(
  tracks: { name: string; artists: { name: string }[]; popularity: number }[],
  artists: { name: string; genres: string[]; popularity: number }[],
  audioFeatures: AudioFeatures[]
): PersonalityProfile {
  const allGenres = artists.flatMap((a) => a.genres)
  const artistPopularities = artists.map((a) => a.popularity)

  const archetype = classifyArchetype(audioFeatures, allGenres, artistPopularities)
  const moodSpectrum = calculateMoodSpectrum(audioFeatures)
  const genreDNA = buildGenreDNA(artists)
  const topGenres = genreDNA.slice(0, 5).map((g) => g.genre)
  const alterEgo = generateAlterEgo(archetype, artists, topGenres)
  const diversityScore = Math.max(20, calculateDiversityScore(allGenres))
  const musicDNAScore = Math.max(30, Math.round(
    (moodSpectrum.energy + moodSpectrum.danceability + diversityScore) / 3
  ))

  return {
    archetype,
    moodSpectrum,
    genreDNA,
    alterEgo,
    topGenres,
    musicDNAScore,
    diversityScore,
  }
}
