import { Box, styled } from '@mui/material'
import Image from 'next/image'

export const MenuLogoWrapper = styled(Box)(() => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
})) as typeof Box

export const MenuLogoImage = styled(Image)(() => ({
  height: 'auto',
  maxHeight: 50,
  objectFit: 'contain',
  width: 'auto',
}))
