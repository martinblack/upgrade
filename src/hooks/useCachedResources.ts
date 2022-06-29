import * as React from 'react'
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'
import { FontAwesome } from '@expo/vector-icons'
import notifee from '@notifee/react-native'
import { useZudStore } from '../store'

const useCachedResources = (): [boolean] => {
  const [state, dispatch] = React.useState(false)

  const loadDataAsync = async () => {
    const fonts = Font.loadAsync({
      ...FontAwesome.font,
      'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      inter300: require('../assets/fonts/Inter300.ttf'),
      inter400: require('../assets/fonts/Inter400.ttf'),
      inter600: require('../assets/fonts/Inter600.ttf'),
      inter700: require('../assets/fonts/Inter700.ttf'),
      inter900: require('../assets/fonts/Inter900.ttf'),
    })
    const assets = Asset.loadAsync([
      require('../assets/images/homeBackground.png'),
      require('../assets/images/profile-bg.png'),
    ])

    const notifeePermission = notifee.requestPermission()

    await Promise.all([fonts, assets, notifeePermission])
      .then(() => dispatch(true))
      .catch(() => dispatch(false))
  }

  React.useEffect(() => {
    useZudStore.getState().setIsHydrated(false)
    void loadDataAsync().then(() => useZudStore.getState().setIsHydrated(true))
  }, [])

  return [state]
}

export default useCachedResources
