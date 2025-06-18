import { Typography } from '@mui/material'
import { Image } from '@/lib/types'
import {
  BackgroundImage,
  BreadcrumbLabel,
  DetailsHeaderWrapper,
  Overlay,
  StyledBreadcrumbs,
} from './DetailsHeader.styles'
import { motion } from 'framer-motion'
import { FADE_IN_UP } from '@/constants/animation'

interface DetailsHeaderProps {
  title: string
  breadcrumb: {
    label: string
    link: string
  }
  image: Image
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({ title, breadcrumb, image }) => {
  return (
    <DetailsHeaderWrapper>
      <BackgroundImage backgroundImage={image.fields.file.url} />
      <Overlay>
        <motion.nav
          variants={FADE_IN_UP}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <StyledBreadcrumbs>
            <BreadcrumbLabel href={breadcrumb.link} passHref>
              {breadcrumb.label}
            </BreadcrumbLabel>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>
          </StyledBreadcrumbs>
        </motion.nav>
      </Overlay>
    </DetailsHeaderWrapper>
  )
}
