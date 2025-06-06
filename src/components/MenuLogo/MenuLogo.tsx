import { handleScrollToTop } from '@/helpers/scroll'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Menu } from '@/lib/types'

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
    <Box
      sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
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
      <Image
        src={`https:${logoUrl}`}
        alt={logoTitle}
        width={logoWidth}
        height={logoHeight}
        style={{
          borderRadius: 8,
          height: 'auto',
          maxHeight: 50,
          objectFit: 'contain',
          width: 'auto',
        }}
      />
    </Box>
  )
}
