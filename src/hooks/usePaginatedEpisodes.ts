import type { SpotifyEpisode } from '@/lib/spotify'
import { useState } from 'react'

export const usePaginatedEpisodes = ({
  initialEpisodes,
  episodesPerPage = 10,
}: {
  initialEpisodes: SpotifyEpisode[]
  episodesPerPage?: number
}) => {
  const [episodes, setEpisodes] = useState<SpotifyEpisode[]>(initialEpisodes)
  const [offset, setOffset] = useState(initialEpisodes.length)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialEpisodes.length === episodesPerPage)

  const handleSeeMore = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/spotify/episodes?limit=${episodesPerPage}&offset=${offset}`
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch episodes: ${response.status}`)
      }

      const data = (await response.json()) as { items: SpotifyEpisode[] }
      if (data.items.length === 0) {
        setHasMore(false)
        setLoading(false)
        return
      }
      setEpisodes((prev) => [...prev, ...data.items])
      setOffset((prev) => prev + data.items.length)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch more episodes', error)
      setLoading(false)
      setHasMore(false)
    }
  }

  return {
    episodes,
    loading,
    hasMore,
    handleSeeMore,
  }
}
