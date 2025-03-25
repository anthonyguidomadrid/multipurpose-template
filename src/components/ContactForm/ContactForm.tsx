import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
