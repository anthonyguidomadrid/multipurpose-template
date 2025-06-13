import { Box, Typography, Breadcrumbs } from '@mui/material'
import NextLink from 'next/link'
import { Image } from '@/lib/types'

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
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 200, md: 320 },
        display: 'flex',
        alignItems: 'flex-end',
        color: '#fff',
        overflow: 'hidden',
        mb: 4,
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image.fields.file.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          filter: 'brightness(0.5)',
        }}
      />
      {/* Overlay content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          p: { xs: 2, md: 4 },
        }}
      >
        <Breadcrumbs sx={{ color: '#fff', mb: 1 }}>
          <NextLink href={breadcrumb.link} passHref>
            {breadcrumb.label}
          </NextLink>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  )
}
