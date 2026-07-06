import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'

const apiUrl = import.meta.env.VITE_API_URL;

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`
})

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
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
})