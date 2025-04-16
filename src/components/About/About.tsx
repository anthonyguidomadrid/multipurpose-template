import { About as AboutType } from '@/lib/types'
import { Grid2 } from '@mui/material'
import { motion } from 'framer-motion'
import { AboutImage } from './About.styles'
import { FADE_IN_UP } from '@/constants/animation'
import { COMMON_SECTION_SPACING_PADDING } from '@/constants/spacing'
import { ContentSection } from '../ContentSection/ContentSection'

export const About: React.FC<AboutType> = ({ title, subtitle, description, photo }) => (
  <Grid2
    container
    spacing={COMMON_SECTION_SPACING_PADDING}
    padding={COMMON_SECTION_SPACING_PADDING}
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
        src={`https:${photo.fields.file.url}`}
        alt={photo.fields.description}
        width={photo.fields.file.details.image.width}
        height={photo.fields.file.details.image.height}
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
  </Grid2>
)
