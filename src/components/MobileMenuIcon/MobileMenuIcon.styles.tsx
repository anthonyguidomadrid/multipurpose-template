import { Box, styled } from '@mui/material'

export const MobileMenuIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  marginLeft: 'auto',
}))
