import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import styled from '@mui/material/styles/styled'

export const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  color: theme.palette.common.white,
}))

export const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  color: theme.palette.common.white,
  a: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
