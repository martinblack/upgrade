import * as React from 'react'
import shallow from 'zustand/shallow'
import debounce from 'lodash-es/debounce'

import { checkTaskAvailability, setTaskStoreState, UploadStatus, videoUploader } from '@/tasks'
import { useZudStore } from '@/store'

export const TaskManager: React.FC = React.memo(() => {
  const { canUseData, recordings, appState, network, uid } = useZudStore(
    state => ({
      canUseData: state.canUseData,
      recordings: state.recordings,
      appState: state.appState,
      network: state.network,
      uid: state.user?.uid,
    }),
    shallow,
  )
  const taskIndex = React.useRef(0)

  const handleUploadAsync = async (taskId: string) => {
    try {
      setTaskStoreState(true)
      const { isAvailable, error } = await checkTaskAvailability()

      if (!isAvailable || error) {
        setTaskStoreState(false)
      } else {
        const status = await videoUploader({
          taskId,
          maxWindow: 25 * 60 * 1000,
          disableNotification: true,
        })
        taskIndex.current = taskIndex.current + 1
        console.info('FINISHED', taskId, status)
        setTaskStoreState(false)
      }
    } catch (error) {
      setTaskStoreState(false)
    }
  }

  const effectWithDelay = debounce(() => {
    const queue = useZudStore.getState().queue
    const isRunning = useZudStore.getState().isRunning
    const isForegroundRunning = useZudStore.getState().isForegroundRunning
    const status = useZudStore.getState().status

    if (
      queue.length === 0 ||
      appState !== 'active' ||
      isRunning ||
      isForegroundRunning ||
      status === UploadStatus.UPLOADING
    ) {
      console.info(`[TaskManager:Prevented:${taskIndex.current}]`)
    } else {
      console.info(`[TaskManager:Started:${taskIndex.current}]`)
      void handleUploadAsync(`[TaskManager:Upload:${taskIndex.current}]`)
    }
  }, 4000)

  React.useMemo(() => {
    let isActive = true

    isActive && effectWithDelay()

    return () => {
      effectWithDelay.cancel()
      isActive = false
    }
  }, [recordings, appState, canUseData, network, uid])

  return null
})
