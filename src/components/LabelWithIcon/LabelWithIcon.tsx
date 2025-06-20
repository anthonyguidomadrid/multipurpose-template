import { Stack } from '@mui/material'

interface LabelWithIconProps {
  label: React.ReactNode
  icon: React.ReactNode
}

export const LabelWithIcon: React.FC<LabelWithIconProps> = ({ label, icon }) => {
  return (
    <Stack direction="row" spacing={2}>
      {icon}
      {label}
    </Stack>
  )
}
