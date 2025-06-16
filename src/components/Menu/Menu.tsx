import { Menu as MenuType } from '@/lib/types'
import { useState } from 'react'
import { MenuLogo } from '../MenuLogo/MenuLogo'
import { MenuItems } from '../MenuItems/MenuItems'
import { MobileMenuIcon } from '../MobileMenuIcon/MobileMenuIcon'
import { MobileDrawer } from '../MobileDrawer/MobileDrawer'
import { StyledMenu, MenuBar } from './Menu.styles'
import { useScroll } from '@/hooks/useScroll'
import { useRouter } from 'next/router'
import { scroller } from 'react-scroll'

export const Menu: React.FC<MenuType> = ({ logo, menuItems }) => {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAtTop } = useScroll()

  const handleDrawerToggle = () => setDrawerOpen((open) => !open)

  const handleScrollOrNavigate = (link: string) => async (e: React.MouseEvent) => {
    e.preventDefault()
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

  return (
    <StyledMenu position="fixed" color="default" elevation={1} isAtTop={isAtTop}>
      <MenuBar>
        <MenuLogo logo={logo} />
        <MenuItems menuItems={menuItems} handleScrollOrNavigate={handleScrollOrNavigate} />
        <MobileMenuIcon handleDrawerToggle={handleDrawerToggle} />
      </MenuBar>
      <MobileDrawer
        drawerOpen={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuItems={menuItems}
        handleScrollOrNavigate={handleScrollOrNavigate}
      />
    </StyledMenu>
  )
}
