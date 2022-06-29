import { configWasabiUpload } from '@/config'
import { useZudStore } from '@/store'
import {
  createBlob,
  createReference,
  generateChunk,
  getChunkEndTime,
  getChunksCount,
  getChunkStartTime,
  isEndOfVideo,
  makeS3,
  markAndRemove,
} from '@/tasks/utils'
import { compressVideo } from '@/utils/compressVideo'
import { useSentryLogger } from '@/hooks/useSentry'
import { UploadStatus } from './types'
import { pushNotification } from '@/notifications/pushNotification'
import Layout from '@/constants/Layout'
import {
  cancelUploadNotification,
  handleEvent,
  initializeNotification,
  updateNotification,
} from '@/notifications/utils'
import { CHANNEL_ID_LRT, CHANNEL_NAME_LRT, NOTIFICATION_ID_LRT } from '@/constants/longRunningTask'
import translation from 'i18next'
import notifee from '@notifee/react-native'
import { hasConnectionForUpload } from '@/utils/hasConnectionForUpload'
import { client } from '@/gql/apollo'
import { CREATE_VIDEO_CHUNK_MUTATION } from '@/gql/mutations/createVideoChunk'

// * The first phase of the upload is generating chunks, compressing them and uploading immediately.
// * After compressed chunks were uploaded the "isCompressedDone" of the current video is set to true and the second phase begins.
// * It includes generating chunks in the full size and uploading them to Wasabi.
const setProgress = useZudStore.getState().setForegroundProgress
const getVideoToUpload = useZudStore.getState().getVideoToUpload
const removeVideo = useZudStore.getState().removeVideo
const setCurrentFullChunk = useZudStore.getState().setCurrentFullChunk
const setCurrentCompressedChunk = useZudStore.getState().setCurrentCompressedChunk
const setIsCompressedDone = useZudStore.getState().setIsCompressedDone
const isEmpty = useZudStore.getState().isEmpty
const setUploadStatus = useZudStore.getState().setUploadStatus

export const uploadToS3Bucket = async (
  disableNotification: boolean,
  chunksCount: number,
  taskId: string,
): Promise<UploadStatus> => {
  const isTaskRunning = useZudStore.getState().isRunning
  if (!isTaskRunning) return UploadStatus.CANCEL_RUNNING

  const currentVideo = getVideoToUpload()

  if (!currentVideo || !currentVideo?.uri) return UploadStatus.MISSING_VIDEO

  const uri = currentVideo.uri
  const compressedChunk = currentVideo?.currentCompressedChunk
  const isCompressedDone = currentVideo?.isCompressedDone
  const progress = useZudStore.getState().foregroundProgress
  // * Upload compressed chunk first if it is ready
  const currentChunkIndex = isCompressedDone ? currentVideo.currentFullChunk : compressedChunk

  if (typeof currentChunkIndex === 'undefined') {
    useSentryLogger({
      error: new Error(`[UploadS3:Chunk:Not:Found]`),
      extras: { taskId },
    })

    return UploadStatus.MISSING_CHUNK
  }

  try {
    const chunk = await generateChunk(uri, currentChunkIndex)
    const currentChunk = isCompressedDone ? chunk : await compressVideo(chunk as string)
    const currentBody = currentChunk && (await createBlob(currentChunk))
    const reference = createReference(
      currentVideo.slug,
      currentVideo.id,
      currentVideo.uri,
      isCompressedDone,
      currentChunkIndex,
    )
    const isEndOfRecording = isEndOfVideo(currentChunkIndex, currentVideo.chunksTotal)
    const end = isEndOfRecording ? currentVideo.length : undefined
    const variables = {
      backgroundUploaded: taskId.includes('TaskManager') ? false : true,
      file: reference,
      parent: currentVideo.id,
      start: getChunkStartTime(currentChunkIndex),
      end: end || getChunkEndTime(currentChunkIndex),
    }

    await makeS3()
      .putObject({
        Body: currentBody,
        Bucket: configWasabiUpload.bucket,
        Key: reference,
      })
      .promise()
    console.info('CREATE_VIDEO_CHUNK_MUTATION:', taskId, variables.file)
    await client
      .mutate({
        mutation: CREATE_VIDEO_CHUNK_MUTATION,
        variables,
      })
      .then(() => {
        const currentProgress = progress + 1 / chunksCount
        setProgress(currentProgress)
        // * Android update current progress in notification
        if (!disableNotification && Layout.isAndroid) {
          updateNotification(
            CHANNEL_ID_LRT,
            NOTIFICATION_ID_LRT,
            `${translation.t('notification.uploadTitle')}`,
            currentProgress,
          )
        }
        if (!isEndOfRecording) {
          // * End of chunk, not end of recording
          isCompressedDone
            ? setCurrentFullChunk(uri, currentVideo.currentFullChunk + 1)
            : setCurrentCompressedChunk(uri, compressedChunk + 1)
        } else if (isEndOfRecording && !isCompressedDone) {
          // * The compressed video version is uploaded, now the full-size chunks are going to be uploaded
          setIsCompressedDone(uri, true)
        } else {
          // * The compressed video and full-size video are uploaded and removed from the upload queue
          markAndRemove(uri)
        }
      })
      .catch(console.warn)

    return isEmpty() ? UploadStatus.FINISHED : UploadStatus.UPLOADING
  } catch (error) {
    useSentryLogger({
      error,
      message: `[UploadS3:Error]`,
      extras: { taskId },
    })

    if (error.code === 'storage/file-not-found') {
      removeVideo(uri)
    }

    return UploadStatus.ERROR
  }
}

