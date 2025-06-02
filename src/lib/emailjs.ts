import emailjs from 'emailjs-com'

type EmailJSPayload = {
  from_name: string
  from_email: string
  message: string
  to_email: string
}

type EmailJSResponse = {
  isSuccess: boolean
}

export const sendEmail = async (data: EmailJSPayload): Promise<EmailJSResponse> => {
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
  if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
    console.error('EmailJS configuration is missing')
    return { isSuccess: false }
  }
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        ...data,
      },
      USER_ID
    )
    return { isSuccess: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { isSuccess: false }
  }
}
