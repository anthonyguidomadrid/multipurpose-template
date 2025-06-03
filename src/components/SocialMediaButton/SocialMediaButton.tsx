import { StyledSocialMediaButton } from './SocialMediaButton.styles'

interface SocialMediaButtonProps {
  icon: React.ReactNode
  url: string
}

export const SocialMediaButton = ({ icon, url }: SocialMediaButtonProps) => {
  return (
    <StyledSocialMediaButton component="a" href={url} target="_blank" rel="noopener noreferrer">
      {icon}
    </StyledSocialMediaButton>
  )
}
