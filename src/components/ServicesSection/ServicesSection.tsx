import { Services } from '@/lib/types'
import { Box, Grid2 } from '@mui/material'
import { ContentSection } from '../ContentSection/ContentSection'
import { COMMON_PAGE_WRAPPER } from '@/constants/spacing'
import { Service } from '../Service/Service'

export const ServicesSection: React.FC<Services> = ({ title, subtitle, services }) => {
  const getSmSize = (itemCount: number) => {
    if (itemCount === 1) return 12
    return 6
  }
  const getMdSize = (itemCount: number) => {
    if (itemCount === 1) return 12
    if (itemCount === 2 || itemCount === 4) return 6
    if (itemCount === 3) return 4
    return 4
  }
  return (
    <Box
      style={{
        backgroundColor: '#dfe3e2',
        textAlign: 'center',
        paddingTop: '50px',
        paddingBottom: '50px',
      }}
      id="services"
    >
      <ContentSection subtitle={subtitle} title={title} sectionName="services" />
      <Grid2 container style={{ ...COMMON_PAGE_WRAPPER, padding: '16px' }} spacing={4}>
        {services.map((item, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: getSmSize(services.length), md: getMdSize(services.length) }}
          >
            <Service {...item} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}
