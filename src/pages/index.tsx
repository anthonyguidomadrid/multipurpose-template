import { HomeHeader } from '@/components/HomeHeader/HomeHeader'
import { getHomePage, getName } from '@/lib/contentful'
import { Container, Typography, Button, Box } from '@mui/material'
import { GetServerSideProps } from 'next'
import { HomePage as ContentfulHomePage } from '@/lib/types'
import { About } from '@/components/About/About'

interface HomePage {
  name: string
  home: ContentfulHomePage
}

export default function Home({
  name,
  home: {
    header: { fields: homeHeader },
    about: { fields: about },
  },
}: HomePage) {
  return (
    <>
      <HomeHeader {...homeHeader} />
      <About {...about} />
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h1" color="primary">
          Hello {name}!
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
          Secondary Color Background
        </Button>

        {/* Centered paragraph with primary text color */}
        <Typography variant="body1" sx={{ mt: 4 }}>
          This is a centered paragraph with the primary text color. Lorem Ipsum is simply dummy text
          of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy
          text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </Typography>

        {/* Text with primary color and default background */}
        <Box
          sx={{
            bgcolor: 'background.default',
            p: 2,
            mt: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="body1">
            This text has the body color and the neutral background color.
          </Typography>
        </Box>

        {/* Text with secondary color and paper background */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            color: 'text.secondary',
            p: 2,
            mt: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body1">This text has the accent background color.</Typography>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const name = await getName()
  const home = await getHomePage()

  return {
    props: {
      name,
      home,
    },
  }
}
