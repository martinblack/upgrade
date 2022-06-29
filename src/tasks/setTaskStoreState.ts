import { useZudStore } from '../store'

const setIsRunning = useZudStore.getState().setIsRunning
const setIsForegroundRunning = useZudStore.getState().setIsForegroundRunning
const setIsForegroundProgress = useZudStore.getState().setForegroundProgress

export const setTaskStoreState = (state: boolean) => {
  setIsRunning(state)
  setIsForegroundRunning(state)

  if (!state) {
    setIsForegroundProgress(0)
  }
}
