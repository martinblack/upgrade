import { CreateStoreSlice } from '../types'

export const createStoreSlice: CreateStoreSlice = (set, get) => ({
  isHydrated: false,
  setIsHydrated: isHydrated => set({ isHydrated }),
  clearStore: () =>
    set(() => {
      get().clearRecordings()

      get().clearForegroundProgress()
      get().setIsForegroundRunning(false)
      get().setIsRunning(false)

      get().setLastNotificationTime(0)
      get().setLastRecordingTime(0)

      get().setCanUseData(false)
    }),
})
