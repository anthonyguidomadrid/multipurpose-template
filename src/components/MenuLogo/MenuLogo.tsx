import { useRouter } from 'next/router'
import { Menu } from '@/lib/types'
import { MenuLogoImage, MenuLogoWrapper } from './MenuLogo.styles'
import { animateScroll as scroll } from 'react-scroll'
import { getImageDetails } from '@/helpers/image'

export const MenuLogo: React.FC<Pick<Menu, 'logo'>> = ({ logo }) => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const { imageUrl, imageDescription, imageWidth, imageHeight } = getImageDetails(logo)

  const handleLogoClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (isHomePage) {
      scroll.scrollToTop()
    } else {
      await router.push('/')
    }
  }

  return (
    <MenuLogoWrapper onClick={handleLogoClick} component="a" href="/" data-testid="menu-logo">
      <MenuLogoImage
        src={imageUrl}
        alt={imageDescription}
        width={imageWidth}
        height={imageHeight}
      />
    </MenuLogoWrapper>
  )
}
