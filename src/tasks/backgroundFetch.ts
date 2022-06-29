import BackgroundFetch from 'react-native-background-fetch'
import auth from '@react-native-firebase/auth'
import { setTaskStoreState } from './setTaskStoreState'
import { checkTaskAvailability } from './checkTaskAvailability'
import { useSentryLogger } from '../hooks/useSentry'
import { videoUploader } from './videoUploader'
import { useZudStore } from '../store'
import { TASKS, UploadStatus } from './types'

const setUploadStatus = useZudStore.getState().setUploadStatus

export const onEvent = async (taskId: string) => {
  // * Before task start check is available
  const { isAvailable, error } = await checkTaskAvailability()

  const user = auth()?.currentUser

  if (!isAvailable || error) {
    useSentryLogger({
      error,
      message: '[BackgroundTask:Not:Available]',
      extras: { taskId, isAvailable, user },
    })

    setUploadStatus(UploadStatus.ERROR)
    return BackgroundFetch.finish(taskId)
  }

  switch (taskId) {
    case TASKS.VIDEO_UPLOAD:
      console.info(`[BackgroundTask: ${taskId}]`)
      useSentryLogger({
        error: new Error(`[BackgroundTask:Custom:${taskId}]`),
        extras: { taskId, started: new Date().toISOString() },
      })
      break
    default:
      console.info(`[BackgroundTask:${taskId}]`)
      useSentryLogger({
        error: new Error(`[BackgroundTask:Started:Default:${taskId}]`),
        extras: { taskId, started: new Date().toISOString(), user },
      })
      setTaskStoreState(true)
      const status = await videoUploader({ taskId })
      useSentryLogger({
        error: new Error(`[BackgroundTask:End:${status}]`),
        extras: { taskId, status, end: new Date().toISOString(), user },
      })
      setTaskStoreState(false)
      setUploadStatus(UploadStatus.FINISHED)
  }

  return BackgroundFetch.finish(taskId)
}

export const onTimeout = async (taskId: string) => {
  setTaskStoreState(false)
  useSentryLogger({
    error: new Error(`[BackgroundTask:OnTimeout:${taskId}]`),
    extras: { taskId, end: new Date().toISOString() },
  })

  setUploadStatus(UploadStatus.EXCEEDED)
  return BackgroundFetch.finish(taskId)
}

export const isBackgroundFetchAvailable = (status: BackgroundFetch) => {
  if (status === BackgroundFetch.STATUS_AVAILABLE) return

  useSentryLogger({
    error: new Error('[BackgroundFetch:Configure:Status:Failed]'),
    extras: { status },
  })
}
