import { Typography } from '@mui/material'
import { Image } from '@/lib/types'
import { BreadcrumbLabel, DetailsHeaderWrapper, StyledBreadcrumbs } from './DetailsHeader.styles'
import { motion } from 'framer-motion'
import { FADE_IN_UP } from '@/constants/animation'
import { BackgroundImage, Overlay } from '../common/styles'

interface DetailsHeaderProps {
  title: string
  breadcrumb: {
    label: string
    link: string
  }
  image: Image
  sectionName: string
  backgroundPosition?: string
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  title,
  breadcrumb,
  image,
  sectionName,
  backgroundPosition = 'center',
}) => {
  return (
    <DetailsHeaderWrapper>
      <BackgroundImage
        backgroundImage={image.fields.file.url}
        data-testid={`${sectionName}-background-image`}
        backgroundPosition={backgroundPosition}
      />
      <Overlay>
        <motion.nav
          variants={FADE_IN_UP}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <StyledBreadcrumbs>
            <BreadcrumbLabel
              href={breadcrumb.link}
              passHref
              data-testid={`${sectionName}-breadcrumb-label`}
            >
              {breadcrumb.label}
            </BreadcrumbLabel>
            <Typography variant="h3" component="h1" data-testid={`${sectionName}-header-title`}>
              {title}
            </Typography>
          </StyledBreadcrumbs>
        </motion.nav>
      </Overlay>
    </DetailsHeaderWrapper>
  )
}
