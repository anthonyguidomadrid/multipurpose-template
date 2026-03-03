import { HomeHeader } from '@/components/HomeHeader/HomeHeader'
import { getHomePage } from '@/lib/contentful'
import { GetStaticProps, NextPage } from 'next'
import { HomePage as ContentfulHomePage } from '@/lib/types'
import { About } from '@/components/About/About'
import { ServicesSection } from '@/components/ServicesSection/ServicesSection'
import { getSpotifyEpisodes, SpotifyEpisode } from '@/lib/spotify'
import { Seo } from '@/components/Seo/Seo'
import dynamic from 'next/dynamic'
import { getCommonPageProps } from '@/lib/commonPageProps'

interface HomePage {
  home: ContentfulHomePage
}

const TestimonialsSection = dynamic(() =>
  import('@/components/TestimonialsSection/TestimonialsSection').then(
    (mod) => mod.TestimonialsSection
  )
)
const PodcastsSection = dynamic(() =>
  import('@/components/PodcastsSection/PodcastsSection').then((mod) => mod.PodcastsSection)
)
const EventsSection = dynamic(() =>
  import('@/components/EventsSection/EventsSection').then((mod) => mod.EventsSection)
)

const Home: NextPage<HomePage> = ({
  home: { header, about, services, testimonials, podcasts, events, seo },
}) => {
  const hasPodcasts = podcasts?.fields.episodes.length > 0
  const hasEvents = events?.fields.events.length > 0
  return (
    <>
      <Seo {...seo.fields} />
      <HomeHeader {...header.fields} />
      <About {...about.fields} />
      <ServicesSection {...services.fields} />
      <TestimonialsSection {...testimonials.fields} />
      {hasEvents && <EventsSection {...events.fields} />}
      {hasPodcasts && <PodcastsSection {...podcasts.fields} />}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let home: ContentfulHomePage | null = null
  let episodes: { items: SpotifyEpisode[] } = { items: [] }

  try {
    home = await getHomePage()
  } catch (error) {
    console.error('getHomePage failed in index.getStaticProps', error)
  }

  try {
    episodes = await getSpotifyEpisodes({ limit: 3 })
  } catch (error) {
    console.error('getSpotifyEpisodes failed in index.getStaticProps', error)
  }

  if (!home) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await getCommonPageProps(locale || 'en')),
      home: {
        ...home,
        podcasts: {
          fields: {
            ...home.podcasts?.fields,
            episodes: episodes.items || [],
          },
        },
      },
    },
    revalidate: 60 * 30,
  }
}

export default Home
