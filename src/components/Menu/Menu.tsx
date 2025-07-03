import { Menu as MenuType } from '@/lib/types'
import { useState } from 'react'
import { MenuLogo } from '../MenuLogo/MenuLogo'
import { MenuItems } from '../MenuItems/MenuItems'
import { MobileMenuIcon } from '../MobileMenuIcon/MobileMenuIcon'
import { MobileDrawer } from '../MobileDrawer/MobileDrawer'
import { StyledMenu, MenuBar, ModalContent } from './Menu.styles'
import { useScroll } from '@/hooks/useScroll'
import { useRouter } from 'next/router'
import { scroller } from 'react-scroll'
import { Dialog } from '../Dialog/Dialog'

export const Menu: React.FC<MenuType> = ({ logo, menuItems }) => {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInfo, setModalInfo] = useState<{ title: string; children: React.ReactNode }>({
    title: '',
    children: undefined,
  })
  const { isAtTop } = useScroll()

  const handleDrawerToggle = () => setDrawerOpen((open) => !open)

  const handleClick =
    (link: string, shouldOpenInModal: boolean, label: string) => async (e: React.MouseEvent) => {
      e.preventDefault()

      if (shouldOpenInModal) {
        setIsModalOpen(true)
        setModalInfo({
          title: label,
          children: <ModalContent src={link} title={label} allowFullScreen />,
        })
        return
      }

      if (isHome) {
        scroller.scrollTo(link, {
          duration: 500,
          smooth: 'easeInOutQuart',
          offset: -70,
        })
      } else {
        await router.push(`/#${link}`)
        setTimeout(() => {
          scroller.scrollTo(link, {
            duration: 500,
            smooth: 'easeInOutQuart',
            offset: -70,
          })
        }, 300)
      }
    }

  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <StyledMenu position="fixed" color="default" elevation={1} isAtTop={isAtTop}>
        <MenuBar>
          <MenuLogo logo={logo} />
          <MenuItems menuItems={menuItems} handleClick={handleClick} />
          <MobileMenuIcon handleDrawerToggle={handleDrawerToggle} />
        </MenuBar>
        <MobileDrawer
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          menuItems={menuItems}
          handleClick={handleClick}
        />
      </StyledMenu>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        title={modalInfo.title}
        fullWidth
        maxWidth="xl"
        name="menu"
      >
        {modalInfo.children}
      </Dialog>
    </>
  )
}
