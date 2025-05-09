import { Box, Grid2, styled, Typography } from '@mui/material'
import Image from 'next/image'

export const EpisodeWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(2),
}))

export const EpisodeHeader = styled(Grid2)(({ theme }) => ({
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

export const AudioPlayerWrapper = styled(Grid2)(({ theme }) => ({
  marginTop: theme.spacing(1),
}))

export const AudioPlayerButtonWrapper = styled(Grid2)(() => ({
  display: 'flex',
  justifyContent: 'center',
}))
