import { gql } from '@apollo/client'

export const FIND_ALL_TEAMS = gql`
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
        name
      }
    }
  }
`

export const FIND_TEAM_BY_ID = gql`
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
        name
      }
    }
  }
`