import { Menu } from '@/lib/types'
import { handleMenuClickType } from '../Menu/Menu'
import { MenuItemButton, MenuItemsWrapper } from './MenuItems.styles'

interface MenuItemsProps {
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
  handleMenuClick: handleMenuClickType
}

export const MenuItems: React.FC<MenuItemsProps> = ({ menuItems, handleMenuClick }) => {
  return (
    <MenuItemsWrapper>
      {menuItems.map(({ fields: { link, label, isCta, shouldOpenInANewTab } }, idx) => (
        <MenuItemButton
          key={idx}
          color={isCta ? 'primary' : 'inherit'}
          variant={isCta ? 'contained' : 'text'}
          onClick={() => handleMenuClick(link, isCta, shouldOpenInANewTab)}
          isCta={isCta}
        >
          {label}
        </MenuItemButton>
      ))}
    </MenuItemsWrapper>
  )
}
