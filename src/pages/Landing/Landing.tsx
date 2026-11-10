import { useEffect, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { Moon, Search, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

// modo claro y oscuro (solo esta pag)
const lightTheme = {
  '--background': '#F5F9FA',
  '--foreground': '#1B2A38',
  '--card': '#FFFFFF',
  '--card-foreground': '#1B2A38',
  '--primary': '#1F5FA8',
  '--primary-foreground': '#FFFFFF',
  '--border': '#D9E2E8',
  '--muted-foreground': '#5B6B78',
} as CSSProperties

const darkTheme = {
  '--background': '#14181D',
  '--foreground': '#E6EAEE',
  '--card': '#1C2229',
  '--card-foreground': '#E6EAEE',
  '--primary': '#6FA3D8',
  '--primary-foreground': '#0F1419',
  '--border': '#2B3440',
  '--muted-foreground': '#9AA7B4',
} as CSSProperties


// ej para probar el buscador
const teams: string[] = [
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
]

// animacion de aparicion (cada equipo)
function TeamItem({ name, index }: { name: string; index: number }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <li
      style={{ transitionDelay: `${index * 40}ms` }}
      className={`transition-all duration-300 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <div className="rounded-xl border border-border bg-card p-4 text-card-foreground transition duration-150 hover:-translate-y-0.5 hover:shadow-md">
        {name}
      </div>
    </li>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [mounted, setMounted] = useState(false)

  // animacion de entrada
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const filtered = teams.filter((team) =>
    team.toLowerCase().includes(query.trim().toLowerCase())
  )

  const appear = mounted
    ? 'translate-y-0 opacity-100'
    : 'translate-y-3 opacity-0'

  return (
    <div
      style={dark ? darkTheme : lightTheme}
      className="min-h-svh bg-background text-foreground transition-colors duration-300"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <span className="font-heading text-lg font-semibold sm:text-xl">
          Poke Teams
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition duration-150 hover:scale-105"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Button
            className="transition-transform duration-150 hover:scale-105"
            onClick={() => navigate('/login')}
          >
            Unirse
          </Button>
        </div>
      </header>

      {/*animacion de la pag */}
      <main
        className={`mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8 transition-all duration-700 sm:px-6 sm:py-10 ${appear}`}
      >
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Buscar equipo..."
            aria-label="Buscar equipo"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-card-foreground outline-none transition duration-150 focus:border-primary"
          />
        </div>

        {teams.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Aún no hay equipos
          </p>
        ) : !focused ? (
          <p className="text-center text-sm text-muted-foreground">
            Haz clic en el buscador para ver los equipos
          </p>
        ) : filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No se encontró ningún equipo con ese nombre
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {filtered.map((team, i) => (
              <TeamItem key={team} name={team} index={i} />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}