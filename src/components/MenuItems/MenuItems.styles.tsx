import { Box, Button, styled } from '@mui/material'

export const MenuItemsWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: 2,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

export const MenuItemButton = styled(Button)<{ isCta: boolean }>(({ theme, isCta }) => ({
  '&:hover': {
    ...(!isCta && { color: theme.palette.primary.main }),
  },
}))
