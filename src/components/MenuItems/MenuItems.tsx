import { Menu } from '@/lib/types'
import { MenuItemButton, MenuItemsWrapper } from './MenuItems.styles'
import { Link as ScrollLink } from 'react-scroll'
import NextLink from 'next/link'

interface MenuItemsProps {
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
}

export const MenuItems: React.FC<MenuItemsProps> = ({ menuItems }) => {
  return (
    <MenuItemsWrapper>
      {menuItems.map(({ fields: { link, label, isCta, shouldOpenInANewTab } }, idx) =>
        isCta ? (
          <NextLink
            href={link}
            passHref
            key={idx}
            target={shouldOpenInANewTab ? '_blank' : undefined}
            rel={shouldOpenInANewTab ? 'noopener noreferrer' : undefined}
          >
            <MenuItemButton color="primary" variant="contained" isCta data-testid="menuItemCta">
              {label}
            </MenuItemButton>
          </NextLink>
        ) : (
          <ScrollLink to={link} key={idx} smooth={true} duration={500} offset={-70}>
            <MenuItemButton color="inherit" variant="text" isCta={false} data-testid="menuItemButton">
              {label}
            </MenuItemButton>
          </ScrollLink>
        )
      )}
    </MenuItemsWrapper>
  )
}
