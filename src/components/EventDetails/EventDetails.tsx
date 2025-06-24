import { EventFields } from '@/lib/types'
import { Grid2, Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import EventIcon from '@mui/icons-material/Event'
import { LabelWithIcon } from '../LabelWithIcon/LabelWithIcon'
import PlaceIcon from '@mui/icons-material/Place'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { useRouter } from 'next/router'
import { getDate } from '@/helpers/date'
import { getEmailLink, getPhoneLink } from '@/helpers/link'
import { Map } from '../Map/Map'
import { DetailsWrapper } from './EventDetails.styles'
import { motion } from 'framer-motion'
import { FADE_IN_UP } from '@/constants/animation'

type EventDetailsProps = Pick<
  EventFields,
  'startDate' | 'finishingDate' | 'location' | 'contactEmail' | 'contactPhone' | 'placeName'
>

export const EventDetails: React.FC<EventDetailsProps> = ({
  startDate,
  finishingDate,
  location,
  contactEmail,
  contactPhone,
  placeName,
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const getEventDate = (date: string) => getDate(new Date(date), 'dd MMMM yyyy HH:mm', locale)
  return (
    <Grid2 container spacing={2}>
      <DetailsWrapper
        size={{ xs: 12, sm: 6 }}
        component={motion.div}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={FADE_IN_UP}
      >
        <Typography variant="h3" data-testid="event-details-secondary-title">
          {t('title.eventDetails')}
        </Typography>
        <LabelWithIcon
          label={
            <Typography>
              {t('event.start', {
                date: getEventDate(startDate),
              })}
            </Typography>
          }
          icon={<EventIcon />}
          name="event-start-date"
        />
        <LabelWithIcon
          label={
            <Typography>
              {t('event.end', {
                date: getEventDate(finishingDate),
              })}
            </Typography>
          }
          icon={<EventIcon />}
          name="event-finishing-date"
        />
        <LabelWithIcon
          label={<Typography>{placeName}</Typography>}
          icon={<PlaceIcon />}
          name="event-place"
        />
        <LabelWithIcon
          label={<Link href={getPhoneLink(contactPhone)}>{contactPhone}</Link>}
          icon={<PhoneIcon />}
          name="event-contact-phone"
        />
        <LabelWithIcon
          label={<Link href={getEmailLink(contactEmail)}>{contactEmail}</Link>}
          icon={<EmailIcon />}
          name="event-contact-email"
        />
      </DetailsWrapper>
      <Grid2
        size={{ xs: 12, sm: 6 }}
        component={motion.div}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={FADE_IN_UP}
      >
        <Map lat={location.lat} lon={location.lon} />
      </Grid2>
    </Grid2>
  )
}
