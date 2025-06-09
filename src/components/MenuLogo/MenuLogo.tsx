import { handleScrollToTop } from '@/helpers/scroll'
import { useRouter } from 'next/router'
import { Menu } from '@/lib/types'
import { MenuLogoImage, MenuLogoWrapper } from './MenuLogo.styles'

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
          handleScrollToTop()
        } else {
          await router.push('/')
        }
      }}
      component="a"
      href="/"
    >
      <MenuLogoImage
        src={`https:${logoUrl}`}
        alt={logoTitle}
        width={logoWidth}
        height={logoHeight}
      />
    </MenuLogoWrapper>
  )
}
