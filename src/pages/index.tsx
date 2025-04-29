import { HomeHeader } from '@/components/HomeHeader/HomeHeader'
import { getHomePage } from '@/lib/contentful'
import { GetServerSideProps } from 'next'
import { HomePage as ContentfulHomePage } from '@/lib/types'
import { About } from '@/components/About/About'
import { ServicesSection } from '@/components/ServicesSection/ServicesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection/TestimonialsSection'

interface HomePage {
  name: string
  home: ContentfulHomePage
}

export default function Home({ home: { header, about, services, testimonials } }: HomePage) {
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

  if (!home) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      home,
    },
  }
}
