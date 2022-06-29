import Layout from '@/constants/Layout'
import { Orientation, OrientationLock } from 'expo-screen-orientation'
import * as VideoThumbnails from 'expo-video-thumbnails'
import { client } from '@/gql/apollo'
import { CREATE_MY_VIDEO_MUTATION } from '@/gql/mutations/createMyVideo'
import { ALL_VIDEOS_QUERY } from '@/gql/queries/allVideos'
import { MY_VIDEOS_QUERY } from '@/gql/queries/myVideos'
import { EventObjectType, MediaUserVideoPlatformChoices } from '@/types'
import { getAssetExtension } from '@/utils/getAssetExtension'
import { getHhMmSs } from '@/utils/getHhMmSs'
import { useZudStore } from '@/store'

export const getThumbnail = async (video: string) => {
  return VideoThumbnails.getThumbnailAsync(video, {
    time: 0,
  })
}

export const notifyAboutVideoAndAdd = async (
  event: EventObjectType,
  uri: string,
  duration: number,
  thumbnail: { uri: string; width: number; height: number },
) => {
  const now = new Date()
  const addRecording = useZudStore.getState().addRecord
  const setLastRecordingTime = useZudStore.getState().setLastRecordingTime

  const variables = {
    creationTime: now,
    event: event.id,
    platform: Layout.isIos
      ? MediaUserVideoPlatformChoices.Ios
      : MediaUserVideoPlatformChoices.Android,
    videoAttrs: {
      length: getHhMmSs(duration / 1000),
      format: getAssetExtension(uri),
      frameRate: 0,
    },
  }

  await client
    .mutate({
      mutation: CREATE_MY_VIDEO_MUTATION,
      variables,
      refetchQueries: [MY_VIDEOS_QUERY, ALL_VIDEOS_QUERY],
    })
    .then(res => {
      const id = (res.data as any).createMyVideo.userVideo.id
      addRecording({
        recordedAt: now,
        name: event.name,
        slug: event.slug,
        thumbnail,
        uri,
        durationInMillis: duration,
        id,
        eventId: event.id,
      })
    })
  setLastRecordingTime(now.getTime())
}

export const convertOrientationToOrientationLock = (orientation: Orientation): OrientationLock => {
  switch (orientation) {
    case Orientation.PORTRAIT_UP:
      return OrientationLock.PORTRAIT_UP
    case Orientation.PORTRAIT_DOWN:
      return OrientationLock.PORTRAIT_DOWN
    case Orientation.LANDSCAPE_LEFT:
      return OrientationLock.LANDSCAPE_LEFT
    case Orientation.LANDSCAPE_RIGHT:
      return OrientationLock.LANDSCAPE_RIGHT
    default:
      return OrientationLock.DEFAULT
  }
}
