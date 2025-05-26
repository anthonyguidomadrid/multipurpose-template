import { getDate } from '@/helpers/date'
import { Event } from '@/lib/types'
import { CardMedia, CardContent, Typography, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  EventButtonWrapper,
  EventCardWrapper,
  EventRibbon,
  StyledEventCard,
} from './EventCard.styles'

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
  },
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <EventCardWrapper>
      <EventRibbon>{getDate(new Date(startDate), 'dd MMMM yyyy', locale)}</EventRibbon>
      <StyledEventCard>
        <CardMedia component="img" alt={thumbnailTitle} height="200" image={thumbnailUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2">{subtitle}</Typography>
          <EventButtonWrapper>
            <Button size="small">{t('button.seeMore')}</Button>
          </EventButtonWrapper>
        </CardContent>
      </StyledEventCard>
    </EventCardWrapper>
  )
}
