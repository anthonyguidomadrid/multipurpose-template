import ContactForm from '@/components/ContactForm/ContactForm'
import { getName, getSettings } from '@/lib/contentful'
import { Container, Typography, Button } from '@mui/material'
import { GetServerSideProps } from 'next'

export default function Home({ name }: { name: string }) {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h1" color="primary">
        Hello {name}!
      </Typography>
      <Button variant="contained" color="secondary">
        Get Started
      </Button>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const name = await getName()
  const settings = await getSettings()

  return {
    props: {
      name,
      settings,
    },
  }
}
