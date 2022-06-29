import { configWasabiUpload } from '@/config'
import S3 from 'aws-sdk/clients/s3'
import { AWSError, Request } from 'aws-sdk'
import {
  createBlob,
  createReference,
  generateChunk,
  getChunkEndTime,
  getChunkStartTime,
  isEndOfVideo,
  makeS3,
} from '@/tasks/utils'
import { getFileUri } from '@/utils/file'
import { compressVideo } from '@/utils/compressVideo'
import { useZudStore } from '@/store'
import { client } from '@/gql/apollo'
import { CREATE_VIDEO_CHUNK_MUTATION } from '@/gql/mutations/createVideoChunk'

export interface Options {
  uri: string
  onProgress: (value: number) => Promise<void>
  onFinish: () => Promise<void>
  onCancel: () => void
  taskCallback: (task: Request<S3.PutObjectOutput, AWSError>) => void
}

/** The first phase of the upload is generating chunks, compressing them and uploading immediately.
After compressed chunks were uploaded the variable "isCompressedDone" is set to true and the second phase begins.
It includes generating chunks in the full size and uploading them to Wasabi.
User can see the progress of the whole upload - the progress changes after upload of every chunk and is shown as fraction of 1/doubled chunks (full-size chunks, compressed chunks).*/

export const uploadTask = async (options: Options) => {
  const { uri, onProgress, onFinish, onCancel, taskCallback } = options

  const uploadQueue = useZudStore.getState()
  const currentVideo = uploadQueue.queue.filter(item => getFileUri(item.uri) === uri)[0]
  const totalChunks = currentVideo.chunksTotal
  // After implementation of preview, the totalChunks should be doubled -> 2 * totalChunks
  const chunksCount =
    totalChunks - currentVideo.currentCompressedChunk - currentVideo.currentFullChunk

  let i = 0
  // After implementation of preview, the variable isCompressedDone should be by default false
  let isCompressedDone = true

  const uploadRecording = async (currentDoneProgress: number) => {
    // Notification to BE that the preview is creating and uploading
    //if (!isCompressedDone && i === 0) mutateCreatePreview(currentVideo);

    let doneProgress = currentDoneProgress

    // Upload compressed chunk first if it is ready
    const chunk = await generateChunk(currentVideo.uri, i)
    const currentChunk = isCompressedDone ? chunk : await compressVideo(chunk as string)
    const currentBody = currentChunk && (await createBlob(currentChunk))
    const reference = createReference(
      currentVideo.slug,
      currentVideo.id,
      currentVideo.uri,
      isCompressedDone,
      i,
    )

    const uploadTask = makeS3().putObject(
      {
        Body: currentBody,
        Bucket: configWasabiUpload.bucket,
        Key: reference,
      },
      async (error, data) => {
        if (error) {
          console.log('Manual upload error: ', error)
          onCancel()
          return
        }
        const isEndOfRecording = isEndOfVideo(i, totalChunks)
        const end = isEndOfRecording ? currentVideo.length : undefined
        const variables = {
          backgroundUploaded: false,
          file: reference,
          parent: currentVideo.id,
          start: getChunkStartTime(i),
          end: end || getChunkEndTime(i),
        }

        await client
          .mutate({
            mutation: CREATE_VIDEO_CHUNK_MUTATION,
            variables,
          })
          .then(() => {
            if (!isEndOfRecording) {
              // End of chunk, not end of recording
              i += 1
            } else if (isEndOfRecording && !isCompressedDone) {
              // the compressed video version is uploaded, now the full-size chunks are going to be uploaded
              i = 0
              isCompressedDone = true
            }
            doneProgress += 1 / chunksCount
            onProgress(doneProgress).catch(error => console.log(error))
          })
          .catch(console.warn)

        if (isEndOfRecording && isCompressedDone) {
          // the compressed video and full-size video are uploaded
          await onFinish().catch(error => console.log(error))
          return
        }
        uploadRecording(doneProgress)
      },
    )
    taskCallback(uploadTask)
  }
  uploadRecording(0).catch(error => console.log(error))
}
