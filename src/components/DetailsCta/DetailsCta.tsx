import { Box, Link, Stack, Typography } from '@mui/material'
import { Cta } from '@/lib/types'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { getEmailLink, getPhoneLink } from '@/helpers/link'

export const DetailsCta: React.FC<Cta> = ({ title, description, phone, email }) => {
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      <Typography>{description}</Typography>
      <Stack direction="row" spacing={2}>
        <PhoneIcon />
        <Link href={getPhoneLink(phone)}>{phone}</Link>
      </Stack>
      <Stack direction="row" spacing={2}>
        <EmailIcon />
        <Link href={getEmailLink(email)}>{email}</Link>
      </Stack>
    </Box>
  )
}
