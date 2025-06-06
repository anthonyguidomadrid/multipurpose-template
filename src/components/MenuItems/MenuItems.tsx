import { Menu } from '@/lib/types'
import { Box, Button } from '@mui/material'
import { handleMenuClickType } from '../Menu/Menu'

interface MenuItemsProps {
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
  handleMenuClick: handleMenuClickType
}

export const MenuItems: React.FC<MenuItemsProps> = ({ menuItems, handleMenuClick }) => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      {menuItems.map(({ fields: { link, label, isCta, shouldOpenInANewTab } }, idx) => (
        <Button
          key={idx}
          color={isCta ? 'primary' : 'inherit'}
          variant={isCta ? 'contained' : 'text'}
          onClick={() => handleMenuClick(link, isCta, shouldOpenInANewTab)}
        >
          {label}
        </Button>
      ))}
    </Box>
  )
}
