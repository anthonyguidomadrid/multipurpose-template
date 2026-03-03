import { NotFound } from '@/components/NotFound/NotFound'
import { ThemeSettings } from '@/lib/types'
import { NextPage } from 'next'
import { getCommonPageProps } from '@/lib/commonPageProps'

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
      ...(await getCommonPageProps(locale || 'en')),
    },
  }
}

export default Custom404
