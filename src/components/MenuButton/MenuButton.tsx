import { MenuItem } from '@/lib/types'
import { MenuItemButton } from './MenuButton.styles'
import { MouseEventHandler } from 'react'

export type MenuButtonProps = MenuItem['fields'] & {
  handleClick?: (
    link: string,
    shouldOpenInModal: boolean,
    label: string
  ) => MouseEventHandler<HTMLButtonElement>
  isMobile?: boolean
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  link,
  label,
  isCta,
  shouldOpenInModal,
  handleClick,
  isMobile,
}) => (
  <MenuItemButton
    color={isCta ? 'primary' : 'inherit'}
    variant={isCta ? 'contained' : 'text'}
    isCta={isCta}
    data-testid={`menu-item-${isCta ? 'cta' : 'button'}${isMobile ? '-mobile' : ''}`}
    {...(handleClick && { onClick: handleClick(link, shouldOpenInModal, label) })}
  >
    {label}
  </MenuItemButton>
)
