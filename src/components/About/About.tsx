import { About as AboutType } from '@/lib/types'
import { Box, Grid2, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { AboutImage } from './About.styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { FADE_IN_UP } from '../common/animation.constant'

export const About: React.FC<AboutType> = ({ title, subtitle, description, photo }) => (
  <Grid2 container spacing={8} padding={8}>
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
      <Typography variant="h6" data-testid="about-subtitle">
        {subtitle}
      </Typography>
      <Typography variant="h2" data-testid="about-title">
        {title}
      </Typography>
      <Box data-testid="about-description">{documentToReactComponents(description)}</Box>
    </Grid2>
  </Grid2>
)
