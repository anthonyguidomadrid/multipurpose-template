import { NotFound } from '@/components/NotFound/NotFound'
import { ThemeSettings } from '@/lib/types'
import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface Custom404Props {
  settings: ThemeSettings
}

const Custom404: NextPage<Custom404Props> = ({
  settings: {
    pageNotFoundBackgroundImage: {
      fields: {
        file: { url: backgroundImageUrl },
      },
    },
  },
}) => <NotFound backgroundImageUrl={backgroundImageUrl} />

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Custom404
