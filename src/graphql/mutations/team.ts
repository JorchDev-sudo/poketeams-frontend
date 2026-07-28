import { graphql } from '../generated/gql'

export const CREATE_TEAM = graphql(`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`)

export const ADD_POKEMON_TO_TEAM_BY_ID = graphql(`
  mutation AddPokemonToTeamById($pokemonId: Int!) {
    addPokemonToTeamById(pokemonId: $pokemonId) {
        id
        name
        pokemons{
            id
            pokemonId
            name
        }
    }
}
`)

export const ADD_POKEMON_TO_TEAM_BY_NAME = graphql(`
  mutation AddPokemonToTeamByName($pokemonName: String!) {
    addPokemonToTeamByName(pokemonName: $pokemonName) {
        id
        name
        pokemons{
            id
            pokemonId
            name
        }
    }
}
`)

export const REMOVE_POKEMON_FROM_TEAM_BY_ID = graphql(`
  mutation RemovePokemonFromTeamById($id: ID!) {
    removePokemonFromTeamById(id: $id) {
        id
        name
        pokemons{
            id
            pokemonId
            name
        }
    }
}
`)

export const MOVE_POKEMONS = graphql(`
  mutation movePokemons($positions: [PokemonPositionInput!]!) {
    movePokemons(positions: $positions) {
      id
      name
      pokemons {
        id
        name
        position
      }
    }
}
`)
