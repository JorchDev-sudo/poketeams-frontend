import { graphql } from '../generated/gql'

export const CREATE_TEAM = graphql(`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`)

export const SYNC_POKEMONS = graphql(`
  mutation SyncPokemons($pokemons: [PokemonSyncInput]!) {
  syncPokemons(pokemons: $pokemons) {
    id
    name
    pokemons {
      id
      pokemonId
      pokemonName
      nickname
      position
    }
  }
}
`)
