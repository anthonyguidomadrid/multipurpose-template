import Stack from "@mui/material/Stack"

interface LabelWithIconProps {
  label: React.ReactNode
  icon: React.ReactNode
  name: string
}

export const LabelWithIcon: React.FC<LabelWithIconProps> = ({ label, icon, name }) => {
  return (
    <Stack direction="row" spacing={2} data-testid={`${name}-label-with-icon`}>
      {icon}
      {label}
    </Stack>
  )
}
