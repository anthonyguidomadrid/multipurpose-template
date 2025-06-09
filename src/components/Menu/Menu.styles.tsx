import { AppBar, styled, Toolbar } from '@mui/material'

export const StyledMenu = styled(AppBar)<{ isAtTop: boolean }>(({ isAtTop, theme }) => ({
  background: isAtTop ? 'none' : theme.palette.common.white,
  color: isAtTop ? theme.palette.common.white : theme.palette.text.primary,
  boxShadow: isAtTop ? 'none' : theme.shadows[4],
  transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
}))

export const MenuBar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent',
}))
