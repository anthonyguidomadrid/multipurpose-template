import { IconButton, List, ListItem } from '@mui/material'
import { Menu } from '@/lib/types'
import CloseIcon from '@mui/icons-material/Close'
import { CloseButtonWrapper, MobileMenuItemsWrapper, StyledDrawer } from './MobileDrawer.styles'
import NextLink from 'next/link'
import { MenuButton, MenuButtonProps } from '../MenuButton/MenuButton'

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
        {menuItems.map(
          (
            { fields: { link, label, isCta, isLink, shouldOpenInANewTab, shouldOpenInModal } },
            idx
          ) => (
            <ListItem key={idx} disablePadding>
              {isLink || shouldOpenInANewTab ? (
                <NextLink
                  href={link}
                  passHref
                  target={shouldOpenInANewTab ? '_blank' : undefined}
                  rel={shouldOpenInANewTab ? 'noopener noreferrer' : undefined}
                  data-testid="mobile-drawer-link"
                >
                  <MenuButton
                    isCta={isCta}
                    label={label}
                    link={link}
                    shouldOpenInANewTab={shouldOpenInANewTab}
                    shouldOpenInModal={shouldOpenInModal}
                    isLink={isLink}
                    isMobile={true}
                  />
                </NextLink>
              ) : (
                <MenuButton
                  isCta={isCta}
                  label={label}
                  link={link}
                  shouldOpenInANewTab={shouldOpenInANewTab}
                  shouldOpenInModal={shouldOpenInModal}
                  isLink={isLink}
                  handleClick={handleClick}
                  isMobile={true}
                />
              )}
            </ListItem>
          )
        )}
      </List>
    </MobileMenuItemsWrapper>
  </StyledDrawer>
)
