import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'
import { ContentSection } from '../ContentSection/ContentSection'

export const AllPodcastsButtonWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
}))

export const PodcastSection = styled(ContentSection)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))
