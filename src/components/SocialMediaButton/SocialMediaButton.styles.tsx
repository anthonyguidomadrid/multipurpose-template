import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

export const StyledSocialMediaButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    color: theme.palette.primary.main,
  },
})) as typeof IconButton
