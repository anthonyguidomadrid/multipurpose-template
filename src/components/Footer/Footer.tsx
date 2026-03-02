import { Contact } from '@/lib/types'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import YouTubeIcon from '@mui/icons-material/YouTube'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationPinIcon from '@mui/icons-material/LocationPin'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SocialMediaButton } from '../SocialMediaButton/SocialMediaButton'
import { ContactForm } from '../ContactForm/ContactForm'
import { GalleryLightbox } from '../Lightbox/Lightbox'
import {
  ContactInfoWrapper,
  ContactWrapper,
  CopywrightWrapper,
  FooterLink,
  FooterTitle,
  FooterWrapper,
  ImageGrid,
} from './Footer.styles'
import { getEmailLink, getPhoneLink } from '@/helpers/link'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { getImageDetails } from '@/helpers/image'

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
  spotifyUrl,
  youtubeUrl,
  whatsappUrl,
  vakiUrl,
  galleryImages,
  websiteName,
  privacyPolicy,
  address,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const { t } = useTranslation()

  const socialMediaArray = useMemo(() => {
    return [
      { url: facebookUrl, icon: <FacebookIcon /> },
      { url: instagramUrl, icon: <InstagramIcon /> },
      { url: linkedInUrl, icon: <LinkedInIcon /> },
      { url: twitterUrl, icon: <TwitterIcon /> },
      { url: spotifyUrl, icon: <PodcastsIcon /> },
      { url: youtubeUrl, icon: <YouTubeIcon /> },
      { url: whatsappUrl, icon: <WhatsAppIcon /> },
      { url: vakiUrl, icon: <VolunteerActivismIcon /> },
    ]
  }, [
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    spotifyUrl,
    twitterUrl,
    vakiUrl,
    whatsappUrl,
    youtubeUrl,
  ])

  return (
    <>
      <FooterWrapper component="footer" elevation={0}>
        <Grid container spacing={4}>
          {/* Column 1: Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterTitle variant="h6" gutterBottom data-testid="footer-contact-title">
              {t('title.contactUs')}
            </FooterTitle>
            <ContactInfoWrapper container spacing={2}>
              <Grid size={12}>
                <Typography variant="subtitle2" data-testid="footer-phone-label">
                  {t('title.phone')}
                </Typography>
                <ContactWrapper>
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">
                    <FooterLink href={getPhoneLink(phone)} data-testid="footer-phone-link">
                      {phone}
                    </FooterLink>
                  </Typography>
                </ContactWrapper>
              </Grid>
              <Grid size={12}>
                <Typography variant="subtitle2" data-testid="footer-email-label">
                  {t('title.email')}
                </Typography>
                <ContactWrapper>
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2">
                    <FooterLink href={getEmailLink(email)} data-testid="footer-email-link">
                      {email}
                    </FooterLink>
                  </Typography>
                </ContactWrapper>
              </Grid>
              {address && (
                <Grid size={12}>
                  <Typography variant="subtitle2" data-testid="footer-address-label">
                    {t('title.address')}
                  </Typography>
                  <ContactWrapper>
                    <LocationPinIcon fontSize="small" />
                    <Box data-testid="footer-address-details">
                      <Typography variant="body2">{address.fields.streetAddress}</Typography>
                      <Typography variant="body2">
                        {address.fields.postalCode} {address.fields.city}, {address.fields.region}
                      </Typography>
                      <Typography variant="body2">{address.fields.country}</Typography>
                    </Box>
                  </ContactWrapper>
                </Grid>
              )}
              <Grid size={12}>
                {socialMediaArray.map(
                  (social, index) =>
                    social.url && (
                      <SocialMediaButton key={index} url={social.url} icon={social.icon} />
                    )
                )}
              </Grid>
            </ContactInfoWrapper>
          </Grid>

          {/* Column 2: Contact Form */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterTitle variant="h6" gutterBottom data-testid="footer-form-title">
              {t('title.sendMessage')}
            </FooterTitle>
            <ContactForm email={email} privacyPolicy={privacyPolicy} />
          </Grid>

          {/* Column 3: Gallery Grid */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterTitle variant="h6" gutterBottom data-testid="footer-gallery-title">
              {t('title.gallery')}
            </FooterTitle>
            <Grid container spacing={2}>
              {galleryImages.slice(0, 6).map((image, idx) => {
                const { imageUrl, imageDescription, imageWidth, imageHeight } =
                  getImageDetails(image)
                return (
                  <Grid size={4} key={image.fields.file.fileName}>
                    <ImageGrid
                      src={imageUrl}
                      alt={imageDescription}
                      width={imageWidth}
                      height={imageHeight}
                      onClick={() => {
                        setPhotoIndex(idx)
                        setLightboxOpen(true)
                      }}
                      data-testid={`footer-gallery-image-${idx}`}
                    />
                  </Grid>
                )
              })}
            </Grid>
            {lightboxOpen && (
              <GalleryLightbox
                setLightboxOpen={setLightboxOpen}
                galleryImages={galleryImages}
                photoIndex={photoIndex}
                setPhotoIndex={setPhotoIndex}
              />
            )}
          </Grid>
        </Grid>
      </FooterWrapper>
      {/* Footer copyright */}
      <CopywrightWrapper>
        <Typography variant="caption" data-testid="footer-copyright">
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
