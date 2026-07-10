const GRAPH_BASE_URL = import.meta.env.VITE_API_GRAPHQL_URL;
const REST_BASE_URL = import.meta.env.VITE_API_REST_URL;


interface AuthResponse {
  token: string
  trainer: {
    id: string
    name: string
    email: string
  }
}

interface PokemonsResponse {
  pokemons: {
    name: string
    url: string
  }[]
}

interface RegisterDto {
  name: string
  email: string
  password: string
}

interface LoginDto {
  email: string
  password: string
}
//Todo mejorar el tipado de error
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Server error')
  }
  return response.json()
}

export const authApi = {
  register: (dto: RegisterDto): Promise<AuthResponse> =>
    fetch(`${GRAPH_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }).then(res => handleResponse<AuthResponse>(res)),

  login: (dto: LoginDto): Promise<AuthResponse> =>
    fetch(`${GRAPH_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }).then(res => handleResponse<AuthResponse>(res)),
}

export function getPokemons(pokemonName: String): Promise<PokemonsResponse> {
  return fetch(`${REST_BASE_URL}/api/pokemon/search/contains?name=${pokemonName}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => handleResponse<PokemonsResponse>(res))
}