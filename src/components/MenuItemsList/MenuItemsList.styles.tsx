import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

export const MenuItemsWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: 2,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))
