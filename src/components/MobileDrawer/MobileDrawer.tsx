import { IconButton, List, ListItem } from '@mui/material'
import { Menu } from '@/lib/types'
import CloseIcon from '@mui/icons-material/Close'
import { CloseButtonWrapper, MobileMenuItemsWrapper, StyledDrawer } from './MobileDrawer.styles'
import { MenuButtonProps } from '../MenuButton/MenuButton'
import { MenuItem } from '../MenuItem/MenuItem'

interface MobileDrawerProps {
  drawerOpen: boolean
  handleDrawerToggle: () => void
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
  handleClick: Pick<MenuButtonProps, 'handleClick'>['handleClick']
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  drawerOpen,
  handleDrawerToggle,
  handleClick,
  menuItems,
}) => (
  <StyledDrawer
    anchor="left"
    open={drawerOpen}
    onClose={handleDrawerToggle}
    ModalProps={{ keepMounted: true }}
    data-testid="mobile-drawer"
  >
    <MobileMenuItemsWrapper role="presentation" onClick={handleDrawerToggle}>
      <CloseButtonWrapper>
        <IconButton data-testid="mobile-drawer-close-button">
          <CloseIcon />
        </IconButton>
      </CloseButtonWrapper>
      <List>
        {menuItems.map(({ fields }, idx) => (
          <ListItem key={idx} disablePadding>
            <MenuItem {...fields} handleClick={handleClick} isMobile />
          </ListItem>
        ))}
      </List>
    </MobileMenuItemsWrapper>
  </StyledDrawer>
)
