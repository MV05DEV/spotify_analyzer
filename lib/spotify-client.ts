// Spotify API helpers using the session access token

export async function fetchSpotifyTopTracks(accessToken: string, timeRange = "medium_term") {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`)
  return res.json()
}

export async function fetchSpotifyTopArtists(accessToken: string, timeRange = "medium_term") {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`)
  return res.json()
}

export async function fetchAudioFeatures(accessToken: string, trackIds: string[]) {
  const ids = trackIds.slice(0, 100).join(",")
  const res = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${ids}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  // 403 = restricted endpoint (Spotify changed access policy Nov 2024 for dev apps)
  if (res.status === 403) return { audio_features: [] }
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`)
  return res.json()
}

export async function fetchSpotifyProfile(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`)
  return res.json()
}
