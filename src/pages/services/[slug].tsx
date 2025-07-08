import { SectionWrapper } from '@/components/common/styles'
import { DetailsContent } from '@/components/DetailsContent/DetailsContent'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { Seo } from '@/components/Seo/Seo'
import { ServicesSection } from '@/components/ServicesSection/ServicesSection'
import { SlideGallery } from '@/components/SlideGallery/SlideGallery'
import { LINK } from '@/constants/link'
import { getCtaByType, getOtherDetails, getDetailsBySlug, getAllSlugs } from '@/lib/contentful'
import { Cta, Service, ServiceFields } from '@/lib/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ServicePageProps {
  service: ServiceFields
  otherServices: Service[]
  cta: Cta
}

const ServicePage: NextPage<ServicePageProps> = ({
  service: { mainTitle, subtitle, thumbnail, secondaryTitle, description, carrouselImages, seo },
  otherServices,
  cta,
}) => {
  const { t } = useTranslation()
  const sectionName = 'service-details'
  return (
    <>
      <Seo {...seo.fields} />
      <DetailsHeader
        title={mainTitle}
        image={thumbnail}
        breadcrumb={{ label: t('breadcrumb.services'), link: LINK.SERVICES }}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const services = await getAllSlugs('service')

  return {
    paths: services.map((service) => ({
      params: { slug: service.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params || {}
  if (typeof slug !== 'string') {
    return { notFound: true }
  }
  const contentType = 'service'
  const service = await getDetailsBySlug(slug, contentType)
  const otherServices = await getOtherDetails(slug, contentType)
  const cta = await getCtaByType(contentType)

  if (!service) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en-US', ['common'])),
      service,
      otherServices,
      cta,
    },
  }
}

export default ServicePage
