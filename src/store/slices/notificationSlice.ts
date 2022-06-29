import { CreateNotificationSlice } from '../types'

export const createNotificationSlice: CreateNotificationSlice = (set, get) => ({
  lastNotificationTime: 0,
  lastRecordingTime: 0,
  setLastNotificationTime: lastNotificationTime => set(() => ({ lastNotificationTime })),
  setLastRecordingTime: lastRecordingTime => set(() => ({ lastRecordingTime })),
})