// * Max 30 seconds, so we limit to 25 seconds
const MAX_UPLOAD_WINDOW_IOS = 25 * 1000
// * Android has no limit, so we set limit to 30 minutes
const MAX_UPLOAD_WINDOW_ANDROID = 30 * 60 * 1000

export interface VideoUploader {
  taskId: string
  maxWindow?: number
  disableNotification?: boolean
}
export const videoUploader = async ({
  taskId,
  maxWindow,
  disableNotification = false,
}: VideoUploader): Promise<UploadStatus> => {
  // * Set up Notification for iOS
  if (!disableNotification && Layout.isIos) {
    await pushNotification()
  }

  // * Set up Notification for Android
  if (!disableNotification && Layout.isAndroid) {
    await initializeNotification(
      CHANNEL_ID_LRT,
      CHANNEL_NAME_LRT,
      NOTIFICATION_ID_LRT,
      `${translation.t('notification.uploadTitle')}`,
    ).catch(error =>
      useSentryLogger({
        error,
        message: '[BackgroundTask:Notifee:InitializeNotification]',
        extras: { taskId },
      }),
    )
  }

  // * Start (optimizing/uploading) video chunk by chunk from local store.queue
  let status = UploadStatus.UPLOADING
  setUploadStatus(UploadStatus.UPLOADING)
  const clock = new Date()
  const now = new Date()
  const maxUploadWindow = new Date()
  const defaultWindowUpload = Layout.isIos ? MAX_UPLOAD_WINDOW_IOS : MAX_UPLOAD_WINDOW_ANDROID
  maxUploadWindow.setTime(now.getTime() + (maxWindow ?? defaultWindowUpload))
  const chunksCount = getChunksCount(useZudStore.getState().queue)

  // * Android Notification Handlers
  if (!disableNotification && Layout.isAndroid) {
    notifee.onForegroundEvent(async ({ type, detail }) =>
      handleEvent(type, detail, async () => {
        cancelUploadNotification(CHANNEL_ID_LRT, () => (status = UploadStatus.CANCELED))
      }),
    )
    notifee.onBackgroundEvent(async ({ type, detail }) =>
      handleEvent(type, detail, async () => {
        cancelUploadNotification(CHANNEL_ID_LRT, () => (status = UploadStatus.CANCELED))
      }),
    )
  }

  while (status === UploadStatus.UPLOADING) {
    const hasConnection = await hasConnectionForUpload()
    const isTaskRunning = useZudStore.getState().isRunning

    if (!isTaskRunning) {
      status = UploadStatus.CANCEL_RUNNING
    } else if (!hasConnection) {
      status = UploadStatus.NO_CONNECTION
    } else if (clock >= maxUploadWindow) {
      status = UploadStatus.EXCEEDED
    } else {
      status = await uploadToS3Bucket(disableNotification ?? false, chunksCount, taskId)
      clock.setTime(new Date().getTime())
    }
  }

  // * For Android delete notification channel on the end
  if (!disableNotification && Layout.isAndroid) {
    await notifee.deleteChannel(CHANNEL_ID_LRT).catch(error =>
      useSentryLogger({
        error,
        message: '[BackgroundTask:Notifee:DeleteChannel]',
        extras: { taskId },
      }),
    )
  }

  // * Return upload status after uploading finished or something else happened
  setUploadStatus(status)
  return status
}
