import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Menu } from '@/lib/types'
import { handleMenuClickType } from '../Menu/Menu'
import CloseIcon from '@mui/icons-material/Close'
import {
  CloseButtonWrapper,
  DrawerCtaButton,
  MobileMenuItemsWrapper,
  StyledDrawer,
} from './MobileDrawer.styles'

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
  <StyledDrawer
    anchor="left"
    open={drawerOpen}
    onClose={handleDrawerToggle}
    ModalProps={{ keepMounted: true }}
  >
    <MobileMenuItemsWrapper role="presentation" onClick={handleDrawerToggle}>
      <CloseButtonWrapper>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </CloseButtonWrapper>
      <List>
        {menuItems.map(({ fields: { link, label, isCta, shouldOpenInANewTab } }, idx) => (
          <ListItem key={idx} disablePadding>
            {isCta ? (
              <DrawerCtaButton
                variant="contained"
                onClick={() => handleMenuClick(link, true, shouldOpenInANewTab)}
              >
                {label}
              </DrawerCtaButton>
            ) : (
              <ListItemButton onClick={() => handleMenuClick(link, false, shouldOpenInANewTab)}>
                <ListItemText primary={label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </MobileMenuItemsWrapper>
  </StyledDrawer>
)
