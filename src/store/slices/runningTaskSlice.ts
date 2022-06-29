import { CreateRunningTaskSlice } from '../types'

export const createRunningTaskSlice: CreateRunningTaskSlice = set => ({
  isRunning: false,
  setIsRunning: value => set(() => ({ isRunning: value })),
  foregroundProgress: 0,
  isForegroundRunning: false,
  setIsForegroundRunning: value => set(() => ({ isForegroundRunning: value })),
  setForegroundProgress: value => set(() => ({ foregroundProgress: value })),
  clearForegroundProgress: () => set(() => ({ foregroundProgress: 0 })),
})
