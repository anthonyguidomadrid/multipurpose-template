import { Podcasts } from '@/lib/types'
import { ContentSection } from '../ContentSection/ContentSection'
import { SectionWrapper } from '../common/styles'
import { PodcastEpisode } from '../PodcastEpisode/PodcastEpisode'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { AllPodcastsButtonWrapper } from './PodcastsSection.styles'

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.3,
    },
  }),
}

export const PodcastsSection: React.FC<Podcasts> = ({ title, subtitle, episodes }) => {
  const { t } = useTranslation()

  return (
    <SectionWrapper>
      <ContentSection subtitle={subtitle} title={title} sectionName="podcasts" />
      {episodes.map((episode, index) => (
        <motion.div
          key={episode.id}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={index}
          variants={FADE_IN_VARIANTS}
        >
          <PodcastEpisode {...episode} />
        </motion.div>
      ))}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        custom={episodes.length}
        variants={FADE_IN_VARIANTS}
      >
        <AllPodcastsButtonWrapper>
          <Button variant="contained" data-testid="see-all-podcasts">
            {t('button.seeAllEpisodes')}
          </Button>
        </AllPodcastsButtonWrapper>
      </motion.div>
    </SectionWrapper>
  )
}
