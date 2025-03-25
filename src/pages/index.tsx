import ContactForm from '@/components/ContactForm/ContactForm'
import client from '@/lib/contentful'
import { Container, Typography, Button } from '@mui/material'

export async function getServerSideProps() {
  const response = await client.getEntries({
    content_type: 'test',
  })
  const name = response.items[0].fields.name as string

  return {
    props: { name },
  }
}

export default function Home({ name }: { name: string }) {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h1" color="primary">
        Hello {name}!
      </Typography>
      <Button variant="contained" color="secondary">
        Get Started
      </Button>
      <ContactForm />
    </Container>
  )
}
