import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  ServerError,
} from "@apollo/client/errors";

const apiUrl = import.meta.env.VITE_API_GRAPHQL_URL;

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`
})

let logoutCallback: (() => void) | null = null

export const setLogoutCallback = (cb: () => void) => {
  logoutCallback = cb
}

// El Gateway (Spring for GraphQL) clasifica cada error con ErrorType
// y lo serializa en extensions.classification. UNAUTHORIZED es lo
// que usa Spring cuando falta o expiró el JWT (AuthenticationException).
const isAuthError = (extensions?: Record<string, unknown>) =>
  extensions?.classification === 'UNAUTHORIZED'

const errorLink = new ErrorLink(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    const shouldLogout = error.errors.some(({ extensions }) => isAuthError(extensions))

    error.errors.forEach(({ message, locations, path, extensions }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Classification: ${extensions?.classification}`
      )
    );

    if (shouldLogout) {
      logoutCallback?.()
    }
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`
      )
    );
  } else if (ServerError.is(error) && error.statusCode === 401) {
    // El JWT fue rechazado ANTES de llegar al motor GraphQL
    // (p. ej. tu SecurityFilterChain lo cortó y devolvió un 401 "crudo").
    console.error(`[Server error]: ${error.statusCode}`)
    logoutCallback?.()
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem('token')

  return {
    ...prevContext,
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Team: {
        fields: {
          pokemons: {
            merge(_, incoming) {
              return incoming
            }
          }
        }
      }
    }
  }),
})