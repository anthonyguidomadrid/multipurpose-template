import { About as AboutType } from '@/lib/types'
import { Grid2, Typography } from '@mui/material'
import Image from 'next/image'

export const About: React.FC<AboutType> = ({ title, subtitle, description, photo }) => (
  <Grid2 container spacing={8} padding={8}>
    <Grid2 size={4}>
      <Image
        src={`https:${photo.fields.file.url}`}
        alt={photo.fields.description}
        width={photo.fields.file.details.image.width}
        height={photo.fields.file.details.image.height}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Grid2>
    <Grid2 size={8}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {subtitle}
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Grid2>
  </Grid2>
)
