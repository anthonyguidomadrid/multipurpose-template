import { Contact } from '@/lib/types'
import { Box, Grid2, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SocialMediaButton } from '../SocialMediaButton/SocialMediaButton'
import { ContactForm } from '../ContactForm/ContactForm'
import { GalleryLightbox } from '../Lightbox/Lightbox'
import {
  ContactInfoWrapper,
  CopywrightWrapper,
  FooterLink,
  FooterTitle,
  FooterWrapper,
  ImageGrid,
} from './Footer.styles'

interface FooterProps extends Contact {
  websiteName: string
}

export const Footer: React.FC<FooterProps> = ({
  email,
  phone,
  facebookUrl,
  instagramUrl,
  linkedInUrl,
  twitterUrl,
  galleryImages,
  websiteName,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const images = galleryImages.map((img) => img.fields.file.url)

  const { t } = useTranslation()

  const socialMediaArray = useMemo(() => {
    return [
      { url: facebookUrl, icon: <FacebookIcon /> },
      { url: instagramUrl, icon: <InstagramIcon /> },
      { url: linkedInUrl, icon: <LinkedInIcon /> },
      { url: twitterUrl, icon: <TwitterIcon /> },
    ]
  }, [facebookUrl, instagramUrl, linkedInUrl, twitterUrl])

  return (
    <>
      <FooterWrapper component="footer" elevation={0}>
        <Grid2 container spacing={4}>
          {/* Column 1: Contact Info */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FooterTitle variant="h6" gutterBottom data-testid="footer-contact-title">
              {t('title.contactUs')}
            </FooterTitle>
            <ContactInfoWrapper container spacing={2}>
              <Grid2 size={12}>
                <Typography variant="subtitle2" data-testid="footer-phone-label">
                  {t('title.phone')}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">
                    <FooterLink
                      href={`tel:${phone.replaceAll(' ', '')}`}
                      data-testid="footer-phone-link"
                    >
                      {phone}
                    </FooterLink>
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 size={12}>
                <Typography variant="subtitle2" data-testid="footer-email-label">
                  {t('title.email')}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2">
                    <FooterLink href={`mailto:${email}`} data-testid="footer-email-link">
                      {email}
                    </FooterLink>
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 size={12}>
                {socialMediaArray.map(
                  (social, index) =>
                    social.url && (
                      <SocialMediaButton key={index} url={social.url} icon={social.icon} />
                    )
                )}
              </Grid2>
            </ContactInfoWrapper>
          </Grid2>

          {/* Column 2: Contact Form */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FooterTitle variant="h6" gutterBottom data-testid="footer-form-title">
              {t('title.sendMessage')}
            </FooterTitle>
            <ContactForm email={email} />
          </Grid2>

          {/* Column 3: Gallery Grid */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FooterTitle variant="h6" gutterBottom data-testid="footer-gallery-title">
              {t('title.gallery')}
            </FooterTitle>
            <Grid2 container spacing={2}>
              {galleryImages.slice(0, 6).map(({ fields }, idx) => (
                <Grid2 size={4} key={fields.file.fileName}>
                  <ImageGrid
                    src={`https:${fields.file.url}`}
                    alt={fields.title}
                    width={fields.file.details.image.width}
                    height={fields.file.details.image.height}
                    onClick={() => {
                      setPhotoIndex(idx)
                      setLightboxOpen(true)
                    }}
                    data-testid={`footer-gallery-image-${idx}`}
                  />
                </Grid2>
              ))}
            </Grid2>
            {lightboxOpen && (
              <GalleryLightbox
                images={images}
                setLightboxOpen={setLightboxOpen}
                galleryImages={galleryImages}
                photoIndex={photoIndex}
                setPhotoIndex={setPhotoIndex}
              />
            )}
          </Grid2>
        </Grid2>
      </FooterWrapper>
      {/* Footer copyright */}
      <CopywrightWrapper>
        <Typography variant="body2" data-testid="footer-copyright">
          {t('footer.copyright', { websiteName, year: new Date().getFullYear() })}
          <FooterLink
            href="https://www.anthonyguido.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.developer')}
          </FooterLink>
        </Typography>
      </CopywrightWrapper>
    </>
  )
}
