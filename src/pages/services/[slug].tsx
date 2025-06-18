import { SectionWrapper } from '@/components/common/styles'
import { DetailsContent } from '@/components/DetailsContent/DetailsContent'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { ServicesSection } from '@/components/ServicesSection/ServicesSection'
import { SlideGallery } from '@/components/SlideGallery/SlideGallery'
import { LINK } from '@/constants/link'
import { getCtaByType, getOtherServices, getServiceBySlug } from '@/lib/contentful'
import { Cta, Service, ServiceFields } from '@/lib/types'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ServicePageProps {
  service: ServiceFields
  otherServices: Service[]
  cta: Cta
}

const ServicePage: NextPage<ServicePageProps> = ({
  service: { mainTitle, subtitle, thumbnail, secondaryTitle, description, carrouselImages },
  otherServices,
  cta,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <DetailsHeader
        title={mainTitle}
        image={thumbnail}
        breadcrumb={{ label: t('breadcrumb.services'), link: LINK.SERVICES }}
      />
      <SectionWrapper>
        <DetailsContent
          sectionName="service-details"
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
  const service = await getServiceBySlug(slug)
  const otherServices = await getOtherServices(slug)
  const cta = await getCtaByType('service')

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
