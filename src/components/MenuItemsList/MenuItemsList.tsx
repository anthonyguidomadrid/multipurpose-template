import { MenuItem as MenuItemType } from '@/lib/types'
import { MenuItemsWrapper } from './MenuItemsList.styles'
import React from 'react'
import { MenuButtonProps } from '../MenuButton/MenuButton'
import { MenuItem } from '../MenuItem/MenuItem'

interface MenuItemsProps {
  menuItems: MenuItemType[]
  handleClick: Pick<MenuButtonProps, 'handleClick'>['handleClick']
}

export const MenuItemsList: React.FC<MenuItemsProps> = ({ menuItems, handleClick }) => {
  return (
    <MenuItemsWrapper>
      {menuItems.map(({ fields }, idx) => (
        <MenuItem key={idx} {...fields} handleClick={handleClick} />
      ))}
    </MenuItemsWrapper>
  )
}
