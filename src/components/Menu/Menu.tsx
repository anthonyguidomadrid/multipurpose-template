import { Menu as MenuType } from '@/lib/types'
import { handleScrollToSection } from '@/helpers/scroll'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MenuLogo } from '../MenuLogo/MenuLogo'
import { MenuItems } from '../MenuItems/MenuItems'
import { MobileMenuIcon } from '../MobileMenuIcon/MobileMenuIcon'
import { MobileDrawer } from '../MobileDrawer/MobileDrawer'
import { StyledMenu, MenuBar } from './Menu.styles'
import { useScroll } from '@/hooks/useScroll'

export type handleMenuClickType = (
  link: string,
  isCta: boolean,
  shouldOpenInANewTab: boolean
) => void

export const Menu: React.FC<MenuType> = ({ logo, menuItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const { isAtTop } = useScroll()
  const isHomePage = router.pathname === '/'

  const handleDrawerToggle = () => setDrawerOpen((open) => !open)

  const handleMenuClick = async (link: string, isCta: boolean, shouldOpenInANewTab: boolean) => {
    if (isCta) {
      if (shouldOpenInANewTab) {
        window.open(link, '_blank', 'noopener,noreferrer')
      } else {
        router.push(link)
      }
    } else {
      if (isHomePage) {
        handleScrollToSection(link)
      } else {
        await router.push('/')
        setTimeout(() => handleScrollToSection(link), 300)
      }
    }
  }
  return (
    <StyledMenu position="fixed" color="default" elevation={1} isAtTop={isAtTop}>
      <MenuBar>
        <MenuLogo logo={logo} />
        <MenuItems menuItems={menuItems} handleMenuClick={handleMenuClick} />
        <MobileMenuIcon handleDrawerToggle={handleDrawerToggle} />
      </MenuBar>
      <MobileDrawer
        drawerOpen={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuItems={menuItems}
        handleMenuClick={handleMenuClick}
      />
    </StyledMenu>
  )
}
