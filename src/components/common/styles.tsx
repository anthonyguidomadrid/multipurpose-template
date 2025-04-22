import { Grid2, styled } from '@mui/material'

export const SectionWrapper = styled(Grid2)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
  padding: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(8, 2),
  },
}))
