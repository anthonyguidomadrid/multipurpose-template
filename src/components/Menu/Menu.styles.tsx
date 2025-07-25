import AppBar from "@mui/material/AppBar"
import styled from "@mui/material/styles/styled"
import Toolbar from "@mui/material/Toolbar"

export const StyledMenu = styled(AppBar)<{ isAtTop: boolean }>(({ isAtTop, theme }) => ({
  background: isAtTop ? 'none' : theme.palette.common.white,
  color: isAtTop ? theme.palette.common.white : theme.palette.text.primary,
  boxShadow: isAtTop ? 'none' : theme.shadows[4],
  transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
  zIndex: 900,
}))

export const MenuBar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent',
}))

export const ModalContent = styled('iframe')(({theme}) => ({
  width: '100%',
  height: '80vh',
  border: 0,
  backgroundColor: theme.palette.common.white,
}))
