import { getDate } from '@/helpers/date'
import { SpotifyEpisode } from '@/lib/spotify'
import { Box, Button, Collapse, Grid2, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useTranslation } from 'next-i18next'

export const PodcastEpisode: React.FC<SpotifyEpisode> = ({
  name,
  description,
  audio_preview_url,
  external_urls: { spotify },
  images,
  release_date,
}) => {
  const { locale } = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()

  const formattedDate = getDate(new Date(release_date), 'dd MMMM yyyy', locale)
  const { url, height, width } = images[1] // Use the second image size (640x640) for adapted quality

  const toggleDescription = () => setIsExpanded((prev) => !prev)

  return (
    <Box style={{ padding: '2rem', backgroundColor: '#f9f9f9', marginBottom: '2rem' }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={1}>
          <Image
            src={url}
            height={height}
            width={width}
            alt={`Image for podcast ${name}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid2>
        <Grid2 size={11}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {formattedDate}
          </Typography>
        </Grid2>
      </Grid2>
      <Collapse in={isExpanded} collapsedSize={50}>
        <Typography sx={{ marginBottom: '1rem' }}>{description}</Typography>
      </Collapse>
      <Button variant="text" onClick={toggleDescription}>
        {isExpanded ? t('podcast.button.seeLess') : t('podcast.button.seeMore')}
      </Button>
      <Grid2 sx={{ marginTop: '1rem' }} container spacing={2} alignItems="center">
        <Grid2 size={9}>
          <AudioPlayer
            src={audio_preview_url}
            showJumpControls={false}
            customAdditionalControls={[]}
            layout="horizontal"
            autoPlayAfterSrcChange={false}
            style={{ background: 'transparent', boxShadow: 'none' }}
          />
        </Grid2>
        <Grid2 size={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href={spotify} target="_blank" rel="noopener noreferrer">
            <Button variant="outlined">{t('podcast.button.fullEpisode')}</Button>
          </Link>
        </Grid2>
      </Grid2>
    </Box>
  )
}
