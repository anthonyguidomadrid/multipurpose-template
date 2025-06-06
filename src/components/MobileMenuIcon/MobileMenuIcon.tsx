import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface MobileMenuIconProps {
  handleDrawerToggle: () => void
}

export const MobileMenuIcon: React.FC<MobileMenuIconProps> = ({ handleDrawerToggle }) => {
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}
