/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { RootStackParamList } from './types'
import { ROUTES } from './routes'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          [ROUTES.HOME]: {
            screens: {
              TabEvents: 'home',
            },
          },
          [ROUTES.SHARED_STACK]: {
            screens: {
              [ROUTES.EVENTS]: 'events',
              [ROUTES.EVENT_DETAIL]: 'event-detail',
            },
          },
          [ROUTES.CLIPS]: {
            screens: {
              TabClips: 'clips',
            },
          },
          [ROUTES.CAMERA]: {
            screens: {
              TabCamera: 'camera',
            },
          },
          [ROUTES.PROFILE]: {
            screens: {
              TabProfile: 'profile',
            },
          },
        },
      },
      [ROUTES.TERMS]: 'terms',
      NotFound: '*',
    },
  },
}

export default linking
