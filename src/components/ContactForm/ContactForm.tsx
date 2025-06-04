import { EMAIL_REGEX } from '@/constants/regex'
import { sendEmail } from '@/lib/emailjs'
import { Button, Alert } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ContactFormWrapper, StyledTextField } from './ContactForm.styles'

interface ContactFormProps {
  email: string
}

type FormValues = {
  name: string
  email: string
  message: string
}

export const ContactForm = ({ email }: ContactFormProps) => {
  const { t } = useTranslation()
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>()

  const hasAnyErrors = Object.keys(errors).length > 0
  const successText = emailSuccess ? 'success' : 'error'

  const onSubmit = async (data: FormValues) => {
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

  return (
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
  )
}
