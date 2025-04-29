import { localeMap } from '@/constants/localeMap'
import { Testimonial as TestimonialType } from '@/lib/types'
import { Grid2, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const Testimonial: React.FC<TestimonialType> = ({
  fields: { title, description, author, date, image },
}) => {
  const { locale } = useRouter()
  const dateLocale = localeMap[locale || 'en']
  const formattedDate = format(new Date(date), 'MMMM yyyy', { locale: dateLocale })
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  return (
    <Grid2 container style={{ padding: '50px' }} spacing={2}>
      <Grid2 size={2}>
        <Image
          src={`https:${image.fields.file.url}`}
          alt={image.fields.description}
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.height}
          data-testid="testimonial-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Grid2>
      <Grid2 size={10}>
        <Typography variant="h6">{title}</Typography>
        <Typography
          component="blockquote"
          style={{
            fontStyle: 'italic',
            borderLeft: '4px solid #eaeaea',
            paddingLeft: '16px',
            margin: '16px 0',
            color: '#555',
          }}
        >
          {description}
        </Typography>
        <Typography style={{ textAlign: 'right' }}>
          {author}, {capitalizedDate}
        </Typography>
      </Grid2>
    </Grid2>
  )
}
