import { Grid2, styled } from '@mui/material'

export const ContentWrapper = styled(Grid2)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(8),
  },
}))
