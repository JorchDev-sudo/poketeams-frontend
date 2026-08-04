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