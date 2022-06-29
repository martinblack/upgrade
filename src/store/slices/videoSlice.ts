import { VIDEO_CHUNK_SIZE } from '@/constants/video'
import { getFileUri, getLocalUri, moveFileToDocumentDirectory, removeFile } from '@/utils/file'
import { getHhMmSs } from '@/utils/getHhMmSs'
import { CreateVideoSlice, VideoRecording, LocalVideoRecordings } from '../types'

export const createVideoSlice: CreateVideoSlice = (set, get) => ({
  recordings: [],
  recordingInterrupted: false,
  setRecordingInterrupted: recordingInterrupted => set({ recordingInterrupted }),
  addRecord: async (recording: VideoRecording) => {
    const newRecording = {
      localUri: await moveFileToDocumentDirectory(recording.uri, 'Videos'),
      recordedAt: recording.recordedAt,
      isUploaded: recording.isUploaded,
      thumbnail: {
        height: recording.thumbnail.height,
        width: recording.thumbnail.width,
        localUri: await moveFileToDocumentDirectory(recording.thumbnail.uri, 'VideoThumbnails'),
      },
      durationInMillis: recording.durationInMillis,
      name: recording.name,
      eventId: recording.eventId,
      slug: recording.slug,
      id: recording.id,
    }

    get().addVideo(
      newRecording.localUri,
      newRecording.id,
      getHhMmSs(newRecording.durationInMillis / 1000),
      newRecording.name,
      newRecording.slug,
      Math.ceil(newRecording.durationInMillis / 1000 / VIDEO_CHUNK_SIZE),
    )

    set(state => {
      const recordings = [...state.recordings, newRecording]
      return {
        recordings,
      }
    })
  },
  markVideoAsUploaded: (videoUri: string) => {
    set(state => {
      const recording = state.recordings.find(video => getFileUri(video.localUri) === videoUri)

      if (!recording) {
        return { recordings: state.recordings }
      }

      const rest = state.recordings.filter(recording => getFileUri(recording.localUri) !== videoUri)

      const recordings = [...rest, { ...recording, isUploaded: true }] as LocalVideoRecordings

      return {
        recordings,
      }
    })
  },
  removeRecord: (record: VideoRecording) => {
    set(state => {
      removeFile(record.uri)
      removeFile(record.thumbnail.uri)
      get().removeVideo(getLocalUri(record.uri))

      const recordings = state.recordings.filter(
        ({ localUri }) => record.uri !== getFileUri(localUri),
      )

      return {
        recordings,
      }
    })
  },
  getRecordings: () => {
    return get().recordings.map(record => {
      return {
        ...record,
        uri: getFileUri(record.localUri),
        thumbnail: {
          ...record.thumbnail,
          uri: getFileUri(record.thumbnail.localUri),
        },
      }
    })
  },
  clearRecordings: () =>
    set(state => {
      state.recordings.map(record => {
        removeFile(getFileUri(record.localUri))
        removeFile(getFileUri(record.thumbnail.localUri))
        get().removeVideo(record.localUri)
      })

      return {
        recordings: [],
      }
    }),
})
