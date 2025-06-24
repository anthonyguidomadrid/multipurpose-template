import { useState } from 'react'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { getShowInformation, getSpotifyEpisodes, SpotifyEpisode } from '@/lib/spotify'
import { GetServerSideProps, NextPage } from 'next'
import { Image } from '@/lib/types'
import { useTranslation } from 'next-i18next'
import { LINK } from '@/constants/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button, Typography } from '@mui/material'
import { SectionWrapper } from '@/components/common/styles'
import { PodcastEpisode } from '@/components/PodcastEpisode/PodcastEpisode'

interface PodcastsPageProps {
  name: string
  description: string
  images: { url: string }[]
  episodes: { items: SpotifyEpisode[] }
}

const EPISODES_PER_PAGE = 10

const PodcastsPage: NextPage<PodcastsPageProps> = ({
  name,
  description,
  images,
  episodes: { items: initialEpisodes },
}) => {
  const image = {
    fields: {
      file: {
        url: images?.[0].url,
      },
    },
  } as Image
  const { t } = useTranslation()

  const [episodes, setEpisodes] = useState<SpotifyEpisode[]>(initialEpisodes)
  const [offset, setOffset] = useState(initialEpisodes.length)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialEpisodes.length === EPISODES_PER_PAGE)

  const handleSeeMore = async () => {
    setLoading(true)
    const data = await getSpotifyEpisodes({
      limit: EPISODES_PER_PAGE,
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

  return (
    <>
      <DetailsHeader
        title={name}
        image={image}
        breadcrumb={{ label: t('breadcrumb.podcasts'), link: LINK.PODCASTS }}
        sectionName="podcasts"
        backgroundPosition="top"
      />
      <SectionWrapper>
        <Typography>{description}</Typography>
        {episodes.length > 0 ? (
          episodes.map((episode) => <PodcastEpisode key={episode.id} {...episode} />)
        ) : (
          <Typography variant="body1" color="text.secondary">
            {t('podcasts.noEpisodes')}
          </Typography>
        )}
        {hasMore && (
          <Button variant="contained" onClick={handleSeeMore} disabled={loading}>
            {loading ? t('loading') : t('See more episodes')}
          </Button>
        )}
      </SectionWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const show = await getShowInformation()
  const episodes = await getSpotifyEpisodes({ limit: EPISODES_PER_PAGE, offset: 0 })
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en-US', ['common'])),
      ...show,
      episodes,
    },
  }
}

export default PodcastsPage
