import { Contact, Menu as MenuType } from '@/lib/types'
import { Footer } from '../Footer/Footer'
import { Menu } from '../Menu/Menu'

interface PageWrapperProps {
  children: React.ReactNode
  contact: Contact
  websiteName: string
  menu: MenuType
}

export const PageWrapper = ({ children, contact, websiteName, menu }: PageWrapperProps) => {
  return (
    <>
      <Menu {...menu} />
      {children}
      <Footer {...contact} websiteName={websiteName} />
    </>
  )
}
