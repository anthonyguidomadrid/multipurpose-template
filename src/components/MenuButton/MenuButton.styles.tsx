import { Button, styled } from '@mui/material'

export const MenuItemButton = styled(Button)<{ isCta: boolean }>(({ theme, isCta }) => ({
  '&:hover': {
    ...(!isCta && { color: theme.palette.primary.main }),
  },
}))
