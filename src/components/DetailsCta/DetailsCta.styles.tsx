import { Box, Link, styled } from '@mui/material'

export const CtaWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

export const StackWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

export const StackLink = styled(Link)(() => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))
