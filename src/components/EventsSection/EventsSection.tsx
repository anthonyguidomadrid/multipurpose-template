import { Events } from '@/lib/types'
import { SectionWithBackground, SectionWrapper } from '../common/styles'
import { ContentSection } from '../ContentSection/ContentSection'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { EventCard } from '../EventCard/EventCard'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      // Stagger the animation for first 4 cards
      delay: index < 4 ? index * 0.3 : 0,
    },
  }),
}

export const EventsSection: React.FC<Events> = ({ title, subtitle, events }) => {
  return (
    <SectionWithBackground id="events">
      <ContentSection subtitle={subtitle} title={title} sectionName="events" />
      <SectionWrapper>
        <Swiper
          spaceBetween={30}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                variants={FADE_IN_VARIANTS}
              >
                <EventCard {...event} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SectionWrapper>
    </SectionWithBackground>
  )
}
