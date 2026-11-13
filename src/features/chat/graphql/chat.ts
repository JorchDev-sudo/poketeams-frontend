import { graphql } from './generated/gql'

export const FIND_CONVERSATIONS = graphql(`
  query FindConversations { findConversations { id ownerId participantIds createdAt } }
`)

export const FIND_MESSAGES = graphql(`
  query FindMessages($conversationId: ID!, $limit: Int, $before: DateTime) {
    findMessages(conversationId: $conversationId, limit: $limit, before: $before) {
      id conversationId senderId content sentAt
    }
  }
`)

export const SEND_MESSAGE = graphql(`
  mutation SendMessage($conversationId: ID!, $content: String!) {
    sendMessage(conversationId: $conversationId, content: $content) {
      id conversationId senderId content sentAt
    }
  }
`)

export const START_CONVERSATION = graphql(`
  mutation StartConversation($participantIds: [ID!]!) {
    startConversation(participantIds: $participantIds) { id ownerId participantIds createdAt }
  }
`)

export const MESSAGE_ADDED = graphql(`
  subscription MessageAdded($conversationId: ID!) {
    messageAdded(conversationId: $conversationId) {
      id conversationId senderId content sentAt
    }
  }
`)