import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <TextField
        label="Name"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={typeof errors.name?.message === 'string' ? errors.name.message : undefined}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
}
