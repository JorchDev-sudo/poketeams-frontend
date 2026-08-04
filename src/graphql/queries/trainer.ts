import { graphql } from '../generated/gql'

export const Me = graphql(`
  query me {
    me {
      id
      name
      email
      team {
        id
        name
        pokemons{
          id
          pokemonId
          pokemonName
          nickname
          position
        }
      }
    }
  }
`)

export const FindTrainerByName = graphql(`
  query FindTrainerByName($name: String!) {
    findTrainerByName(name: $name) {
      id
      name
      email
    }
  }
`)