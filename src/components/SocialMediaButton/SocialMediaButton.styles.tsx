import { styled, IconButton } from '@mui/material'

export const StyledSocialMediaButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    color: theme.palette.primary.main,
  },
})) as typeof IconButton
