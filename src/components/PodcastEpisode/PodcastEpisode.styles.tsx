import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

export const EpisodeWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}))

export const EpisodeHeader = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

export const EpisodeImage = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}))

export const EpisodeDate = styled(Typography)(() => ({
  textTransform: 'capitalize',
}))

export const EpisodeDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

export const AudioPlayerWrapper = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
}))

export const AudioPlayerButtonWrapper = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
}))
