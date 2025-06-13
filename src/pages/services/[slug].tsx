import { DetailsContent } from '@/components/DetailsContent/DetailsContent'
import { DetailsHeader } from '@/components/DetailsHeader/DetailsHeader'
import { LINK } from '@/constants/link'
import { getCtaByType, getServiceBySlug } from '@/lib/contentful'
import { Cta, ServiceFields } from '@/lib/types'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ServicePageProps {
  service: ServiceFields
  cta: Cta
}

const ServicePage: NextPage<ServicePageProps> = ({
  service: { mainTitle, subtitle, thumbnail, secondaryTitle, description },
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
      <DetailsContent
        sectionName="service-details"
        title={secondaryTitle}
        subtitle={subtitle}
        description={description}
        cta={cta}
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
  const cta = await getCtaByType('service')

  if (!service) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en-US', ['common'])),
      service,
      cta,
    },
  }
}

export default ServicePage
