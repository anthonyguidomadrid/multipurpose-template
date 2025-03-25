import { CssBaseline } from '@mui/material'
import ThemeProviderWrapper from '@/components/ThemeProvider/ThemeProviderWrapper'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  )
}
