/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query FindConversations { findConversations { id ownerId participantIds createdAt } }\n": typeof types.FindConversationsDocument,
    "\n  query FindMessages($conversationId: ID!, $limit: Int, $before: DateTime) {\n    findMessages(conversationId: $conversationId, limit: $limit, before: $before) {\n      id conversationId senderId content sentAt\n    }\n  }\n": typeof types.FindMessagesDocument,
    "\n  mutation SendMessage($conversationId: ID!, $content: String!) {\n    sendMessage(conversationId: $conversationId, content: $content) {\n      id conversationId senderId content sentAt\n    }\n  }\n": typeof types.SendMessageDocument,
    "\n  mutation StartConversation($participantIds: [ID!]!) {\n    startConversation(participantIds: $participantIds) { id ownerId participantIds createdAt }\n  }\n": typeof types.StartConversationDocument,
    "\n  subscription MessageAdded($conversationId: ID!) {\n    messageAdded(conversationId: $conversationId) {\n      id conversationId senderId content sentAt\n    }\n  }\n": typeof types.MessageAddedDocument,
};
const documents: Documents = {
    "\n  query FindConversations { findConversations { id ownerId participantIds createdAt } }\n": types.FindConversationsDocument,
    "\n  query FindMessages($conversationId: ID!, $limit: Int, $before: DateTime) {\n    findMessages(conversationId: $conversationId, limit: $limit, before: $before) {\n      id conversationId senderId content sentAt\n    }\n  }\n": types.FindMessagesDocument,
    "\n  mutation SendMessage($conversationId: ID!, $content: String!) {\n    sendMessage(conversationId: $conversationId, content: $content) {\n      id conversationId senderId content sentAt\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation StartConversation($participantIds: [ID!]!) {\n    startConversation(participantIds: $participantIds) { id ownerId participantIds createdAt }\n  }\n": types.StartConversationDocument,
    "\n  subscription MessageAdded($conversationId: ID!) {\n    messageAdded(conversationId: $conversationId) {\n      id conversationId senderId content sentAt\n    }\n  }\n": types.MessageAddedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindConversations { findConversations { id ownerId participantIds createdAt } }\n"): (typeof documents)["\n  query FindConversations { findConversations { id ownerId participantIds createdAt } }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindMessages($conversationId: ID!, $limit: Int, $before: DateTime) {\n    findMessages(conversationId: $conversationId, limit: $limit, before: $before) {\n      id conversationId senderId content sentAt\n    }\n  }\n"): (typeof documents)["\n  query FindMessages($conversationId: ID!, $limit: Int, $before: DateTime) {\n    findMessages(conversationId: $conversationId, limit: $limit, before: $before) {\n      id conversationId senderId content sentAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendMessage($conversationId: ID!, $content: String!) {\n    sendMessage(conversationId: $conversationId, content: $content) {\n      id conversationId senderId content sentAt\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($conversationId: ID!, $content: String!) {\n    sendMessage(conversationId: $conversationId, content: $content) {\n      id conversationId senderId content sentAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartConversation($participantIds: [ID!]!) {\n    startConversation(participantIds: $participantIds) { id ownerId participantIds createdAt }\n  }\n"): (typeof documents)["\n  mutation StartConversation($participantIds: [ID!]!) {\n    startConversation(participantIds: $participantIds) { id ownerId participantIds createdAt }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription MessageAdded($conversationId: ID!) {\n    messageAdded(conversationId: $conversationId) {\n      id conversationId senderId content sentAt\n    }\n  }\n"): (typeof documents)["\n  subscription MessageAdded($conversationId: ID!) {\n    messageAdded(conversationId: $conversationId) {\n      id conversationId senderId content sentAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;