import { HomeHeader } from '@/components/HomeHeader/HomeHeader'
import { getHomePage } from '@/lib/contentful'
import { GetServerSideProps, NextPage } from 'next'
import { HomePage as ContentfulHomePage } from '@/lib/types'
import { About } from '@/components/About/About'
import { ServicesSection } from '@/components/ServicesSection/ServicesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection/TestimonialsSection'
import { getSpotifyEpisodes } from '@/lib/spotify'
import { PodcastsSection } from '@/components/PodcastsSection/PodcastsSection'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EventsSection } from '@/components/EventsSection/EventsSection'
import { Seo } from '@/components/Seo/Seo'

interface HomePage {
  home: ContentfulHomePage
}

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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const home = await getHomePage()
  const episodes = await getSpotifyEpisodes({ limit: 3 })

  if (!home) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en-US', ['common'])),
      home: {
        ...home,
        podcasts: {
          fields: {
            ...home.podcasts?.fields,
            episodes: episodes.items,
          },
        },
      },
    },
  }
}

export default Home
