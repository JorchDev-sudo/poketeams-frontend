// LM

import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const navigate = useNavigate()
  const teams: string[] = []

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <span className="font-heading text-lg font-semibold text-foreground sm:text-xl">
          Poke Teams
        </span>
        <Button
          className="transition-transform hover:scale-105"
          onClick={() => navigate('/login')}
        >
          Unirse
        </Button>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        {teams.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Aún no hay equipos
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {teams.map((team) => (
              <li
                key={team}
                className="rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {team}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}