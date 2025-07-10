export const getEmailLink = (email: string) => `mailto:${email}`

export const getPhoneLink = (phone: string) => `tel:${phone.replaceAll(' ', '')}`
