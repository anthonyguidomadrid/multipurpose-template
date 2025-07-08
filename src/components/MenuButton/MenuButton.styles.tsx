import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";

export const MenuItemButton = styled(Button)<{ isCta: boolean }>(({ theme, isCta }) => ({
  '&:hover': {
    ...(!isCta && { color: theme.palette.primary.main }),
  },
}))
