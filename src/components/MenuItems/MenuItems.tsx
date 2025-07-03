import { MenuItem } from '@/lib/types'
import { MenuItemsWrapper } from './MenuItems.styles'
import NextLink from 'next/link'
import React from 'react'
import { MenuButton, MenuButtonProps } from '../MenuButton/MenuButton'

interface MenuItemsProps {
  menuItems: MenuItem[]
  handleClick: Pick<MenuButtonProps, 'handleClick'>['handleClick']
}

export const MenuItems: React.FC<MenuItemsProps> = ({ menuItems, handleClick }) => {
  return (
    <MenuItemsWrapper>
      {menuItems.map(
        (
          { fields: { link, label, isCta, isLink, shouldOpenInANewTab, shouldOpenInModal } },
          idx
        ) =>
          isLink || shouldOpenInANewTab ? (
            <NextLink
              href={link}
              passHref
              key={idx}
              target={shouldOpenInANewTab ? '_blank' : undefined}
              rel={shouldOpenInANewTab ? 'noopener noreferrer' : undefined}
            >
              <MenuButton
                link={link}
                label={label}
                isCta={isCta}
                isLink={isLink}
                shouldOpenInANewTab={shouldOpenInANewTab}
                shouldOpenInModal={shouldOpenInModal}
              />
            </NextLink>
          ) : (
            <MenuButton
              key={idx}
              link={link}
              label={label}
              isCta={isCta}
              isLink={isLink}
              shouldOpenInANewTab={shouldOpenInANewTab}
              shouldOpenInModal={shouldOpenInModal}
              handleClick={handleClick}
            />
          )
      )}
    </MenuItemsWrapper>
  )
}
