import { Typography, CardActionArea, CardMedia } from '@mui/material'
import { useState } from 'react'
import { Service as ServiceType } from '@/lib/types'
import { ServiceCardContent, StyledServiceCard } from './Service.styles'

export const Service: React.FC<ServiceType> = ({ fields: { mainTitle, subtitle, thumbnail } }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <StyledServiceCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          src={thumbnail.fields.file.url}
          alt={thumbnail.fields.description}
          sx={{
            height: 300,
            objectFit: 'cover',
          }}
        />
        <ServiceCardContent className="hover-content">
          <Typography gutterBottom variant="h3">
            {mainTitle}
          </Typography>
          {isHovered && <Typography>{subtitle}</Typography>}
        </ServiceCardContent>
      </CardActionArea>
    </StyledServiceCard>
  )
}
