import { ContentSection, ContentSectionProps } from '../ContentSection/ContentSection'
import { Cta } from '@/lib/types'
import { DetailsCta } from '../DetailsCta/DetailsCta'
import { ContentWrapper } from './DetailsContent.styles'
import { motion } from 'framer-motion'
import { FADE_IN_UP } from '@/constants/animation'
import Grid2 from '@mui/material/Grid2'

interface DetailsContentProps extends ContentSectionProps {
  cta: Cta
}

export const DetailsContent: React.FC<DetailsContentProps> = ({
  subtitle,
  title,
  description,
  sectionName,
  cta,
}) => {
  return (
    <ContentWrapper
      container
      spacing={{
        xs: 4,
        sm: 8,
      }}
    >
      <Grid2 size={{ xs: 12, md: 8 }}>
        <motion.div
          variants={FADE_IN_UP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ContentSection
            subtitle={subtitle}
            title={title}
            description={description}
            sectionName={sectionName}
          />
        </motion.div>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <motion.div
          variants={FADE_IN_UP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <DetailsCta sectionName={sectionName} {...cta} />
        </motion.div>
      </Grid2>
    </ContentWrapper>
  )
}
