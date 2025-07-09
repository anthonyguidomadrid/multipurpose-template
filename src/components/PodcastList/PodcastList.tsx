import Grid2 from '@mui/material/Grid2/Grid2'
import { SectionWrapper } from '../common/styles'
import Typography from '@mui/material/Typography'
import { PodcastEpisode } from '../PodcastEpisode/PodcastEpisode'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { SpotifyEpisode } from '@/lib/spotify'
import { FADE_IN_UP } from '@/constants/animation'
import { useTranslation } from 'next-i18next'

interface PodcastListProps {
  description: string
  episodes: SpotifyEpisode[]
  hasMore: boolean
  handleSeeMore: () => Promise<void>
  loading: boolean
}

export const PodcastList: React.FC<PodcastListProps> = ({
  description,
  episodes,
  hasMore,
  handleSeeMore,
  loading,
}) => {
  const { t } = useTranslation()

  return (
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
  )
}
