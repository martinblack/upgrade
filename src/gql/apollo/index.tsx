import { ApolloClient, InMemoryCache, concat, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import auth from '@react-native-firebase/auth'
import { useSentryLogger } from '@/hooks/useSentry'
import { API_ENDPOINT } from '@/config'

const errorsLink = onError(props => {
  const { graphQLErrors, operation, networkError } = props

  if (graphQLErrors && graphQLErrors.length > 0) {
    graphQLErrors.forEach(error => {
      useSentryLogger({
        error,
        message: error.message,
        extras: { operation, networkError },
        tags: { type: 'graphql' },
      })
      console.error(error)
    })
  }
})

const authMiddleware = setContext(async () => {
  const user = await auth()?.currentUser

  if (!user) {
    useSentryLogger({
      error: new Error('Missing user!'),
      tags: { type: 'AuthMiddlewareMissingUser' },
    })
  }

  const token =
    user &&
    (await user.getIdTokenResult().catch(error =>
      useSentryLogger({
        error,
        message: error.message,
        tags: { type: 'AuthMiddlewareGetIdTokenResult' },
        extras: { uid: user.uid, isAnonymous: user.isAnonymous },
      }),
    ))

  const Authorization = token && token?.token ? token?.token : ''

  return {
    headers: {
      Authorization,
    },
  }
})

const httpLink = new HttpLink({ uri: API_ENDPOINT })

export const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
  link: concat(authMiddleware, errorsLink.concat(httpLink)),
})
