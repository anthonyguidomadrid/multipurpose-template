import { localeMap } from '@/constants/localeMap'
import { Testimonial as TestimonialType } from '@/lib/types'
import { Grid2, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import {
  Author,
  TestimonialContainer,
  TestimonialImage,
  TestimonialQuote,
} from './Testimonial.styles'

export const Testimonial: React.FC<TestimonialType> = ({
  fields: { title, description, author, date, image },
}) => {
  const { locale } = useRouter()
  const dateLocale = localeMap[locale || 'en']
  const formattedDate = format(new Date(date), 'MMMM yyyy', { locale: dateLocale })
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  return (
    <TestimonialContainer container spacing={2} data-testid="testimonial-slide">
      <Grid2
        size={2}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <TestimonialImage
          src={`https:${image.fields.file.url}`}
          alt={image.fields.description}
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.height}
          data-testid="testimonial-image"
        />
      </Grid2>
      <Grid2 size={10}>
        <Typography variant="h6" data-testid="testimonial-title">{title}</Typography>
        <TestimonialQuote component="blockquote" data-testid="testimonial-quote">{description}</TestimonialQuote>
        <Author data-testid="testimonial-author">
          {author}, {capitalizedDate}
        </Author>
      </Grid2>
    </TestimonialContainer>
  )
}
