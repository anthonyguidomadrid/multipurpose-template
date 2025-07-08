import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

export const MobileMenuIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  marginLeft: 'auto',
}))
