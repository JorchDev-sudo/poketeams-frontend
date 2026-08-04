import { useQuery } from '@apollo/client/react'
import { Me } from '@/graphql/queries/trainer'
import { useState } from 'react'
import CreateTeamModal from '@/pages/Home/components/CreateTeamModal/CreateTeamModal'
import TeamCard from '@/pages/Home/components/TeamCard/TeamCard'
import TeamModal from './components/TeamModal/TeamModal'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar/Navbar'

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTeamOpen, setIsTeamOpen] = useState(false)

  const { data, loading, error, refetch } = useQuery(Me)

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="font-mono text-sm text-muted-foreground">Cargando…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4">
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error.message}
        </p>
      </div>
    )
  }

  if (!data?.me) return null

  const { me } = data

  return (
    <div className="min-h-svh bg-background">
      <Navbar />

      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trainer dashboard
          </span>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Bienvenido, {me.name}
          </h1>
        </div>

        {me.team ? (
          <TeamCard
            id={me.team.id}
            name={me.team.name}
            pokemons={me.team.pokemons}
            onClick={() => setIsTeamOpen(true)}
          />
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Todavía no tenés un equipo. ¡Creá uno para empezar!
            </p>
            <Button onClick={() => setIsOpen(true)}>Crear equipo</Button>
          </div>
        )}
      </div>

      <CreateTeamModal open={isOpen} onClose={() => setIsOpen(false)} />
      <TeamModal
        name={me.team?.name ?? ""}
        pokemons={me.team?.pokemons ?? []}
        open={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
        onSaved={refetch}
      />
    </div>
  )
}
