import { getDate } from '@/helpers/date'
import { Event } from '@/lib/types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  EventButtonWrapper,
  EventCardWrapper,
  EventRibbon,
  StyledEventCard,
} from './EventCard.styles'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

export const EventCard: React.FC<Event> = ({
  fields: {
    title,
    subtitle,
    startDate,
    thumbnail: {
      fields: {
        title: thumbnailTitle,
        file: { url: thumbnailUrl },
      },
    },
    slug,
  },
}) => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()

  const handleClick = () => push(`/events/${slug}`)

  return (
    <EventCardWrapper data-testid="event-card">
      <EventRibbon data-testid="event-ribbon">
        {getDate(startDate, 'dd MMMM yyyy', locale)}
      </EventRibbon>
      <StyledEventCard>
        <CardMedia
          component="img"
          alt={thumbnailTitle}
          height="200"
          image={thumbnailUrl}
          data-testid="event-image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" data-testid="event-title">
            {title}
          </Typography>
          <Typography variant="body2" data-testid="event-subtitle">
            {subtitle}
          </Typography>
          <EventButtonWrapper>
            <Button size="small" data-testid="event-button" onClick={handleClick}>
              {t('button.seeMore')}
            </Button>
          </EventButtonWrapper>
        </CardContent>
      </StyledEventCard>
    </EventCardWrapper>
  )
}
