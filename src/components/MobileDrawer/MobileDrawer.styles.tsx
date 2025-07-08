import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import styled from '@mui/material/styles/styled'
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
