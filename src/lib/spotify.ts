const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_URL = 'https://api.spotify.com/v1'

export interface SpotifyEpisode {
  id: string
  name: string
  description: string
  html_description: string
  audio_preview_url: string
  duration_ms: number
  explicit: boolean
  external_urls: {
    spotify: string
  }
  href: string
  images: {
    url: string
    height: number
    width: number
  }[]
  is_externally_hosted: boolean
  is_playable: boolean
  language: string
  languages: string[]
  release_date: string
  release_date_precision: string
  type: string
  uri: string
}

async function getSpotifyAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const authResponse = await fetch(SPOTIFY_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })

  if (!authResponse.ok) {
    throw new Error('Failed to fetch Spotify access token')
  }

  const { access_token } = await authResponse.json()
  return access_token
}

export async function getSpotifyEpisodes({
  limit = 5,
  offset = 0,
}: {
  showId?: string
  limit?: number
  offset?: number
  market?: string
}): Promise<{ items: SpotifyEpisode[] }> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const showId = process.env.SPOTIFY_SHOW_ID

  if (!clientId || !clientSecret || !showId) {
    return { items: [] }
  }

  const accessToken = await getSpotifyAccessToken(clientId, clientSecret)

  const response = await fetch(
    `${SPOTIFY_API_URL}/shows/${showId}/episodes?offset=${offset}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify episodes')
  }

  return response.json()
}
