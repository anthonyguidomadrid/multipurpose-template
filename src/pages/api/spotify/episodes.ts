import type { NextApiRequest, NextApiResponse } from 'next'

import { getSpotifyEpisodes } from '@/lib/spotify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const limitParam = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit
  const offsetParam = Array.isArray(req.query.offset) ? req.query.offset[0] : req.query.offset

  const limit = Number(limitParam ?? 10)
  const offset = Number(offsetParam ?? 0)

  if (!Number.isFinite(limit) || !Number.isFinite(offset) || limit <= 0 || offset < 0) {
    return res.status(400).json({ error: 'Invalid limit/offset' })
  }

  try {
    const data = await getSpotifyEpisodes({ limit, offset })
    return res.status(200).json(data)
  } catch (error) {
    console.error('API /api/spotify/episodes failed', error)
    return res.status(500).json({ error: 'Failed to fetch episodes' })
  }
}
