import { Contact } from '@/lib/types'
import { Footer } from '../Footer/Footer'

interface PageWrapperProps {
  children: React.ReactNode
  contact: Contact
  websiteName: string
}

export const PageWrapper = ({ children, contact, websiteName }: PageWrapperProps) => {
  return (
    <>
      {children}
      <Footer {...contact} websiteName={websiteName} />
    </>
  )
}
