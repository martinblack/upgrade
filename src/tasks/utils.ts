import { VIDEO_CHUNK_SIZE } from '../constants/video'
import { getFileUri } from '../utils/file'
import { FFmpegKit, ReturnCode, FFmpegKitConfig } from 'ffmpeg-kit-react-native'
import { getHhMmSs } from '@/utils/getHhMmSs'
import { configWasabiUpload } from '@/config'
import S3 from 'aws-sdk/clients/s3'
import { UploadFiles, useZudStore } from '../store'
import { getAssetExtension } from '@/utils/getAssetExtension'

export const IS_FROM_FILE_SYSTEM = true

export const lpad = (padding: number, value?: number) => {
  var zeroes = new Array(padding + 1).join('0')
  return (zeroes + value).slice(-padding)
}

export const createReference = (
  slug: string,
  videoId: string,
  uri: string,
  isFullVideo?: boolean,
  currentChunk?: number,
) => {
  const isCurrentChunkZero = currentChunk === 0

  return `event/${slug}/uvideo/${videoId}${isFullVideo ? '' : '/preview'}${
    currentChunk || isCurrentChunkZero
      ? `/chunks/${
          isCurrentChunkZero ? `${lpad(4, 0)}` : `${lpad(4, currentChunk)}`
        }.${getAssetExtension(uri)}`
      : ''
  }`
}

export const makeS3 = () =>
  new S3({
    endpoint: configWasabiUpload.endpoint,
    region: configWasabiUpload.region,
    accessKeyId: configWasabiUpload.accessKeyId,
    secretAccessKey: configWasabiUpload.secretAccessKey,
  })

export const createBlob = async (uri: string) => {
  const a = await fetch(uri)
  const blob = await a.blob()
  return blob
}

export const markAndRemove = (recordingUri: string, isFromFileSystem?: boolean) => {
  useZudStore
    .getState()
    .markVideoAsUploaded(isFromFileSystem ? recordingUri : getFileUri(recordingUri))
  useZudStore.getState().removeVideo(recordingUri, isFromFileSystem)
}

export const getOutputUri = (uri: string, compressed?: boolean) => {
  return `${uri.substring(0, uri.lastIndexOf('.'))}-${
    compressed ? 'compressed' : 'output'
  }${uri.substring(uri.lastIndexOf('.'))}`
}

export const getChunkStartTime = (chunk: number) => getHhMmSs(chunk * VIDEO_CHUNK_SIZE)

export const getChunkEndTime = (chunk: number) =>
  getHhMmSs(chunk * VIDEO_CHUNK_SIZE + VIDEO_CHUNK_SIZE)

export const generateChunk = async (uri: string, chunk: number) => {
  const startTime = getChunkStartTime(chunk)
  const endTime = getChunkEndTime(chunk)

  const videoUri = getFileUri(uri)
  const outputUri = getOutputUri(videoUri)

  return FFmpegKit.execute(
    `-ss ${startTime} -to ${endTime} -i ${videoUri} -c copy -y ${outputUri} -loglevel panic`,
  ).then(async session => {
    const returnCode = await session.getReturnCode()

    if (ReturnCode.isSuccess(returnCode)) return outputUri
    if (ReturnCode.isCancel(returnCode)) console.log('CANCEL FFmpegKit')
    // ERROR
    console.log(
      `ERROR CHUNKING FFmpegKitConfig: `,
      FFmpegKitConfig.sessionStateToString(session.getState),
    )
  })
}

export const isEndOfVideo = (currentChunk: number, chunksTotal: number) =>
  currentChunk >= chunksTotal - 1

export const getChunksCount = (uploadQueue: UploadFiles) => {
  let chunksCount = 0
  // After implementation of preview, the totalChunks should be doubled -> 2 * totalChunks
  for (const item of uploadQueue) {
    chunksCount += item.chunksTotal - item.currentFullChunk
  }
  return chunksCount
}
