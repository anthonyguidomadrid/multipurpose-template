import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

export const StyledSocialMediaButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    color: theme.palette.primary.main,
  },
})) as typeof IconButton
