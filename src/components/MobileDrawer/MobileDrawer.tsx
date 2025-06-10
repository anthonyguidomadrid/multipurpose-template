import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Menu } from '@/lib/types'
import CloseIcon from '@mui/icons-material/Close'
import {
  CloseButtonWrapper,
  DrawerCtaButton,
  MobileMenuItemsWrapper,
  StyledDrawer,
  StyledScrollLink,
} from './MobileDrawer.styles'
import NextLink from 'next/link'

interface MobileDrawerProps {
  drawerOpen: boolean
  handleDrawerToggle: () => void
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  drawerOpen,
  handleDrawerToggle,
  menuItems,
}) => (
  <StyledDrawer
    anchor="left"
    open={drawerOpen}
    onClose={handleDrawerToggle}
    ModalProps={{ keepMounted: true }}
    data-testid="mobileDrawer"
  >
    <MobileMenuItemsWrapper role="presentation" onClick={handleDrawerToggle}>
      <CloseButtonWrapper>
        <IconButton data-testid="mobileDrawerCloseButton">
          <CloseIcon />
        </IconButton>
      </CloseButtonWrapper>
      <List>
        {menuItems.map(({ fields: { link, label, isCta, shouldOpenInANewTab } }, idx) => (
          <ListItem key={idx} disablePadding>
            {isCta ? (
              <NextLink
                href={link}
                passHref
                target={shouldOpenInANewTab ? '_blank' : undefined}
                rel={shouldOpenInANewTab ? 'noopener noreferrer' : undefined}
                data-testid="mobileDrawerCtaLink"
              >
                <DrawerCtaButton variant="contained">{label}</DrawerCtaButton>
              </NextLink>
            ) : (
              <StyledScrollLink
                to={link}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={handleDrawerToggle}
                data-testid="mobileDrawerScrollLink"
              >
                <ListItemButton>
                  <ListItemText primary={label} />
                </ListItemButton>
              </StyledScrollLink>
            )}
          </ListItem>
        ))}
      </List>
    </MobileMenuItemsWrapper>
  </StyledDrawer>
)
