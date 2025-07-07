import { useRouter } from 'next/router'
import { Menu } from '@/lib/types'
import { MenuLogoImage, MenuLogoWrapper } from './MenuLogo.styles'
import { animateScroll as scroll } from 'react-scroll'
import { getImageUrl } from '@/helpers/link'

export const MenuLogo: React.FC<Pick<Menu, 'logo'>> = ({
  logo: {
    fields: {
      title: logoTitle,
      file: {
        url: logoUrl,
        details: {
          image: { width: logoWidth, height: logoHeight },
        },
      },
    },
  },
}) => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  return (
    <MenuLogoWrapper
      onClick={async (e) => {
        e.preventDefault()
        if (isHomePage) {
          scroll.scrollToTop()
        } else {
          await router.push('/')
        }
      }}
      component="a"
      href="/"
      data-testid="menu-logo"
    >
      <MenuLogoImage
        src={getImageUrl(logoUrl)}
        alt={logoTitle}
        width={logoWidth}
        height={logoHeight}
      />
    </MenuLogoWrapper>
  )
}
