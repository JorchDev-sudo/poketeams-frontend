import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-svh bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="font-heading text-xl font-semibold text-foreground">
          Poke Teams
        </span>
        <Button onClick={() => navigate('/login')}>Unirse</Button>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <ul className="flex flex-col gap-4"></ul>
      </main>
    </div>
  )
}