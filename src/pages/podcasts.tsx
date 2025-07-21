import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { getShowInformation, getSpotifyEpisodes, SpotifyEpisode } from '@/lib/spotify'
import { GetStaticProps, NextPage } from 'next'
import { Image } from '@/lib/types'
import { useTranslation } from 'next-i18next'
import { LINK } from '@/constants/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { usePaginatedEpisodes } from '@/hooks/usePaginatedEpisodes'
import { WebPageJsonLd } from 'next-seo'
import dynamic from 'next/dynamic'
import { Seo } from '@/components/Seo/Seo'

interface PodcastsPageProps {
  name: string
  description: string
  images: { url: string }[]
  episodes: { items: SpotifyEpisode[] }
}

const EPISODES_PER_PAGE = 10

const PodcastList = dynamic(() =>
  import('@/components/PodcastList/PodcastList').then((mod) => mod.PodcastList)
)

const PodcastsPage: NextPage<PodcastsPageProps> = ({
  name,
  description,
  images,
  episodes: { items: initialEpisodes },
}) => {
  const image = {
    fields: {
      file: {
        url: images?.[0].url,
      },
    },
  } as Image
  const { t } = useTranslation()

  const { episodes, hasMore, handleSeeMore, loading } = usePaginatedEpisodes({
    initialEpisodes,
    episodesPerPage: EPISODES_PER_PAGE,
  })

  return (
    <>
      <Seo metaTitle={name} metaDescription={description} ogImage={image} />
      <WebPageJsonLd
        description={description}
        id={`${process.env.NEXT_PUBLIC_SITE_URL}/podcasts`}
      />
      <DetailsHeader
        title={name}
        image={image}
        breadcrumb={{ label: t('breadcrumb.podcasts'), link: LINK.PODCASTS }}
        sectionName="podcasts"
        backgroundPosition="top"
      />
      <PodcastList
        description={description}
        episodes={episodes}
        hasMore={hasMore}
        handleSeeMore={handleSeeMore}
        loading={loading}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const show = await getShowInformation()
  const episodes = await getSpotifyEpisodes({ limit: EPISODES_PER_PAGE, offset: 0 })

  if (!show || !episodes) {
    return { notFound: true }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en-US', ['common'])),
      ...show,
      episodes,
    },
  }
}

export default PodcastsPage
