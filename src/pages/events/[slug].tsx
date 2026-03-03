import { SectionWrapper } from '@/components/common/styles'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { Seo } from '@/components/Seo/Seo'
import { LINK } from '@/constants/link'
import { getCtaByType, getOtherDetails, getDetailsBySlug, getSlugsByType } from '@/lib/contentful'
import { Cta, EventFields, Event } from '@/lib/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { EventJsonLd } from 'next-seo'
import dynamic from 'next/dynamic'
import { getCommonPageProps } from '@/lib/commonPageProps'

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
        location={isVirtual ? 'Online' : placeName}
        url={`${baseUrl}/events/${slug}`}
        image={[thumbnail.fields.file.url]}
        description={subtitle}
        organizer={baseUrl}
        eventStatus="https://schema.org/EventScheduled"
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params || {}
  if (typeof slug !== 'string') {
    return { notFound: true }
  }
  const contentType = 'event'
  let event: EventFields | null = null
  let otherEvents: Event[] = []
  let cta: Cta = { title: '', description: '', phone: '', email: '' }

  try {
    event = (await getDetailsBySlug(slug, contentType)) as EventFields
  } catch (error) {
    console.error('getDetailsBySlug failed in events/[slug].getServerSideProps', { slug }, error)
  }

  try {
    otherEvents = (await getOtherDetails(slug, contentType)) as unknown as Event[]
  } catch (error) {
    console.error('getOtherDetails failed in events/[slug].getServerSideProps', { slug }, error)
  }

  try {
    cta = (await getCtaByType(contentType)) as Cta
  } catch (error) {
    console.error('getCtaByType failed in events/[slug].getServerSideProps', { slug }, error)
  }

  if (!event) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await getCommonPageProps(locale || 'en')),
      event,
      otherEvents,
      cta,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getSlugsByType('event')
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export default EventPage
