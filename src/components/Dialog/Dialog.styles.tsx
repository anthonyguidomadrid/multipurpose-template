import {
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  styled,
} from '@mui/material'

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
