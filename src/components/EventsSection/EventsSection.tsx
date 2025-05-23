import { Events } from '@/lib/types'
import { SectionWithBackground, SectionWrapper } from '../common/styles'
import { ContentSection } from '../ContentSection/ContentSection'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { EventCard } from '../EventCard/EventCard'

export const EventsSection: React.FC<Events> = ({ title, subtitle, events }) => {
  return (
    <SectionWithBackground id="events">
      <ContentSection subtitle={subtitle} title={title} sectionName="events" />
      <SectionWrapper>
        <Swiper
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={30}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <EventCard {...event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SectionWrapper>
    </SectionWithBackground>
  )
}
