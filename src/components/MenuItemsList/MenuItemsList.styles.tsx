import { Box, styled } from '@mui/material'

export const MenuItemsWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: 2,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))
