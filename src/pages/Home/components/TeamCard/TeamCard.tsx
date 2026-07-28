import { ChevronRight } from "lucide-react"
import TypeStripe from "@/components/shared/TypeStripe/TypeStripe"

const MAX_ROSTER_SIZE = 6

interface Pokemon {
    id: string
    pokemonId: number
    name: string
}

interface Props {
    id: string
    name: string
    pokemons: (Pokemon | null)[] | null
    onClick: () => void
}

export default function TeamCard({ name, pokemons, onClick }: Props) {
    const roster = (pokemons ?? []).filter(
        (pokemon): pokemon is Pokemon => pokemon !== null
    )
    const emptySlots = Math.max(MAX_ROSTER_SIZE - roster.length, 0)

    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-colors hover:border-primary/40"
        >
            <TypeStripe />

            <div className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                            Tu equipo
                        </span>
                        <h2 className="font-heading text-xl font-semibold text-foreground">
                            {name}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                        <span className="font-mono text-xs text-muted-foreground">
                            {roster.length}/{MAX_ROSTER_SIZE}
                        </span>
                        <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>

                <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {roster.map((pokemon) => (
                        <li
                            key={pokemon.id}
                            className="truncate rounded-lg border border-border bg-muted px-3 py-1.5 text-sm capitalize text-foreground"
                        >
                            {pokemon.name}
                        </li>
                    ))}
                    {Array.from({ length: emptySlots }).map((_, index) => (
                        <li
                            key={`empty-${index}`}
                            className="rounded-lg border border-dashed border-border px-3 py-1.5 text-sm text-muted-foreground"
                        >
                            Slot libre
                        </li>
                    ))}
                </ol>
            </div>
        </button>
    )
}
