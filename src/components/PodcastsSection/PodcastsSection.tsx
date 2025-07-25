import { Podcasts } from '@/lib/types'
import { SectionWrapper } from '../common/styles'
import { PodcastEpisode } from '../PodcastEpisode/PodcastEpisode'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { AllPodcastsButtonWrapper, PodcastSection } from './PodcastsSection.styles'
import { FADE_IN_VARIANTS } from '@/constants/animation'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'

export const PodcastsSection: React.FC<Podcasts> = ({ title, subtitle, episodes }) => {
  const { t } = useTranslation()
  const { push } = useRouter()

  const handleSeeAllEpisodes = () => push('/podcasts')

  return (
    <SectionWrapper id="podcasts">
      <PodcastSection subtitle={subtitle} title={title} sectionName="podcasts" />
      {episodes.map(
        (episode, index) =>
          episode && (
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
          )
      )}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        custom={episodes.length}
        variants={FADE_IN_VARIANTS}
      >
        <AllPodcastsButtonWrapper>
          <Button variant="contained" data-testid="see-all-podcasts" onClick={handleSeeAllEpisodes}>
            {t('button.seeAllEpisodes')}
          </Button>
        </AllPodcastsButtonWrapper>
      </motion.div>
    </SectionWrapper>
  )
}
