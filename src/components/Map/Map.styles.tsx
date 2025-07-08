import CircularProgress from "@mui/material/CircularProgress"
import styled from "@mui/material/styles/styled"

export const Spinner = styled(CircularProgress)(() => ({
  margin: 'auto',
  display: 'block',
}))

export const CONTAINER_STYLE = { width: '100%', height: '300px' }
