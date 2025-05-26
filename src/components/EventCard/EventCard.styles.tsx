import { Box, Card, CardActions, styled } from '@mui/material'

export const EventCardWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  marginBottom: theme.spacing(6),
}))

export const EventRibbon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 1),
  fontSize: '0.75rem',
  fontWeight: 'bold',
  zIndex: 1,
  textTransform: 'capitalize',
}))

export const StyledEventCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}))

export const EventButtonWrapper = styled(CardActions)(() => ({ justifyContent: 'center' }))
