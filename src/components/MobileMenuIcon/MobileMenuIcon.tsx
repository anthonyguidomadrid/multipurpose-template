import MenuIcon from '@mui/icons-material/Menu'
import { MobileMenuIconWrapper } from './MobileMenuIcon.styles'
import IconButton from '@mui/material/IconButton'

interface MobileMenuIconProps {
  handleDrawerToggle: () => void
}

export const MobileMenuIcon: React.FC<MobileMenuIconProps> = ({ handleDrawerToggle }) => {
  return (
    <MobileMenuIconWrapper data-testid="mobile-menu-icon">
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
