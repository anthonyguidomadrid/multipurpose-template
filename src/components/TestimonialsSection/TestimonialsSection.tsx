import { Testimonials } from '@/lib/types'
import { ContentSection } from '../ContentSection/ContentSection'
import { SectionWrapper } from '../common/styles'
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Testimonial } from '../Testimonial/Testimonial'
import { Slide, Slider } from './TestimonialsSection.styles'

export const TestimonialsSection: React.FC<Testimonials> = ({ title, subtitle, testimonials }) => (
  <SectionWrapper>
    <ContentSection subtitle={subtitle} title={title} sectionName="testimonials" />
    <Slider
      direction="vertical"
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      mousewheel={true}
      modules={[Pagination, Autoplay, Mousewheel]}
    >
      {testimonials.map((testimonial, index) => (
        <Slide key={index}>
          <Testimonial {...testimonial} />
        </Slide>
      ))}
    </Slider>
  </SectionWrapper>
)
