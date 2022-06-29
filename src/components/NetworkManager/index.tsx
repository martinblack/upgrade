import * as React from 'react'
import NetInfo from '@react-native-community/netinfo'
import { useZudStore } from '@/store'

export const NetworkManager: React.FC = () => {
  const setNetwork = useZudStore.getState().setNetwork

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetwork(state.type)
    })

    return () => unsubscribe()
  }, [])

  return null
}
