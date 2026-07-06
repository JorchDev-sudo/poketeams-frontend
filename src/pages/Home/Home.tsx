import { useQuery } from '@apollo/client/react'
import { Me } from '@/graphql/queries/trainer'
import { useState } from 'react'
import CreateTeamModal from '@/pages/Home/components/CreateTeamModal/CreateTeamModal'

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const { data, loading, error } = useQuery(Me)

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data?.me) return null

  const { me } = data
  console.log('me.team:', me.team)

  return (
    <div>
      <h1>Bienvenido, {me.name}</h1>
      {me.team
        ? (
          <div>
            <h2>{me.team.name}</h2>
          </div>
        )
        : (
          <div>
            <p>Todavía no tenés un equipo. ¡Creá uno!</p>
            <button onClick={() => setIsOpen(true)}>Crear equipo</button>
          </div>
        )
      }

      <CreateTeamModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}