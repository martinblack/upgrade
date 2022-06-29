import { ZudStore } from '../types'

export const selectorIsHydrated = (state: ZudStore) => state.isHydrated
export const selectorUser = (state: ZudStore) => state.user
export const selectorUserUid = (state: ZudStore) => state.user?.uid
export const selectorAnonymousUid = (state: ZudStore) => state.anonymousUid
export const selectorIsAnonymous = (state: ZudStore) => state.user?.isAnonymous
export const selectorIsRunning = (state: ZudStore) => state.isRunning
export const selectorIsForegroundRunning = (state: ZudStore) => state.isForegroundRunning
export const selectorForegroundProgress = (state: ZudStore) => state.foregroundProgress
export const selectorCanUseData = (state: ZudStore) => state.canUseData
export const selectorActiveId = (state: ZudStore) => state.activeId
export const selectorAppState = (state: ZudStore) => state.appState
export const selectorRecordingInterrupted = (state: ZudStore) => state.recordingInterrupted
