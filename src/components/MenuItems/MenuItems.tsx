import { Menu } from '@/lib/types'
import { MenuItemButton, MenuItemsWrapper } from './MenuItems.styles'
import NextLink from 'next/link'
import React, { MouseEventHandler } from 'react'

interface MenuItemsProps {
  menuItems: Pick<Menu, 'menuItems'>['menuItems']
  handleScrollOrNavigate: (link: string) => MouseEventHandler<HTMLButtonElement> | undefined
}

export const MenuItems: React.FC<MenuItemsProps> = ({ menuItems, handleScrollOrNavigate }) => {
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
            <MenuItemButton color="primary" variant="contained" isCta data-testid="menu-item-cta">
              {label}
            </MenuItemButton>
          </NextLink>
        ) : (
          <MenuItemButton
            key={idx}
            color="inherit"
            variant="text"
            isCta={false}
            data-testid="menu-item-button"
            onClick={handleScrollOrNavigate(link)}
          >
            {label}
          </MenuItemButton>
        )
      )}
    </MenuItemsWrapper>
  )
}
