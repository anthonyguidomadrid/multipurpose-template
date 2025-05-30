import { IconButton } from '@mui/material'

interface SocialMediaButtonProps {
  icon: React.ReactNode
  url: string
}

export const SocialMediaButton = ({ icon, url }: SocialMediaButtonProps) => {
  return (
    <IconButton
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ color: 'inherit', '&:hover': { color: 'primary.main' } }}
    >
      {icon}
    </IconButton>
  )
}
