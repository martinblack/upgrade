import { NetInfoStateType } from '@react-native-community/netinfo'
import { CreateAppSlice } from '../types'

export const createAppSlice: CreateAppSlice = (set, get) => ({
  appState: 'unknown',
  network: NetInfoStateType.unknown,
  setAppState: value => set(() => ({ appState: value })),
  setNetwork: value => set(() => ({ network: value })),
})
