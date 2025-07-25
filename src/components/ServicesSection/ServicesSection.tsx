import { Services } from '@/lib/types'
import Grid2 from '@mui/material/Grid2'
import { ContentSection } from '../ContentSection/ContentSection'
import { ServiceCard } from '../ServiceCard/ServiceCard'
import { SectionWithBackground, SectionWrapper } from '../common/styles'
import { motion } from 'framer-motion'
import { FADE_IN_VARIANTS } from '@/constants/animation'
import { useGridSize } from '@/hooks/useGridSize'

export const ServicesSection: React.FC<Services> = ({ title, subtitle, services }) => {
  const itemCount = services.length
  const gridSize = useGridSize(itemCount)

  return (
    <SectionWithBackground id="services">
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
            <ServiceCard {...item} />
          </Grid2>
        ))}
      </SectionWrapper>
    </SectionWithBackground>
  )
}
