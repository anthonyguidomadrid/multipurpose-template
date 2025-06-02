import { Contact } from '@/lib/types'
import { Box, Grid2, Paper, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SocialMediaButton } from '../SocialMediaButton/SocialMediaButton'
import ContactForm from '../ContactForm/ContactForm'
import { GalleryLightbox } from '../Lightbox/Lightbox'
import Link from 'next/link'

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
      <Paper
        sx={{ mt: 8, py: 6, px: { xs: 2, md: 6 }, background: '#f5f5f5' }}
        component="footer"
        elevation={0}
      >
        <Grid2 container spacing={4}>
          {/* Column 1: Contact Info */}
          <Grid2 size={4}>
            <Typography variant="h6" gutterBottom>
              {t('title.contactUs')}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              {t('title.phone')}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                <a
                  href={`tel:${phone.replaceAll(' ', '')}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {phone}
                </a>
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              {t('title.email')}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                <a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {email}
                </a>
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              {socialMediaArray.map(
                (social, index) =>
                  social.url && (
                    <SocialMediaButton key={index} url={social.url} icon={social.icon} />
                  )
              )}
            </Box>
          </Grid2>

          {/* Column 2: Contact Form */}
          <Grid2 size={4}>
            <Typography variant="h6" gutterBottom>
              {t('title.sendMessage')}
            </Typography>
            <ContactForm email={email} />
          </Grid2>

          {/* Column 3: Gallery Grid */}
          <Grid2 size={4}>
            <Typography variant="h6" gutterBottom>
              {t('title.gallery')}
            </Typography>
            <Grid2 container spacing={1} sx={{ mt: 2 }}>
              {galleryImages.slice(0, 6).map((img, idx) => (
                <Grid2 size={4} key={img.fields.file.fileName}>
                  <Box
                    component="img"
                    src={img.fields.file.url}
                    alt={img.fields.title}
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setPhotoIndex(idx)
                      setLightboxOpen(true)
                    }}
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
      </Paper>
      {/* Footer copyright */}
      <Box sx={{ textAlign: 'center', py: 2, background: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} {websiteName} by{' '}
          <Link
            href="https://anthonyguido.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            Anthony Guido Developer
          </Link>
        </Typography>
      </Box>
    </>
  )
}
