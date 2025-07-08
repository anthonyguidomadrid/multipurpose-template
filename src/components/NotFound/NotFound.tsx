import Typography from '@mui/material/Typography'
import { BackgroundImage } from '../common/styles'
import { NotFoundWrapper, StyledOverlay } from './NotFound.styles'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Button from '@mui/material/Button'

interface NotFoundProps {
  backgroundImageUrl: string
}

export const NotFound: React.FC<NotFoundProps> = ({ backgroundImageUrl }) => {
  const { t } = useTranslation()
  return (
    <NotFoundWrapper>
      <BackgroundImage
        backgroundImage={backgroundImageUrl}
        data-testid="not-found-image-background"
      />
      <StyledOverlay>
        <Typography variant="h2" data-testid="not-found-title">
          {t('title.notFound')}
        </Typography>
        <Typography data-testid="not-found-subtitle">{t('subtitle.notFound')}</Typography>
        <Link href="/" passHref>
          <Button variant="contained" data-testid="not-found-button">{t('button.goHome')}</Button>
        </Link>
      </StyledOverlay>
    </NotFoundWrapper>
  )
}
