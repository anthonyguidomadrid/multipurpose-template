import { Stack, Typography } from '@mui/material'
import { Cta } from '@/lib/types'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { getEmailLink, getPhoneLink } from '@/helpers/link'
import { CtaWrapper, StackLink, StackWrapper } from './DetailsCta.styles'

export const DetailsCta: React.FC<Cta> = ({ title, description, phone, email }) => {
  return (
    <CtaWrapper>
      <Typography variant="h5">{title}</Typography>
      <Typography>{description}</Typography>
      <StackWrapper>
        <Stack direction="row" spacing={2}>
          <PhoneIcon />
          <StackLink href={getPhoneLink(phone)}>{phone}</StackLink>
        </Stack>
        <Stack direction="row" spacing={2}>
          <EmailIcon />
          <StackLink href={getEmailLink(email)}>{email}</StackLink>
        </Stack>
      </StackWrapper>
    </CtaWrapper>
  )
}
