import { SectionWrapper } from '@/components/common/styles'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { Seo } from '@/components/Seo/Seo'
import { LINK } from '@/constants/link'
import { getCtaByType, getOtherDetails, getDetailsBySlug } from '@/lib/contentful'
import { Cta, Service, ServiceFields } from '@/lib/types'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ProductJsonLd } from 'next-seo'
import dynamic from 'next/dynamic'

interface ServicePageProps {
  service: ServiceFields
  otherServices: Service[]
  cta: Cta
}

const DetailsContent = dynamic(() =>
  import('@/components/DetailsContent/DetailsContent').then((mod) => mod.DetailsContent)
)
const SlideGallery = dynamic(() =>
  import('@/components/SlideGallery/SlideGallery').then((mod) => mod.SlideGallery)
)
const ServicesSection = dynamic(() =>
  import('@/components/ServicesSection/ServicesSection').then((mod) => mod.ServicesSection)
)

const ServicePage: NextPage<ServicePageProps> = ({
  service: {
    mainTitle,
    subtitle,
    thumbnail,
    secondaryTitle,
    description,
    carrouselImages,
    seo,
    slug,
  },
  otherServices,
  cta,
}) => {
  const { t } = useTranslation()
  const sectionName = 'service-details'
  return (
    <>
      <Seo {...seo.fields} />
      <ProductJsonLd
        type="Product"
        name={mainTitle}
        image={carrouselImages.map((image) => image.fields.file.url)}
        description={subtitle}
      />
      <DetailsHeader
        title={mainTitle}
        image={thumbnail}
        breadcrumb={{ label: t('breadcrumb.services'), link: LINK.SERVICES }}
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
        <SlideGallery images={carrouselImages} />
      </SectionWrapper>
      <ServicesSection
        title={t('title.otherServices')}
        subtitle={t('subtitle.otherServices')}
        services={otherServices}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const { slug } = params || {}

  if (typeof slug !== 'string') {
    return { notFound: true }
  }
  const contentType = 'service'
  let service: ServiceFields | null = null
  let otherServices: Service[] = []
  let cta: Cta = { title: '', description: '', phone: '', email: '' }

  try {
    service = (await getDetailsBySlug(slug, contentType)) as ServiceFields
  } catch (error) {
    console.error('getDetailsBySlug failed in services/[slug].getServerSideProps', { slug }, error)
  }

  try {
    otherServices = (await getOtherDetails(slug, contentType)) as unknown as Service[]
  } catch (error) {
    console.error('getOtherDetails failed in services/[slug].getServerSideProps', { slug }, error)
  }

  try {
    cta = (await getCtaByType(contentType)) as Cta
  } catch (error) {
    console.error('getCtaByType failed in services/[slug].getServerSideProps', { slug }, error)
  }

  if (!service) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      service,
      otherServices,
      cta,
    },
  }
}

export default ServicePage
