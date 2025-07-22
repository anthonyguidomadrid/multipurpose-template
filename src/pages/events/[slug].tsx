import { SectionWrapper } from '@/components/common/styles'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { Seo } from '@/components/Seo/Seo'
import { LINK } from '@/constants/link'
import { getCtaByType, getOtherDetails, getDetailsBySlug } from '@/lib/contentful'
import { Cta, EventFields, Event } from '@/lib/types'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EventJsonLd } from 'next-seo'
import dynamic from 'next/dynamic'

interface EventsPageProps {
  event: EventFields
  otherEvents: Event[]
  cta: Cta
}

const DetailsContent = dynamic(() =>
  import('@/components/DetailsContent/DetailsContent').then((mod) => mod.DetailsContent)
)
const EventDetails = dynamic(() =>
  import('@/components/EventDetails/EventDetails').then((mod) => mod.EventDetails)
)
const EventsSection = dynamic(() =>
  import('@/components/EventsSection/EventsSection').then((mod) => mod.EventsSection)
)

const EventPage: NextPage<EventsPageProps> = ({
  event: {
    title,
    thumbnail,
    secondaryTitle,
    subtitle,
    description,
    startDate,
    finishingDate,
    isVirtual,
    location,
    contactEmail,
    contactPhone,
    placeName,
    seo,
    slug,
  },
  otherEvents,
  cta,
}) => {
  const { t } = useTranslation()
  const sectionName = 'event-details'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  return (
    <>
      <Seo {...seo.fields} />
      <EventJsonLd
        name={title}
        startDate={startDate}
        endDate={finishingDate}
        location={{
          name: { placeName },
          address: {
            streetAddress: location,
          },
        }}
        url={`${baseUrl}/events/${slug}`}
        images={[thumbnail.fields.file.url]}
        description={subtitle}
        organizer={{
          type: 'Organization',
          url: baseUrl,
        }}
        eventStatus="EventScheduled"
      />
      <DetailsHeader
        title={title}
        image={thumbnail}
        breadcrumb={{ label: t('breadcrumb.events'), link: LINK.EVENTS }}
        sectionName={sectionName}
        slug={slug}
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
          isVirtual={isVirtual}
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

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
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
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      event,
      otherEvents,
      cta,
    },
  }
}

export default EventPage
