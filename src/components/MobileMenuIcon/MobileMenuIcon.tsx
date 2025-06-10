import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { MobileMenuIconWrapper } from './MobileMenuIcon.styles'

interface MobileMenuIconProps {
  handleDrawerToggle: () => void
}

export const MobileMenuIcon: React.FC<MobileMenuIconProps> = ({ handleDrawerToggle }) => {
  return (
    <MobileMenuIconWrapper data-testid="mobileMenuIcon">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
    </MobileMenuIconWrapper>
  )
}
