import { getDate } from '@/helpers/date'
import { SpotifyEpisode } from '@/lib/spotify'
import { Button, Collapse, Grid2, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useTranslation } from 'next-i18next'
import {
  AudioPlayerButtonWrapper,
  AudioPlayerWrapper,
  EpisodeDate,
  EpisodeDescription,
  EpisodeHeader,
  EpisodeImage,
  EpisodeWrapper,
} from './PodcastEpisode.styles'

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
    <EpisodeWrapper data-testid="podcast-episode">
      <EpisodeHeader container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 4, sm: 2, md: 1 }}>
          <EpisodeImage
            src={url}
            height={height}
            width={width}
            alt={`Image for podcast ${name}`}
            data-testid="podcast-image"
            loading="lazy"
          />
        </Grid2>
        <Grid2 size={{ xs: 8, sm: 10, md: 11 }}>
          <Typography variant="h6" data-testid="podcast-name">
            {name}
          </Typography>
          <EpisodeDate variant="body2" color="text.secondary" data-testid="podcast-date">
            {formattedDate}
          </EpisodeDate>
        </Grid2>
      </EpisodeHeader>
      <Collapse in={isExpanded} collapsedSize={50}>
        <EpisodeDescription data-testid="podcast-description">{description}</EpisodeDescription>
      </Collapse>
      <Button onClick={toggleDescription} data-testid="podcast-see-more-button">
        {isExpanded ? t('button.seeLess') : t('button.seeMore')}
      </Button>
      <AudioPlayerWrapper container spacing={2} alignItems="center" data-testid="podcast-player">
        <Grid2 size={{ xs: 12, md: 9 }}>
          <AudioPlayer
            src={audio_preview_url}
            showJumpControls={false}
            customAdditionalControls={[]}
            layout="horizontal"
            autoPlayAfterSrcChange={false}
            style={{ background: 'transparent', boxShadow: 'none' }}
          />
        </Grid2>
        <AudioPlayerButtonWrapper size={{ xs: 12, md: 3 }}>
          <Link href={spotify} target="_blank" rel="noopener noreferrer">
            <Button variant="outlined" data-testid="podcast-link-button">
              {t('button.fullEpisode')}
            </Button>
          </Link>
        </AudioPlayerButtonWrapper>
      </AudioPlayerWrapper>
    </EpisodeWrapper>
  )
}
