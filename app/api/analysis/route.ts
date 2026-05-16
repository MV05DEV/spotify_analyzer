import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import {
  fetchSpotifyTopTracks,
  fetchSpotifyTopArtists,
  fetchAudioFeatures,
} from "@/lib/spotify-client"
import { buildFullProfile } from "@/lib/personality"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const timeRange = (searchParams.get("time_range") ?? "medium_term") as
    | "short_term"
    | "medium_term"
    | "long_term"

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const [tracksData, artistsData] = await Promise.all([
      fetchSpotifyTopTracks(session.accessToken, timeRange),
      fetchSpotifyTopArtists(session.accessToken, timeRange),
    ])

    const trackIds = tracksData.items.map((t: { id: string }) => t.id)
    // fetchAudioFeatures returns [] on 403 (Spotify restricted this endpoint Nov 2024)
    const featuresData = await fetchAudioFeatures(session.accessToken, trackIds)

    const profile = buildFullProfile(
      tracksData.items,
      artistsData.items,
      featuresData.audio_features ?? []
    )

    return NextResponse.json({
      profile,
      topTracks: tracksData.items.slice(0, 10).map((t: {
        id: string; name: string; artists: object[]; album: object; popularity: number; preview_url: string | null
      }) => ({
        id: t.id,
        name: t.name,
        artists: t.artists,
        album: t.album,
        popularity: t.popularity,
        preview_url: t.preview_url ?? null,
      })),
      topArtists: artistsData.items.slice(0, 10),
    })
  } catch (err) {
    console.error("Spotify analysis error:", err)
    if (err instanceof Error && err.message.includes("401")) {
      return NextResponse.json({ error: "Your Spotify session expired. Please sign out and connect again." }, { status: 401 })
    }
    return NextResponse.json({ error: "Failed to fetch Spotify data" }, { status: 500 })
  }
}
