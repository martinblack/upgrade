import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { ApolloError, useMutation } from '@apollo/client'
import { RegisterMeMutation, RegisterMeMutationVariables } from '../types'
import { REGISTER_ME_MUTATION } from '../gql/mutations/registerMe'
import * as React from 'react'
import { useSentryLogger } from './useSentry'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { selectorIsHydrated, useZudStore } from '@/store'
import { client } from '@/gql/apollo'
import { FB_APP_ID, FB_APP_NAME, GOOGLE_SIGNIN_WEB_CLIENT_ID } from '@/config'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

// TODO: BETTER HANDLE SOCIALS IDS
GoogleSignin.configure({
  webClientId: GOOGLE_SIGNIN_WEB_CLIENT_ID,
})

export enum Auth {
  CLASSIC,
  FACEBOOK,
  GOOGLE,
  APPLE,
}

export type AuthAction = {
  email: string
  password: string
  displayName: string
}
type AuthMethodsMap = Record<Auth, (action?: AuthAction) => Promise<void | FirebaseAuthTypes.User>>
type DispatchHandler = {
  auth: Auth
  onSuccess?: (user?: FirebaseAuthTypes.User) => void
  onError?: (error: ApolloError) => void
  action?: AuthAction
}
type UseFireAuthDispatch = (handlers: DispatchHandler) => Promise<void>
type UseFireAuth = [{ isLoading: boolean; authMethods: AuthMethodsMap }, UseFireAuthDispatch]

const facebook = async (): Promise<void> => {
  console.log('Facebook signout for safety')
  await LoginManager.logOut()
  // Attempt login with permissions

  const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

  if (result.isCancelled) {
    throw 'User cancelled the login process'
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken()

  if (!data) {
    throw 'Something went wrong obtaining access token'
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

  // Sign-in the user with the credential
  await auth().signInWithCredential(facebookCredential)
}

const google = async (): Promise<void> => {
  console.log('Google signout for safety')
  await GoogleSignin.signOut()

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  await auth().signInWithCredential(googleCredential)
}

const apple = async (): Promise<void> => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned')
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

  // Sign the user in with the credential
  await auth().signInWithCredential(appleCredential)
}

const classic = async (action?: AuthAction): Promise<FirebaseAuthTypes.User | void> => {
  if (!action) return
  const { email, password, displayName } = action
  const trimmedEmail = email.trim()
  const trimmedPassword = password.trim()

  if (!trimmedEmail || !trimmedPassword) return

  await auth()
    .createUserWithEmailAndPassword(trimmedEmail, trimmedPassword)
    .then(async userCredentials => {
      if (userCredentials.user) {
        await userCredentials.user.updateProfile({
          displayName,
        })
      }
    })
    .then(() => void auth().currentUser)
}

export const useFireAuth = (): UseFireAuth => {
  const [isLoading, setIsLoading] = React.useState(false)

  const authMethods: AuthMethodsMap = {
    [Auth.CLASSIC]: classic,
    [Auth.FACEBOOK]: facebook,
    [Auth.APPLE]: apple,
    [Auth.GOOGLE]: google,
  }

  const handleAuthByType = async ({
    auth,
    onError,
    onSuccess,
    action,
  }: DispatchHandler): Promise<void> => {
    setIsLoading(true)
    const method = authMethods[auth]

    if (!method) throw Error('Auth method is not supported!')

    await method(action)
      .then(() => onSuccess?.())
      .catch(error => {
        onError?.(error)
        useSentryLogger({
          error,
          message: error.message,
          tags: { type: 'Auth' },
          extras: { auth },
        })
      })

    setIsLoading(false)
  }

  return [{ authMethods, isLoading }, handleAuthByType]
}

export const FirebaseAuth = () => {
  const isHydrated = useZudStore(selectorIsHydrated)
  const setAnonymousUid = useZudStore.getState().setAnonymousUid
  const setUser = useZudStore.getState().setUser

  const [registerMeMutation] = useMutation<RegisterMeMutation, RegisterMeMutationVariables>(
    REGISTER_ME_MUTATION,
  )

  React.useEffect(() => {
    if (!isHydrated) return
    const currentUser = auth()?.currentUser

    if (!currentUser) {
      console.log('no user - anonymous login')
      void auth()
        .signInAnonymously()
        .then(({ user }) => {
          setUser(user)
          setAnonymousUid(user.uid)
          console.log('anonymous uid', user.uid)
        })
        .catch(console.warn)

      return
    } else {
      console.log('user is logged in - reloading')
      void currentUser.reload()
    }
  }, [isHydrated])

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userSub => {
      console.log('onAuthStateChanged', userSub)

      if (!userSub) return
      if (userSub.isAnonymous) setAnonymousUid(userSub.uid)

      void registerMeMutation({
        variables: {
          uid: userSub.uid,
          replace: userSub?.isAnonymous ? null : useZudStore.getState().anonymousUid,
        },
      })
        .catch(console.warn)
        .finally(async () => {
          console.log('registerMeMutation', userSub)
          setUser(userSub)
          await client.refetchQueries({
            include: 'all',
          })
        })
    })

    return () => unsubscribe()
  }, [])

  return null
}
