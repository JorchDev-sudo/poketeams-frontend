import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";

const apiUrl = import.meta.env.VITE_API_GRAPHQL_URL;

// Lee el valor de una cookie por nombre (document.cookie es un string tipo
// "clave1=valor1; clave2=valor2", así que hay que parsearlo a mano)
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

let logoutCallback: (() => void) | null = null

export const setLogoutCallback = (cb: () => void) => {
  logoutCallback = cb
}

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    logoutCallback?.()
    error.errors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  } else if (CombinedProtocolErrors.is(error)) {
    logoutCallback?.()
    error.errors.forEach(({ message, extensions }) =>
      console.log(`[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`)
    );
  } else {
    logoutCallback?.()
    console.error(`[Network error]: ${error}`);
  }
});

// Lee la cookie XSRF-TOKEN (seteada por el backend, legible por JS porque
// se creó con withHttpOnlyFalse()) y la adjunta como header en cada request.
const csrfLink = new ApolloLink((operation, forward) => {
  const token = getCookie('XSRF-TOKEN');

  if (token) {
    operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => ({
      headers: {
        ...headers,
        'X-XSRF-TOKEN': token,
      }
    }));
  }

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`,
  credentials: 'include', // manda SESSION_ID y XSRF-TOKEN en cada request
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, csrfLink, httpLink]),
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