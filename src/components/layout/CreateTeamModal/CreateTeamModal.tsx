import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog'
import InputForm from '../../ui/AuthForm/components/InputForm'
import { CREATE_TEAM } from '../../../graphql/mutations/team'
import { Me } from '../../../graphql/queries/trainer'

const createTeamSchema = z.object({
  name: z.string().min(3).max(30)
})

type CreateTeamSchema = z.infer<typeof createTeamSchema>

interface Props {
  open: boolean
  onClose: () => void
}

export default function CreateTeamModal({ open, onClose }: Props) {
  const [createTeam] = useMutation(CREATE_TEAM, {
    refetchQueries: [{ query: Me }],
    awaitRefetchQueries: true
  })

  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateTeamSchema>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: { name: '' }
  })

  const onSubmit = async (data: CreateTeamSchema) => {
    try {
      await createTeam({ variables: { name: data.name } })
      reset()
      onClose()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear equipo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            name="name"
            control={control}
            label="Nombre del equipo"
            type="text"
            error={errors.name}
          />
          <button type="submit">Crear</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}