import { Box, Checkbox, styled, TextField } from '@mui/material'

export const ContactFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
})) as typeof Box

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.common.white,
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.common.white,
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.common.white,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.common.white,
    },
  },
}))

export const PrivacyCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.common.white,
  '&.Mui-checked': {
    color: theme.palette.common.white,
  },
}))
