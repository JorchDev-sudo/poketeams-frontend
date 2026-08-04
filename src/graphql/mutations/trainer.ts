import { graphql } from '../generated/gql'


export const DeleteMyTrainer = graphql(`
  mutation DeleteMyTrainer {
    deleteMyTrainer
  }
`)