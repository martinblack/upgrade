import { getFileUri } from '@/utils/file'
import { CreateQueueSlice, UploadItem } from '../types'

const getVideo = (uri: string, videos: UploadItem[]) => {
  return videos.find(item => item.uri === uri)
}
const updateItem = (newItem: UploadItem, items: UploadItem[]) => {
  return items.map(item => (item.uri === newItem.uri ? newItem : item))
}

/**The useQueue stores queue of recordings to upload. Setting current chunk (setCurrentCompressedChunk and setCurrentFullChunk) is used to continuously upload chunks - one after another. When the whole video is uploaded it can be removed from the queue via removeVideo.*/

export const createQueueSlice: CreateQueueSlice = (set, get) => ({
  queue: [],
  status: undefined,
  addVideo: (uri, id, length, eventName, slug, chunksTotal) => {
    set(state => {
      const newQueue = state.queue
      if (!getVideo(uri, state.queue)) {
        newQueue.push({
          uri,
          id,
          length,
          eventName,
          slug,
          currentCompressedChunk: 0,
          currentFullChunk: 0,
          chunksTotal,
          // After implementation of preview, the variable isCompressedDone should be by default false
          isCompressedDone: true,
        })
      }
      return {
        queue: newQueue,
      }
    })
  },
  removeVideo: (uri, isFromFileSystem) => {
    set(state => {
      const newQueue = state.queue.filter(
        item => (isFromFileSystem ? getFileUri(item.uri) : item.uri) !== uri,
      )
      return {
        queue: newQueue,
      }
    })
  },
  updateVideo: (item: UploadItem) => {
    set(() => ({ queue: updateItem(item, get().queue) }))
  },
  setCurrentFullChunk: (uri, chunk) => {
    let item = getVideo(uri, get().queue)
    if (item && chunk < item.chunksTotal) {
      get().updateVideo({
        ...item,
        currentFullChunk: chunk,
      })
    } else {
      get().removeVideo(uri)
    }
  },
  setCurrentCompressedChunk: (uri, chunk) => {
    let item = getVideo(uri, get().queue)
    if (item && chunk < item.chunksTotal) {
      get().updateVideo({
        ...item,
        currentCompressedChunk: chunk,
      })
    } else {
      get().removeVideo(uri)
    }
  },
  setIsCompressedDone: (uri, value) => {
    let item = getVideo(uri, get().queue)
    if (item)
      get().updateVideo({
        ...item,
        isCompressedDone: value,
      })
  },
  getVideoToUpload: () => {
    return get().queue.filter(video => video.id)[0]
  },
  isEmpty: () => {
    return !get().queue.length
  },
  setUploadStatus: status => set({ status }),
})
