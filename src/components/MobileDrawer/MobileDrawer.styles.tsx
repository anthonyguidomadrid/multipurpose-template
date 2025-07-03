import { Box, Drawer, styled } from '@mui/material'
import { Link as ScrollLink } from 'react-scroll'

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.common.white,
  },
}))

export const MobileMenuItemsWrapper = styled(Box)(() => ({
  width: 250,
}))

export const CloseButtonWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  padding: theme.spacing(1, 2, 0, 0),
}))

export const StyledScrollLink = styled(ScrollLink)(() => ({ width: '100%', display: 'block' }))
