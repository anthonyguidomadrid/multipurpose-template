import type { GetStaticProps, NextPage } from 'next'
import Error from 'next/error'

import { getCommonPageProps } from '@/lib/commonPageProps'

const Custom500: NextPage = () => {
  return <Error statusCode={500} />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await getCommonPageProps(locale || 'en')),
    },
  }
}

export default Custom500
