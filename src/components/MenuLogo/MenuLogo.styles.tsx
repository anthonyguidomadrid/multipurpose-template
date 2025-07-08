import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'
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
