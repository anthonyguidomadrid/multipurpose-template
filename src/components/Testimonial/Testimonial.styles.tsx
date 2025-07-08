import Grid2 from '@mui/material/Grid2'
import styled from '@mui/material/styles/styled'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

export const TestimonialContainer = styled(Grid2)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingRight: theme.spacing(8),
  },
}))

export const TestimonialImage = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}))

export const TestimonialQuote = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  borderLeft: `4px solid ${theme.palette.background.paper}`,
  fontSize: '1rem',
  padding: theme.spacing(2),
})) as typeof Typography

export const Author = styled(Typography)(() => ({
  textAlign: 'right',
  textTransform: 'capitalize',
}))

export const TestimonialImageWrapper = styled(Grid2)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}))
