import { useEffect, useState } from "react"
import { useDebounce } from 'use-debounce'
import { getPokemons } from "@/lib/api"

interface Props {
    onAddPokemon: (pokemonName: string) => void
}

interface PokemonSuggestion {
    name: string
    url: string
}

export default function PokemonsSearch({ onAddPokemon }: Props) {
    const [input, setInput] = useState("")
    const [debouncedValue] = useDebounce(input, 500)
    const [results, setResults] = useState<PokemonSuggestion[]>([])

    useEffect(() => {
        if (debouncedValue) {
            getPokemons(debouncedValue).then(data => setResults(data))
        } else {
            setResults([])
        }
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
                        <button onClick={() => onAddPokemon(pokemon.name)}>+</button>
                    </div>
                ))}
            </div>
        </div>
    )
}