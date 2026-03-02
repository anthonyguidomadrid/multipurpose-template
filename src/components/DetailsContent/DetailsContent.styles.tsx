import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const ContentWrapper = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(8),
  },
}))
