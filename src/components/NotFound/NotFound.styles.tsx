import { Box, styled } from '@mui/material'
import { Overlay } from '../common/styles'

export const NotFoundWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}))

export const StyledOverlay = styled(Overlay)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  color: theme.palette.common.white,
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  h2: {
    color: theme.palette.common.white,
  },
}))
