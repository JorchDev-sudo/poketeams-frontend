import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";

const apiUrl = import.meta.env.VITE_API_URL;

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`
})

let logoutCallback: (() => void) | null = null

export const setLogoutCallback = (cb: () => void) => {
  logoutCallback = cb
}

const errorLink = new ErrorLink(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    logoutCallback?.()
    error.errors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  } else if (CombinedProtocolErrors.is(error)) {
    logoutCallback?.()
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      )
    );
  } else {
    logoutCallback?.()
    console.error(`[Network error]: ${error}`);
    localStorage.removeItem('token')
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
  cache: new InMemoryCache(),
})