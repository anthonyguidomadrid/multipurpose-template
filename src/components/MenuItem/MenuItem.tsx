import NextLink from 'next/link'
import { MenuButton, MenuButtonProps } from '../MenuButton/MenuButton'
import { MenuItem as MenuItemType } from '@/lib/types'

type MenuItemProps = MenuItemType['fields'] & {
  handleClick: Pick<MenuButtonProps, 'handleClick'>['handleClick']
  isMobile?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({
  isLink,
  link,
  shouldOpenInANewTab,
  label,
  isCta,
  shouldOpenInModal,
  handleClick,
  isMobile,
}) => {
  return isLink ? (
    <NextLink
      href={link}
      passHref
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
        isMobile={isMobile}
      />
    </NextLink>
  ) : (
    <MenuButton
      link={link}
      label={label}
      isCta={isCta}
      isLink={isLink}
      shouldOpenInANewTab={shouldOpenInANewTab}
      shouldOpenInModal={shouldOpenInModal}
      handleClick={handleClick}
      isMobile={isMobile}
    />
  )
}
