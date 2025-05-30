import { TextField, Button, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

export default function ContactForm() {
  const { t } = useTranslation()
  return (
    <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Your Name" variant="outlined" size="small" fullWidth />
      <TextField label="Your Email" variant="outlined" size="small" fullWidth />
      <TextField label="Message" variant="outlined" size="small" fullWidth multiline minRows={3} />
      <Button variant="contained" color="primary">
        {t('button.send')}
      </Button>
    </Box>
  )
}
