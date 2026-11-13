import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { apiUrl, csrfLink, errorLink } from '@/lib/apollo'

const httpLink = new HttpLink({ uri: `${apiUrl}/chat/graphql`, credentials: 'include' })

const wsLink = new GraphQLWsLink(
    createClient({
        url: `${apiUrl.replace(/^http/, 'ws')}/chat-ws/graphql`,
        lazy: true,
        retryAttempts: 5,
    }),
)

const splitLink = ApolloLink.split(
    ({ query }) => {
        const def = getMainDefinition(query)
        return def.kind === 'OperationDefinition' && def.operation === 'subscription'
    },
    wsLink,
    ApolloLink.from([errorLink, csrfLink, httpLink]),
)

export const chatClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    findMessages: {
                        keyArgs: ['conversationId'],
                        merge(existing: readonly any[] = [], incoming: readonly any[], { readField }) {
                            const seen = new Set(existing.map(m => readField('id', m)))
                            return [...existing, ...incoming.filter(m => !seen.has(readField('id', m)))]
                        },
                    },
                },
            },
        },
    }),
})