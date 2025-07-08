import { SectionWrapper } from '@/components/common/styles'
import { DetailsContent } from '@/components/DetailsContent/DetailsContent'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { EventDetails } from '@/components/EventDetails/EventDetails'
import { EventsSection } from '@/components/EventsSection/EventsSection'
import { Seo } from '@/components/Seo/Seo'
import { LINK } from '@/constants/link'
import { getCtaByType, getOtherDetails, getDetailsBySlug, getAllSlugs } from '@/lib/contentful'
import { Cta, EventFields, Event } from '@/lib/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface EventsPageProps {
  event: EventFields
  otherEvents: Event[]
  cta: Cta
}

const EventPage: NextPage<EventsPageProps> = ({
  event: {
    title,
    thumbnail,
    secondaryTitle,
    subtitle,
    description,
    startDate,
    finishingDate,
    location,
    contactEmail,
    contactPhone,
    placeName,
    seo,
  },
  otherEvents,
  cta,
}) => {
  const { t } = useTranslation()
  const sectionName = 'event-details'
  return (
    <>
      <Seo {...seo.fields} />
      <DetailsHeader
        title={title}
        image={thumbnail}
        breadcrumb={{ label: t('breadcrumb.events'), link: LINK.EVENTS }}
        sectionName={sectionName}
      />
      <SectionWrapper>
        <DetailsContent
          sectionName={sectionName}
          title={secondaryTitle}
          subtitle={subtitle}
          description={description}
          cta={cta}
        />
        <EventDetails
          startDate={startDate}
          finishingDate={finishingDate}
          location={location}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          placeName={placeName}
        />
      </SectionWrapper>
      <EventsSection
        title={t('title.otherEvents')}
        subtitle={t('subtitle.otherEvents')}
        events={otherEvents}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllSlugs('event')

  return {
    paths: events.map((event) => ({
      params: { slug: event.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params || {}
  if (typeof slug !== 'string') {
    return { notFound: true }
  }
  const contentType = 'event'
  const event = await getDetailsBySlug(slug, contentType)
  const otherEvents = await getOtherDetails(slug, contentType)
  const cta = await getCtaByType(contentType)

  if (!event) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en-US', ['common'])),
      event,
      otherEvents,
      cta,
    },
  }
}

export default EventPage
