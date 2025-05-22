import { HomeHeader } from '@/components/HomeHeader/HomeHeader'
import { getHomePage } from '@/lib/contentful'
import { GetServerSideProps } from 'next'
import { HomePage as ContentfulHomePage } from '@/lib/types'
import { About } from '@/components/About/About'
import { ServicesSection } from '@/components/ServicesSection/ServicesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection/TestimonialsSection'
import { getSpotifyEpisodes } from '@/lib/spotify'
import { PodcastsSection } from '@/components/PodcastsSection/PodcastsSection'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface HomePage {
  home: ContentfulHomePage
}

export default function Home({
  home: { header, about, services, testimonials, podcasts },
}: HomePage) {
  const hasPodcasts = podcasts.episodes.length > 0
  return (
    <>
      <HomeHeader {...header} />
      <About {...about} />
      <ServicesSection {...services} />
      <TestimonialsSection {...testimonials} />
      {hasPodcasts && <ServicesSection {...services} />}
      {hasPodcasts && <PodcastsSection {...podcasts} />}
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
          ...home.podcasts,
          episodes: episodes.items,
        },
      },
    },
  }
}
