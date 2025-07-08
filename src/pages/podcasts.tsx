import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { getShowInformation, getSpotifyEpisodes, SpotifyEpisode } from '@/lib/spotify'
import { GetServerSideProps, NextPage } from 'next'
import { Image } from '@/lib/types'
import { useTranslation } from 'next-i18next'
import { LINK } from '@/constants/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button, Grid2, Typography } from '@mui/material'
import { SectionWrapper } from '@/components/common/styles'
import { PodcastEpisode } from '@/components/PodcastEpisode/PodcastEpisode'
import { usePaginatedEpisodes } from '@/hooks/usePaginatedEpisodes'
import { motion } from 'framer-motion'
import { FADE_IN_UP } from '@/constants/animation'

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

  const { episodes, hasMore, handleSeeMore, loading } = usePaginatedEpisodes({
    initialEpisodes,
    episodesPerPage: EPISODES_PER_PAGE,
  })

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
        <Grid2 container spacing={5} direction="column">
          <Grid2 size={12}>
            <Typography data-testid="podcasts-description">{description}</Typography>
          </Grid2>
          <Grid2 size={12}>
            {episodes?.length > 0 ? (
              episodes.map(
                (episode) =>
                  episode && (
                    <motion.div
                      key={episode.id}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={FADE_IN_UP}
                    >
                      <PodcastEpisode key={episode.id} {...episode} />
                    </motion.div>
                  )
              )
            ) : (
              <Typography variant="body1" color="text.secondary">
                {t('podcasts.noEpisodes')}
              </Typography>
            )}
          </Grid2>
          <Grid2 size={12} display="flex" justifyContent="center">
            {hasMore && (
              <Button
                variant="contained"
                onClick={handleSeeMore}
                disabled={loading}
                data-testid="see-more-episodes-button"
              >
                {t('button.seeMoreEpisodes')}
              </Button>
            )}
          </Grid2>
        </Grid2>
      </SectionWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const show = await getShowInformation()
  const episodes = await getSpotifyEpisodes({ limit: EPISODES_PER_PAGE, offset: 0 })

  if (!show || !episodes) {
    return { notFound: true }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en-US', ['common'])),
      ...show,
      episodes,
    },
  }
}

export default PodcastsPage
