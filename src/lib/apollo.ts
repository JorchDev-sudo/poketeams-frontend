import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { CombinedGraphQLErrors, CombinedProtocolErrors, ServerError } from '@apollo/client/errors'
import { getCookie } from './csrf'

export const apiUrl: string = import.meta.env.VITE_API_GRAPHQL_URL

let logoutCallback: (() => void) | null = null
export const setLogoutCallback = (cb: () => void) => { logoutCallback = cb }

export const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, path }) => console.log(`[GraphQL] ${message}`, path))
  } else if (CombinedProtocolErrors.is(error)) {
    console.log('[Protocol error]', error.errors)
  } else if (ServerError.is(error) && error.statusCode === 401) {
    logoutCallback?.()
  } else {
    console.error('[Network error]', error)
  }
})

export const csrfLink = new ApolloLink((operation, forward) => {
  const token = getCookie('XSRF-TOKEN')
  if (token) {
    operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => ({
      headers: { ...headers, 'X-XSRF-TOKEN': token },
    }))
  }
  return forward(operation)
})

const httpLink = new HttpLink({ uri: `${apiUrl}/graphql`, credentials: 'include' })

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, csrfLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Team: { fields: { pokemons: { merge: (_, incoming) => incoming } } },
    },
  }),
})