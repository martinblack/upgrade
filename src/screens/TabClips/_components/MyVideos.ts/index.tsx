import * as React from 'react'
import { Box } from '@/components/_essentials/Box'
import VideoItem from '@/components/VideoItem'
import { useMyVideos } from '@/hooks/useMyVideos'
import { filterUndefinedMyVideos } from '@/utils/filterUndefinedVideos'
import { UserVideoObjectType, UserVideoObjectTypeConnection } from '@/types'
import { useState } from 'react'
import LoadMoreButton from '@/components/Buttons/LoadMoreButton'
import { PAGE_LIMIT } from '@/constants/fetching'
import { useZudStore } from '@/store'
import EmptyComponent from '../EmptyComponent'

const MyVideos = () => {
  // TODO:
  const videos = useZudStore(state => state.getRecordings().filter(r => r.id))
  const removeRecord = useZudStore.getState().removeRecord

  const [myVideos, setMyVideos] = useState<UserVideoObjectType[]>()
  const [myVideosOffset, setMyVideosOffset] = useState(0)

  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const { data, isLoading, error, fetchMore } = useMyVideos()

  React.useEffect(() => {
    if (data) {
      setMyVideos(filterUndefinedMyVideos(data.myVideos as UserVideoObjectTypeConnection))
      data.myVideos && setHasMore(data.myVideos.pageInfo.hasNextPage)
    }
  }, [isLoading, data])

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setMyVideosOffset(prev => prev + PAGE_LIMIT)
    fetchMore(myVideosOffset)
      .then(({ data }) => {
        if (data.myVideos) {
          const records = filterUndefinedMyVideos(data.myVideos as UserVideoObjectTypeConnection)
          setHasMore(data.myVideos.pageInfo.hasNextPage)
          setMyVideos(prev => prev?.concat(records))
        }
      })
      .finally(() => setIsLoadingMore(false))
  }

  return (
    <Box marginBottom={40}>
      {(myVideos && myVideos.length === 0) || !myVideos ? (
        <Box marginTop={30}>
          <EmptyComponent isLoading={isLoading} error={error} videosLength={myVideos?.length} />
        </Box>
      ) : (
        React.Children.toArray(
          myVideos.map(record => {
            const localVideo = videos.find(video => video.id === record.id)
            if (!localVideo) return

            return (
              <VideoItem
                isMine
                isUploaded={localVideo.isUploaded}
                isLoading={false}
                uri={localVideo.uri}
                title={record.event.name}
                updatedDate={record.created}
                thumbnail={localVideo.thumbnail.uri}
                sharedUri={localVideo.uri}
                sharedTitle={record.event.name}
                length={record.length}
                onDelete={() => removeRecord(localVideo)}
              />
            )
          }),
        )
      )}

      {myVideos && hasMore && <LoadMoreButton onPress={handleLoadMore} isLoading={isLoadingMore} />}
    </Box>
  )
}

export default MyVideos
