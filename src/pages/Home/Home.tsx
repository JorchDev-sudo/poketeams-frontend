import { useQuery } from '@apollo/client/react'
import { Me } from '@/graphql/queries/trainer'
import { useState } from 'react'
import CreateTeamModal from '@/pages/Home/components/CreateTeamModal/CreateTeamModal'
import TeamCard from '@/pages/Home/components/TeamCard/TeamCard'
import TeamModal from './components/TeamModal/TeamModal'

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTeamOpen, setIsTeamOpen] = useState(false)

  const { data, loading, error } = useQuery(Me)

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data?.me) return null

  const { me } = data

  return (
    <div>
      <h1>Bienvenido, {me.name}</h1>
      {me.team
        ? (
          <div>
            <TeamCard
              id={me.team.id}
              name={me.team.name}
              pokemons={me.team.pokemons}
              onClick={() => setIsTeamOpen(true)}
            ></TeamCard>
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
      <TeamModal
        name={me.team?.name ?? ""}
        pokemons={me.team?.pokemons ?? null}
        open={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}>
      </TeamModal>
    </div>
  )
}