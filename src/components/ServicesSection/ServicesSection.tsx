import { Services } from '@/lib/types'
import { Grid2 } from '@mui/material'
import { ContentSection } from '../ContentSection/ContentSection'
import { Service } from '../Service/Service'
import { ServiceSectionWrapper } from './ServiceSections.styles'
import { SectionWrapper } from '../common/styles'
import { motion } from 'framer-motion'
import { FADE_IN_UP } from '@/constants/animation'
import { useGridSize } from '@/hooks/useGridSize'

const FADE_IN_VARIANTS = {
  ...FADE_IN_UP,
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.3,
    },
  }),
}

export const ServicesSection: React.FC<Services> = ({ title, subtitle, services }) => {
  const itemCount = services.length
  const gridSize = useGridSize(itemCount)

  return (
    <ServiceSectionWrapper id="services">
      <ContentSection subtitle={subtitle} title={title} sectionName="services" />
      <SectionWrapper container spacing={4}>
        {services.map((item, index) => (
          <Grid2
            key={index}
            size={gridSize}
            component={motion.div}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
            variants={FADE_IN_VARIANTS}
          >
            <Service {...item} />
          </Grid2>
        ))}
      </SectionWrapper>
    </ServiceSectionWrapper>
  )
}
