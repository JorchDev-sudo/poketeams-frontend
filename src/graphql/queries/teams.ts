import { graphql } from '../generated/gql'


export const FIND_ALL_TEAMS = graphql(`
  query FindAllTeams {
    findAllTeams {
      id
      name
      trainer {
        id
        name
      }
      pokemons {
        id
        pokemonId
        pokemonName
      }
    }
  }
`)

export const FIND_TEAM_BY_ID = graphql(`
  query FindTeamById($id: ID!) {
    findTeamById(id: $id) {
      id
      name
      trainer {
        id
        name
      }
      pokemons {
        id
        pokemonId
        pokemonName
      }
    }
  }
`)