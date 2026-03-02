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
  const opensInModal = Boolean(shouldOpenInModal || isCta)

  // Items that open in a modal must always go through the click handler
  // (otherwise the dialog never opens).
  if (opensInModal) {
    return (
      <MenuButton
        link={link}
        label={label}
        isCta={isCta}
        isLink={isLink}
        shouldOpenInANewTab={shouldOpenInANewTab}
        shouldOpenInModal={opensInModal}
        handleClick={handleClick}
        isMobile={isMobile}
      />
    )
  }

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
        shouldOpenInModal={opensInModal}
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
      shouldOpenInModal={opensInModal}
      handleClick={handleClick}
      isMobile={isMobile}
    />
  )
}
