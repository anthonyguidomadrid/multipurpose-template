import Grid2 from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";

export const ContentWrapper = styled(Grid2)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(8),
  },
}))
