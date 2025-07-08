import { useState } from 'react'
import { Service as ServiceType } from '@/lib/types'
import { ServiceCardContent, StyledServiceCard } from './ServiceCard.styles'
import Link from 'next/link'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export const ServiceCard: React.FC<ServiceType> = ({
  fields: { mainTitle, subtitle, thumbnail, slug },
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/services/${slug}`}>
      <StyledServiceCard
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="service-card"
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
            data-testid="service-image"
          />
          <ServiceCardContent className="hover-content">
            <Typography gutterBottom variant="h3" data-testid="service-title">
              {mainTitle}
            </Typography>
            {isHovered && <Typography data-testid="service-subtitle">{subtitle}</Typography>}
          </ServiceCardContent>
        </CardActionArea>
      </StyledServiceCard>
    </Link>
  )
}
