import { Cta } from '@/lib/types'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { getEmailLink, getPhoneLink } from '@/helpers/link'
import { CtaWrapper, StackLink, StackWrapper } from './DetailsCta.styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface DetailsCtaProps extends Cta {
  sectionName: string
}

export const DetailsCta: React.FC<DetailsCtaProps> = ({
  title,
  description,
  phone,
  email,
  sectionName,
}) => {
  return (
    <CtaWrapper>
      <Typography variant="h5" data-testid={`${sectionName}-cta-title`}>
        {title}
      </Typography>
      <Typography data-testid={`${sectionName}-cta-description`}>{description}</Typography>
      <StackWrapper>
        <Stack direction="row" spacing={2}>
          <PhoneIcon />
          <StackLink href={getPhoneLink(phone)} data-testid={`${sectionName}-cta-phone-link`}>
            {phone}
          </StackLink>
        </Stack>
        <Stack direction="row" spacing={2}>
          <EmailIcon />
          <StackLink href={getEmailLink(email)} data-testid={`${sectionName}-cta-email-link`}>
            {email}
          </StackLink>
        </Stack>
      </StackWrapper>
    </CtaWrapper>
  )
}
