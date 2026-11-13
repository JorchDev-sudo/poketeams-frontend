import { useEffect, useState } from "react"
import { useDebounce } from 'use-debounce'
import { getPokemons, type PokemonSuggestion } from "@/lib/api.ts"

interface Props {
    onAddPokemon: (pokemonName: string, nickname: string, pokemonId: number) => void
}

export default function PokemonsSearch({ onAddPokemon }: Props) {
    const [input, setInput] = useState("")
    const [debouncedValue] = useDebounce(input, 500)
    const [results, setResults] = useState<PokemonSuggestion[]>([])

    useEffect(() => {
        if (!debouncedValue) { setResults([]); return }
        const controller = new AbortController()
        getPokemons(debouncedValue, controller.signal)
            .then(setResults)
            .catch(e => { if (e.name !== 'AbortError') console.error(e) })
        return () => controller.abort()   // se ejecuta al cambiar el valor o desmontar
    }, [debouncedValue])

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Buscar pokémon..."
            />
            <div className="grid_container">
                {results.map(pokemon => (
                    <div key={pokemon.name}>
                        {pokemon.name}
                        <button onClick={() => onAddPokemon(pokemon.name, "", pokemon.pokemonId)}>+</button>
                    </div>
                ))}
            </div>
        </div>
    )
}