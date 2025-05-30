import { Contact } from '@/lib/types'
import { Footer } from '../Footer/Footer'

interface PageWrapperProps {
  children: React.ReactNode
  contact: Contact
}

export const PageWrapper = ({ children, contact }: PageWrapperProps) => {
  return (
    <>
      {children}
      <Footer {...contact} />
    </>
  )
}
