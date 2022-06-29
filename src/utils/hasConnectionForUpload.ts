import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo'
import { useZudStore } from '@/store'

export const hasConnectionForUpload = async (): Promise<boolean> => {
  return NetInfo.fetch()
    .then(state => {
      const currentNetworkType = state.type
      const isWifi = currentNetworkType === NetInfoStateType.wifi
      const canUseMobileData =
        currentNetworkType === NetInfoStateType.cellular && useZudStore.getState().canUseData

      return isWifi || canUseMobileData
    })
    .catch(() => false)
}
