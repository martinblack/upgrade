import React from 'react'
import { NetInfoStateType } from '@react-native-community/netinfo'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '@/navigation/routes'
import { useZudStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import shallow from 'zustand/shallow'

export const AlertManager: React.FC = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const user = auth().currentUser
  const { queueLength, network } = useZudStore(
    state => ({
      queueLength: state.queue.length,
      network: state.network,
    }),
    shallow,
  )

  React.useEffect(() => {
    if (user && !user.isAnonymous) return
    if (queueLength === 0) return

    const isWifi = network === NetInfoStateType.wifi
    if (!isWifi) return

    setTimeout(
      () =>
        Alert.alert(t('alert.cannotUpload'), t('alert.cannotUploadDesc'), [
          {
            text: 'OK',
            onPress: () => navigate(ROUTES.PROFILE, {}),
          },
        ]),
      2000,
    )
  }, [queueLength, network, user])

  return null
}
