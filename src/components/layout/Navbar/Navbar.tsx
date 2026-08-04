import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery, useMutation, useApolloClient } from '@apollo/client/react'
import { FindTrainerByName } from '@/graphql/queries/trainer'
import { FIND_ALL_TEAMS } from '@/graphql/queries/teams'
import { DeleteMyTrainer } from '@/graphql/mutations/trainer'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

type SearchMode = 'trainer' | 'team'

export default function Navbar() {
    const navigate = useNavigate()
    const apolloClient = useApolloClient()
    const { logout } = useAuth()

    const [mode, setMode] = useState<SearchMode>('trainer')
    const [term, setTerm] = useState('')

    const [searchTrainer, { data: trainerData, loading: trainerLoading }] = useLazyQuery(FindTrainerByName)
    const [findAllTeams, { data: teamsData, loading: teamsLoading }] = useLazyQuery(FIND_ALL_TEAMS)

    const [deleteMyTrainer, { loading: deleting }] = useMutation(DeleteMyTrainer)

    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        if (!term.trim()) return

        if (mode === 'trainer') {
            searchTrainer({ variables: { name: term.trim() } })
        } else {
            findAllTeams()
        }
    }

    const filteredTeams = (teamsData?.findAllTeams ?? []).filter(t =>
        t.name.toLowerCase().includes(term.trim().toLowerCase())
    )

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Esta acción es permanente y eliminará tu cuenta y tu equipo. ¿Querés continuar?'
        )
        if (!confirmed) return

        try {
            await deleteMyTrainer()
            await apolloClient.clearStore()
            logout()
            navigate('/login')
        } catch (e) {
            console.error(e)
            alert('No se pudo eliminar la cuenta. Intentá de nuevo.')
        }
    }

    const showResults = term.trim().length > 0 && (trainerData || teamsData || trainerLoading || teamsLoading)

    return (
        <div className="border-b border-border bg-card">
            <nav className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="font-heading text-lg font-semibold text-foreground">PokeTeams</span>

                <form onSubmit={handleSearch} className="flex flex-1 max-w-md items-center gap-2">
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as SearchMode)}
                        className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                    >
                        <option value="trainer">Trainer</option>
                        <option value="team">Team</option>
                    </select>

                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder={mode === 'trainer' ? 'Buscar trainer...' : 'Buscar equipo...'}
                        className="flex-1 rounded-md border border-border bg-background px-3 py-1 text-sm"
                    />

                    <Button type="submit" size="sm">Buscar</Button>
                </form>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDeleteAccount} disabled={deleting}>
                        {deleting ? 'Eliminando...' : 'Eliminar cuenta'}
                    </Button>
                </div>
            </nav>

            {showResults && (
                <div className="border-t border-border px-4 py-3">
                    {(trainerLoading || teamsLoading) && (
                        <p className="text-xs text-muted-foreground">Buscando...</p>
                    )}

                    {mode === 'trainer' && trainerData && (
                        trainerData.findTrainerByName ? (
                            <div>
                                <p className="text-sm font-medium">{trainerData.findTrainerByName.name}</p>
                                <p className="text-xs text-muted-foreground">{trainerData.findTrainerByName.email}</p>
                            </div>
                        ) : (
                            <p className="text-xs text-muted-foreground">Sin resultados</p>
                        )
                    )}

                    {mode === 'team' && teamsData && (
                        filteredTeams.length === 0 ? (
                            <p className="text-xs text-muted-foreground">Sin resultados</p>
                        ) : (
                            <ul className="flex flex-col gap-1">
                                {filteredTeams.map(t => (
                                    <li key={t.id} className="text-sm">
                                        {t.name} <span className="text-muted-foreground">— {t.trainer.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                </div>
            )}
        </div>
    )
}