import { EMAIL_REGEX } from '@/constants/regex'
import { sendEmail } from '@/lib/emailjs'
import {
  Button,
  Alert,
  Typography,
  FormHelperText,
  FormControlLabel,
  Link,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ContactFormWrapper, PrivacyCheckbox, StyledTextField } from './ContactForm.styles'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Dialog } from '../Dialog/Dialog'

interface ContactFormProps {
  email: string
  privacyPolicy: Document
}

type FormValues = {
  name: string
  email: string
  message: string
}

export const ContactForm = ({ email, privacyPolicy }: ContactFormProps) => {
  const { t } = useTranslation()
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues & { consent: boolean }>()

  const hasAnyErrors = Object.keys(errors).length > 0
  const successText = emailSuccess ? 'success' : 'error'

  const onSubmit = async (data: FormValues & { consent: boolean }) => {
    setEmailError(false)
    setEmailSuccess(false)

    const { isSuccess } = await sendEmail({
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: email,
    })
    if (isSuccess) {
      setEmailSuccess(true)
    } else {
      setEmailError(true)
    }
    reset()
  }

  const handlePrivacyClose = () => setPrivacyOpen(false)

  return (
    <>
      <ContactFormWrapper component="form" onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label={t('field.name')}
          variant="outlined"
          size="small"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register('name', { required: t('field.required', { field: t('field.name') }) })}
          data-testid="footer-contact-name"
        />
        <StyledTextField
          label={t('field.email')}
          variant="outlined"
          size="small"
          fullWidth
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: t('field.required', { field: t('field.email') }),
            pattern: {
              value: EMAIL_REGEX,
              message: t('field.invalid', { field: t('field.email') }),
            },
          })}
          data-testid="footer-contact-email"
        />
        <StyledTextField
          label={t('field.message')}
          variant="outlined"
          size="small"
          fullWidth
          multiline
          minRows={3}
          error={!!errors.message}
          helperText={errors.message?.message}
          {...register('message', { required: t('field.required', { field: t('field.message') }) })}
          data-testid="footer-contact-message"
        />

        <FormControlLabel
          control={
            <PrivacyCheckbox
              {...register('consent', {
                required: t('field.required', {
                  field: t('field.privacyConsent'),
                }),
              })}
              color="primary"
              data-testid="footer-contact-privacy"
            />
          }
          label={
            <Typography>
              {t('field.privacyPolicy')}
              <Link
                onClick={(e) => {
                  e.preventDefault()
                  setPrivacyOpen(true)
                }}
                data-testid="footer-contact-privacy-link"
              >
                {t('field.privacyPolicyLink')}
              </Link>
              .
            </Typography>
          }
        />
        {errors.consent && (
          <FormHelperText error data-testid="footer-contact-privacy-error">
            {errors.consent.message as string}
          </FormHelperText>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting || hasAnyErrors}
          data-testid="footer-contact-send"
        >
          {t('button.send')}
        </Button>
        {!hasAnyErrors && (emailSuccess || emailError) && (
          <Alert severity={successText} data-testid={`footer-contact-${successText}`}>
            {t(`notification.email.${successText}`)}
          </Alert>
        )}
      </ContactFormWrapper>

      <Dialog open={privacyOpen} onClose={handlePrivacyClose} title={t('title.privacyPolicy')}>
        {documentToReactComponents(privacyPolicy)}
      </Dialog>
    </>
  )
}
