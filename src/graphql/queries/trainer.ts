import { gql } from '@apollo/client'

export const ME = gql`
  query ME {
    me {
      id
      name
      email
      team {
        id
        name
      }
    }
  }
`