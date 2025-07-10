import { Testimonial as TestimonialType } from '@/lib/types'
import { useRouter } from 'next/router'
import {
  Author,
  TestimonialContainer,
  TestimonialImage,
  TestimonialImageWrapper,
  TestimonialQuote,
} from './Testimonial.styles'
import { getDate } from '@/helpers/date'
import Grid2 from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { getImageDetails } from '@/helpers/image'

export const Testimonial: React.FC<TestimonialType> = ({
  fields: { title, description, author, date, image },
}) => {
  const { locale } = useRouter()
  const formattedDate = getDate(date, 'MMMM yyyy', locale)
  const { imageUrl, imageDescription, imageWidth, imageHeight } = getImageDetails(image)

  return (
    <TestimonialContainer container spacing={2} data-testid="testimonial-slide">
      <TestimonialImageWrapper size={2}>
        <TestimonialImage
          src={imageUrl}
          alt={imageDescription}
          width={imageWidth}
          height={imageHeight}
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
