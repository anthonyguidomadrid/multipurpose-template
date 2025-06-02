import { EMAIL_REGEX } from '@/constants/regex'
import { sendEmail } from '@/lib/emailjs'
import { TextField, Button, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ContactFormProps {
  email: string
}

type FormValues = {
  name: string
  email: string
  message: string
}

export default function ContactForm({ email }: ContactFormProps) {
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
    <Box
      component="form"
      sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label={t('field.name')}
        variant="outlined"
        size="small"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name', { required: t('field.required', { field: t('field.name') }) })}
      />
      <TextField
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
      />
      <TextField
        label={t('field.message')}
        variant="outlined"
        size="small"
        fullWidth
        multiline
        minRows={3}
        error={!!errors.message}
        helperText={errors.message?.message}
        {...register('message', { required: t('field.required', { field: t('field.message') }) })}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting || hasAnyErrors}
      >
        {t('button.send')}
      </Button>
      {(emailSuccess || emailError) && (
        <Box color={`${emailSuccess ? 'success' : 'error'}.main`}>
          {t(`notification.${emailSuccess ? 'successSent' : 'errorSent'}`)}
        </Box>
      )}
    </Box>
  )
}
