import styled from '@mui/material/styles/styled'
import Image from 'next/image'

export const GalleryImage = styled(Image)(() => ({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  cursor: 'pointer',
}))
