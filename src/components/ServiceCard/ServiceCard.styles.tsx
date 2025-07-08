import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import styled from "@mui/material/styles/styled"

export const StyledServiceCard = styled(Card)(() => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 0,
  '&:hover .hover-content': {
    height: '100%',
    cursor: 'pointer',
  },
}))

export const ServiceCardContent = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '30%',
  backgroundColor: theme.palette.background.paper,
  opacity: 0.8,
  transition: 'all 0.4s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  gap: theme.spacing(0.5),
  color: theme.palette.common.white,
}))
