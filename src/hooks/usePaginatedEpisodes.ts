import { getSpotifyEpisodes, SpotifyEpisode } from '@/lib/spotify'
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
    const data = await getSpotifyEpisodes({
      limit: episodesPerPage,
      offset,
    })
    if (data.items.length === 0) {
      setHasMore(false)
      setLoading(false)
      return
    }
    setEpisodes((prev) => [...prev, ...data.items])
    setOffset((prev) => prev + data.items.length)
    setLoading(false)
  }

  return {
    episodes,
    loading,
    hasMore,
    handleSeeMore,
  }
}
