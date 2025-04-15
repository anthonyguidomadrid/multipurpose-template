import { About as AboutType } from '@/lib/types'
import { Grid2, Typography } from '@mui/material'
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
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
      <Typography variant="h6">{subtitle}</Typography>
      <Typography variant="h2">{title}</Typography>
      {documentToReactComponents(description)}
    </Grid2>
  </Grid2>
)
