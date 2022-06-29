import { useRef, useState } from 'react'
import { uploadTask } from './upload-task'
import notifee from '@notifee/react-native'
import S3 from 'aws-sdk/clients/s3'
import { AWSError, Request } from 'aws-sdk'
import { CHANNEL_ID, CHANNEL_NAME, NOTIFICATION_ID } from './constants'
import { handleEvent, initializeNotification, updateNotification } from '@/notifications/utils'
import { IS_FROM_FILE_SYSTEM, markAndRemove } from '@/tasks/utils'
import { useZudStore } from '@/store'

export const useManualUpload = (uri: string, eventName: string) => {
  const [isUploading, setIsUploading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [progress, setProgress] = useState(0)
  const setIsTaskRunning = useZudStore.getState().setIsRunning

  const uploadTaskRef = useRef<Request<S3.PutObjectOutput, AWSError>>()

  const onProgress = async (progress: number) => {
    setProgress(progress * 100)
    await updateNotification(CHANNEL_ID, NOTIFICATION_ID, eventName, progress)
  }

  const onFinish = async () => {
    setIsUploading(false)
    setIsFinished(true)
    markAndRemove(uri, IS_FROM_FILE_SYSTEM)
    setTimeout(
      async () => await notifee.deleteChannel(CHANNEL_ID).catch(err => console.log(err)),
      1500,
    )
    setIsTaskRunning(false)
  }

  const start = async () => {
    setIsUploading(true)
    setIsTaskRunning(true)

    initializeNotification(CHANNEL_ID, CHANNEL_NAME, NOTIFICATION_ID, eventName)

    notifee.onForegroundEvent(async ({ type, detail }) => handleEvent(type, detail, cancel))

    notifee.onBackgroundEvent(async ({ type, detail }) => handleEvent(type, detail, cancel))

    uploadTask({
      uri: uri,
      onFinish: onFinish,
      onProgress: onProgress,
      onCancel: cancel,
      taskCallback: task => (uploadTaskRef.current = task),
    })
  }

  const cancel = () => {
    setIsUploading(false)
    uploadTaskRef.current?.abort()
    notifee.deleteChannel(CHANNEL_ID).catch(err => console.log(err))
    setIsTaskRunning(false)
  }

  return { isUploading, isFinished, progress, start, cancel }
}
