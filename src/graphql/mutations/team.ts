import { graphql } from '../generated/gql'


export const CREATE_TEAM = graphql(`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`)

export const ADD_POKEMON_TO_TEAM = graphql(`
  mutation AddPokemonToTeam($pokemonId: Int!) {
    addPokemonToTeam(pokemonId: $pokemonId) {
        id
        name
        pokemons{
            id
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
            name
        }
    }
}
`)


export const REMOVE_POKEMON_FROM_TEAM = graphql(`
  mutation RemovePokemonFromTeam($pokemonId: Int!) {
    removePokemonFromTeam(pokemonId: $pokemonId) {
        id
        name
        pokemons{
            id
            name
        }
    }
}
`)

export const REMOVE_POKEMON_FROM_TEAM_BY_NAME = graphql(`
  mutation RemovePokemonFromTeamByName($pokemonName: String!) {
    removePokemonFromTeamByName(pokemonName: $pokemonName) {
        id
        name
        pokemons{
            id
            name
        }
    }
}
`)