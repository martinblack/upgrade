/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ROUTES } from './routes'
import { Auth } from '@/hooks/fireAuth'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type TermsScreenParams = {
  auth?: Auth
  email?: string
  password?: string
  displayName?: string
}

export type EventDetailParams = {
  image: string
  eventId: string
  noAnimation?: boolean
  previousRoute?: string
}

export type SharedStackParamList = {
  [ROUTES.EVENTS]: undefined
  [ROUTES.EVENT_DETAIL]: EventDetailParams
}

export type SharedStack = NavigatorScreenParams<SharedStackParamList> | undefined

export type RootTabParamList = {
  [ROUTES.HOME]: undefined
  [ROUTES.CLIPS]: undefined
  [ROUTES.CAMERA]: undefined
  [ROUTES.PROFILE]: undefined
  [ROUTES.SHARED_STACK]: SharedStack
}

export type BottomTabStack = NavigatorScreenParams<RootTabParamList> | undefined

export type BottomTabStackProps = NativeStackScreenProps<RootStackParamList, ROUTES.ROOT>

export type RootStackParamList = {
  [ROUTES.ROOT]: BottomTabStack
  [ROUTES.CAMERA]: { eventId?: string | null }
  [ROUTES.TERMS]: TermsScreenParams
  [ROUTES.PLAYER]: { uri: string }
  [ROUTES.PROFILE]: { displayName?: string; errorMessage?: string }
  [ROUTES.NOT_FOUND]: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>
