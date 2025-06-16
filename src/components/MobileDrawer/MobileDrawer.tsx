import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Menu } from '@/lib/types'
import CloseIcon from '@mui/icons-material/Close'
import {
  CloseButtonWrapper,
  DrawerCtaButton,
  MobileMenuItemsWrapper,
  StyledDrawer,
} from './MobileDrawer.styles'
import NextLink from 'next/link'

interface MobileDrawerProps {
  drawerOpen: boolean
  handleDrawerToggle: () => void
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
  handleScrollOrNavigate: (link: string) => (e: React.MouseEvent) => void
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  drawerOpen,
  handleDrawerToggle,
  handleScrollOrNavigate,
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
        {menuItems.map(({ fields: { link, label, isCta, shouldOpenInANewTab } }, idx) => (
          <ListItem key={idx} disablePadding>
            {isCta ? (
              <NextLink
                href={link}
                passHref
                target={shouldOpenInANewTab ? '_blank' : undefined}
                rel={shouldOpenInANewTab ? 'noopener noreferrer' : undefined}
                data-testid="mobile-drawer-cta-link"
              >
                <DrawerCtaButton variant="contained">{label}</DrawerCtaButton>
              </NextLink>
            ) : (
              <ListItemButton
                onClick={handleScrollOrNavigate(link)}
                data-testid={`mobile-drawer-scroll-link-${link}`}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </MobileMenuItemsWrapper>
  </StyledDrawer>
)
