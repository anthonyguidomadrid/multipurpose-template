import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import styled from '@mui/material/styles/styled'

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

export const EventContent = styled(CardContent)(() => ({
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))
