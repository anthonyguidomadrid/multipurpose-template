import { Menu as MenuType } from '@/lib/types'
import { useState } from 'react'
import { MenuLogo } from '../MenuLogo/MenuLogo'
import { MenuItems } from '../MenuItems/MenuItems'
import { MobileMenuIcon } from '../MobileMenuIcon/MobileMenuIcon'
import { MobileDrawer } from '../MobileDrawer/MobileDrawer'
import { StyledMenu, MenuBar } from './Menu.styles'
import { useScroll } from '@/hooks/useScroll'

export const Menu: React.FC<MenuType> = ({ logo, menuItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAtTop } = useScroll()

  const handleDrawerToggle = () => setDrawerOpen((open) => !open)

  return (
    <StyledMenu position="fixed" color="default" elevation={1} isAtTop={isAtTop}>
      <MenuBar>
        <MenuLogo logo={logo} />
        <MenuItems menuItems={menuItems} />
        <MobileMenuIcon handleDrawerToggle={handleDrawerToggle} />
      </MenuBar>
      <MobileDrawer
        drawerOpen={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuItems={menuItems}
      />
    </StyledMenu>
  )
}
