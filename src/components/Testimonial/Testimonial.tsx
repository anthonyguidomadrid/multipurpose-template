import { Testimonial as TestimonialType } from '@/lib/types'
import { Grid2, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import {
  Author,
  TestimonialContainer,
  TestimonialImage,
  TestimonialImageWrapper,
  TestimonialQuote,
} from './Testimonial.styles'
import { getDate } from '@/helpers/date'
import { getImageUrl } from '@/helpers/link'

export const Testimonial: React.FC<TestimonialType> = ({
  fields: { title, description, author, date, image },
}) => {
  const { locale } = useRouter()
  const formattedDate = getDate(date, 'MMMM yyyy', locale)
  return (
    <TestimonialContainer container spacing={2} data-testid="testimonial-slide">
      <TestimonialImageWrapper size={2}>
        <TestimonialImage
          src={getImageUrl(image.fields.file.url)}
          alt={image.fields.description}
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.height}
          data-testid="testimonial-image"
        />
      </TestimonialImageWrapper>
      <Grid2 size={10}>
        <Typography variant="h6" data-testid="testimonial-title">
          {title}
        </Typography>
        <TestimonialQuote component="blockquote" data-testid="testimonial-quote">
          {description}
        </TestimonialQuote>
        <Author data-testid="testimonial-author">
          {author}, {formattedDate}
        </Author>
      </Grid2>
    </TestimonialContainer>
  )
}
