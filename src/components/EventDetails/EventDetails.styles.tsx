import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

export const DetailsWrapper = styled(Grid)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3, 0),
})) as typeof Grid
