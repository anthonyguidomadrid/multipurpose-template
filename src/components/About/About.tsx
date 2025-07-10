import { About as AboutType } from '@/lib/types'
import Grid2 from '@mui/material/Grid2'
import { AboutImage } from './About.styles'
import { FADE_IN_UP } from '@/constants/animation'
import { ContentSection } from '../ContentSection/ContentSection'
import { SectionWrapper } from '../common/styles'
import { getImageDetails } from '@/helpers/image'
import { motion } from 'framer-motion'

export const About: React.FC<AboutType> = ({ title, subtitle, description, photo }) => {
  const { imageUrl, imageDescription, imageWidth, imageHeight } = getImageDetails(photo)
  return (
    <SectionWrapper
      id="about"
      container
      spacing={{
        xs: 4,
        sm: 8,
      }}
    >
      <Grid2
        size={{ xs: 12, md: 4 }}
        order={{ xs: 2, md: 1 }}
        component={motion.div}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={FADE_IN_UP}
      >
        <AboutImage
          src={imageUrl}
          alt={imageDescription}
          width={imageWidth}
          height={imageHeight}
          data-testid="about-image"
        />
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 8 }}
        order={{ xs: 1, md: 2 }}
        component={motion.div}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={FADE_IN_UP}
      >
        <ContentSection
          subtitle={subtitle}
          title={title}
          description={description}
          sectionName="about"
        />
      </Grid2>
    </SectionWrapper>
  )
}
