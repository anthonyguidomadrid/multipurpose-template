import { Grid2, styled } from '@mui/material'

export const DetailsWrapper = styled(Grid2)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3, 0),
})) as typeof Grid2
