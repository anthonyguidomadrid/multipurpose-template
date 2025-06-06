import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Menu } from '@/lib/types'
import { handleMenuClickType } from '../Menu/Menu'

interface MobileDrawerProps {
  drawerOpen: boolean
  handleDrawerToggle: () => void
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
  handleMenuClick: handleMenuClickType
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  drawerOpen,
  handleDrawerToggle,
  menuItems,
  handleMenuClick,
}) => (
  <Drawer
    anchor="left"
    open={drawerOpen}
    onClose={handleDrawerToggle}
    ModalProps={{ keepMounted: true }}
  >
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map(({ fields: { link, label, isCta, shouldOpenInANewTab } }, idx) => (
          <ListItem key={idx} disablePadding>
            {isCta ? (
              <Button
                variant="contained"
                onClick={() => handleMenuClick(link, true, shouldOpenInANewTab)}
                sx={{ margin: '8px 16px' }}
              >
                {label}
              </Button>
            ) : (
              <ListItemButton
                onClick={() => handleMenuClick(link, false, shouldOpenInANewTab)}
                sx={{ color: 'white' }}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  </Drawer>
)
