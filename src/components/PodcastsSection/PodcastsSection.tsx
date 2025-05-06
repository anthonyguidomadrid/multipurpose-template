import { Podcasts } from '@/lib/types'
import { ContentSection } from '../ContentSection/ContentSection'
import { SectionWrapper } from '../common/styles'
import { PodcastEpisode } from '../PodcastEpisode/PodcastEpisode'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

export const PodcastsSection: React.FC<Podcasts> = ({ title, subtitle, episodes }) => {
  const { t } = useTranslation('common')
  return (
    <SectionWrapper>
      <ContentSection subtitle={subtitle} title={title} sectionName="podcasts" />
      {episodes.map((episode) => (
        <PodcastEpisode key={episode.id} {...episode} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button variant="contained">{t('podcast.button.seeAll')}</Button>
      </Box>{' '}
    </SectionWrapper>
  )
}
