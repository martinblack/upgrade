import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation, useNavigationState } from '@react-navigation/core'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, useColorScheme } from 'react-native'
import { useTheme } from 'styled-components'

import LinkingConfiguration from './LinkingConfiguration'
import { ROUTES } from './routes'
import { RootStackParamList, RootTabParamList, SharedStackParamList } from './types'

import { selectorActiveId, useZudStore } from '@/store'

import Camera from '@/screens/Camera'
import EventDetail from '@/screens/EventDetail'
import ModalTerms from '@/screens/ModalTerms'
import NotFoundScreen from '@/screens/NotFoundScreen'
import Player from '@/screens/Player'
import TabClips from '@/screens/TabClips'
import TabEvents from '@/screens/TabEvents'
import TabHome from '@/screens/TabHome'
import TabProfile from '@/screens/TabProfile'

import { AlertManager } from '@/components/AlertManager'
import CameraButton from '@/components/Buttons/CameraButton'
import { HomeIcon } from '@/components/SvgIcons/HomeIcon'
import { PlaceIcon } from '@/components/SvgIcons/PlaceIcon'
import { PlayIcon } from '@/components/SvgIcons/PlayIcon'
import { ProfileIcon } from '@/components/SvgIcons/ProfileIcon'
import { TaskManager } from '@/components/TaskManager'
import UploadDialog from '@/components/UploadDialog'

const LightTheme = DefaultTheme
LightTheme.colors.background = '#333333'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const SharedStack = createNativeStackNavigator<SharedStackParamList>()

const SharedStackNavigator = () => {
  return (
    <SharedStack.Navigator initialRouteName={ROUTES.EVENTS}>
      <SharedStack.Screen
        name={ROUTES.EVENTS}
        component={TabEvents}
        options={{
          headerShown: false,
        }}
      />
      <SharedStack.Screen
        name={ROUTES.EVENT_DETAIL}
        component={EventDetail}
        options={{
          headerShown: false,
        }}
      />
    </SharedStack.Navigator>
  )
}

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ROUTES.ROOT}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={ROUTES.CAMERA}
        component={Camera}
        options={{
          orientation: 'default',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={ROUTES.PLAYER}
        component={Player}
        options={{
          headerShown: false,
          orientation: 'default',
        }}
      />
      <RootStack.Screen
        name={ROUTES.NOT_FOUND}
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name={ROUTES.TERMS}
          component={ModalTerms}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const theme = useTheme()
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const activeRouteName = useNavigationState(
    state =>
      (state.routes[0].state?.routeNames || [ROUTES.HOME])[state.routes[0].state?.index || 0],
  )

  const activeTabStyle = (routeName: ROUTES) =>
    activeRouteName === routeName
      ? { borderTopColor: theme.colors.white, borderTopWidth: 3 }
      : { borderTopColor: theme.colors.bg1, borderTopWidth: 3 }

  return (
    <>
      <AlertManager />
      <BottomTab.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: theme.colors.bg1,
            borderTopColor: theme.colors.bg1,
          },

          tabBarActiveTintColor: theme.colors.bg3,
          tabBarInactiveTintColor: theme.colors.bg3,

          tabBarLabelPosition: 'below-icon',
          tabBarLabelStyle: {
            lineHeight: 14.52,
            fontSize: 12,
            fontFamily: 'inter400',
          },
        }}>
        <BottomTab.Screen
          name={ROUTES.HOME}
          component={TabHome}
          options={{
            headerShown: false,
            title: t('tabs.home'),
            tabBarIcon: () => <HomeIcon />,
            tabBarItemStyle: activeTabStyle(ROUTES.HOME),
          }}
        />
        <BottomTab.Screen
          name={ROUTES.SHARED_STACK}
          component={SharedStackNavigator}
          options={{
            headerShown: false,
            title: t('tabs.events'),
            tabBarIcon: () => (
              <TouchableOpacity
                onPress={() => {
                  navigate(ROUTES.ROOT, {
                    screen: ROUTES.SHARED_STACK,
                    params: {
                      screen: ROUTES.EVENTS,
                    },
                  })
                }}>
                <PlaceIcon />
              </TouchableOpacity>
            ),
            tabBarItemStyle: activeTabStyle(ROUTES.SHARED_STACK),
            unmountOnBlur: true,
          }}
        />
        <BottomTab.Screen
          name={ROUTES.CAMERA}
          component={Camera}
          options={{
            title: t('tabs.clips'),
            tabBarIcon: () => <PlayIcon />,
            tabBarButton: () => {
              const activeId = useZudStore(selectorActiveId)
              const areEventsActive = activeRouteName === ROUTES.SHARED_STACK
              return (
                <CameraButton
                  onPress={() =>
                    navigate(ROUTES.CAMERA, {
                      eventId: areEventsActive ? activeId : null,
                    })
                  }
                />
              )
            },
          }}
        />
        <BottomTab.Screen
          name={ROUTES.CLIPS}
          component={TabClips}
          options={{
            title: t('tabs.clips'),
            tabBarIcon: () => <PlayIcon />,
            tabBarItemStyle: activeTabStyle(ROUTES.CLIPS),
          }}
        />
        <BottomTab.Screen
          name={ROUTES.PROFILE}
          component={TabProfile}
          options={{
            title: t('tabs.profile'),
            tabBarIcon: () => <ProfileIcon />,
            tabBarItemStyle: activeTabStyle(ROUTES.PROFILE),
          }}
        />
      </BottomTab.Navigator>
    </>
  )
}

const Navigation = () => {
  const colorScheme = useColorScheme()

  return (
    <React.Fragment>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
        <TaskManager />
        <UploadDialog />
        <RootStackNavigator />
      </NavigationContainer>
    </React.Fragment>
  )
}

export default Navigation
