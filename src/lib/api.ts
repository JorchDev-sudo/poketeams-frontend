const API_URL = import.meta.env.VITE_API_GRAPHQL_URL

export interface PokemonSuggestion { name: string; url: string; pokemonId: number }

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.message ?? `Error ${response.status}`)
    }
    return response.json()
}

export function getPokemons(name: string, signal?: AbortSignal): Promise<PokemonSuggestion[]> {
    return fetch(`${API_URL}/pokemon/api/pokemon/search/contains?name=${encodeURIComponent(name)}`, {
        credentials: 'include',
        signal,
    }).then(res => handleResponse<PokemonSuggestion[]>(res))
}