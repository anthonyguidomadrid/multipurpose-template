import { getDate } from '@/helpers/date'
import { Event } from '@/lib/types'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  return (
    <Link
      href={`/events/${title.toLowerCase().replaceAll(' ', '-')}`}
      passHref
      style={{ textDecoration: 'none' }}
    >
      <Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        {/* Ribbon for startingDate */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#004D59',
            color: 'white',
            padding: '4px 8px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            borderBottomLeftRadius: '4px',
            zIndex: 1,
            textTransform: 'capitalize',
          }}
        >
          {getDate(new Date(startDate), 'dd MMMM yyyy', locale)}
        </Box>
        <Card sx={{ marginBottom: 6, backgroundColor: 'white' }}>
          <CardMedia component="img" alt={thumbnailTitle} height="140" image={thumbnailUrl} />
          <CardContent style={{ backgroundColor: 'transparent' }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Link>
  )
}
