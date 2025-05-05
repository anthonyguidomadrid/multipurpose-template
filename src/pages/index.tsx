import { HomeHeader } from '@/components/HomeHeader/HomeHeader'
import { getHomePage } from '@/lib/contentful'
import { GetServerSideProps } from 'next'
import { HomePage as ContentfulHomePage } from '@/lib/types'
import { About } from '@/components/About/About'
import { ServicesSection } from '@/components/ServicesSection/ServicesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection/TestimonialsSection'
import { getSpotifyEpisodes } from '@/lib/spotify'

interface HomePage {
  name: string
  home: ContentfulHomePage
}

export default function Home({
  home: { header, about, services, testimonials, podcasts },
}: HomePage) {
  console.log({ podcasts })
  return (
    <>
      <HomeHeader {...header} />
      <About {...about} />
      <ServicesSection {...services} />
      <TestimonialsSection {...testimonials} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const home = await getHomePage()
  const episodes = await getSpotifyEpisodes({ limit: 3, offset: 3 })

  if (!home) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
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
