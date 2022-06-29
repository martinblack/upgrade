import React, { useEffect, useRef } from 'react'
import { Alert, AppState, AppStateStatus } from 'react-native'
import { selectorRecordingInterrupted, useZudStore } from '@/store'
import { setTaskStoreState } from '@/tasks'
import auth from '@react-native-firebase/auth'
import { useTranslation } from 'react-i18next'

const AppStateManager = () => {
  const appState = useRef(AppState.currentState)
  const setAppState = useZudStore.getState().setAppState
  const recordingInterrupted = useZudStore(selectorRecordingInterrupted)
  const setRecordingInterrupted = useZudStore.getState().setRecordingInterrupted

  const { t } = useTranslation()

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|active/) &&
      (nextAppState === 'background' || nextAppState === 'inactive')
    ) {
      setTaskStoreState(false)
    }

    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      const currentUser = auth().currentUser
      if (currentUser) void currentUser.reload()
    }

    appState.current = nextAppState
    setAppState(nextAppState)
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  useEffect(() => {
    console.log('recordingInterrupted changed', recordingInterrupted)
    if (recordingInterrupted) {
      Alert.alert(
        t('screens.camera.recordingStopedTitle'),
        t('screens.camera.recordingStopedBody'),
        [
          {
            text: t('ok'),
            onPress: () => {
              setRecordingInterrupted(false)
            },
          },
        ],
      )
    }
  }, [recordingInterrupted])

  return null
}

export default AppStateManager
