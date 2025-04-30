import { Grid2, styled, Typography } from '@mui/material'

export const TestimonialContainer = styled(Grid2)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingRight: theme.spacing(8),
  },
}))

export const TestimonialQuote = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  borderLeft: `4px solid ${theme.palette.background.default}}`,
  paddingLeft: theme.spacing(2),
  margin: theme.spacing(2, 0),
  fontSize: '1rem',
}))
