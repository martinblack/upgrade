import * as React from 'react'
import { Box } from '@/components/_essentials/Box'
import VideoItem from '@/components/VideoItem'
import { useAllVideos } from '@/hooks/useAllVideos'
import { filterUndefinedAllVideos } from '@/utils/filterUndefinedVideos'
import { EventVideoObjectType, EventVideoObjectTypeConnection } from '@/types'
import { useState } from 'react'
import LoadMoreButton from '@/components/Buttons/LoadMoreButton'
import { PAGE_LIMIT } from '@/constants/fetching'
import { useZudStore, VideoRecording } from '@/store'
import EmptyComponent from '../EmptyComponent'

const AllVideos = () => {
  // TODO: This is weird
  const videos = useZudStore(state => state.getRecordings().filter(r => r.id))
  const removeRecord = useZudStore.getState().removeRecord

  const [allVideos, setAllVideos] = useState<EventVideoObjectType[]>()

  const [allVideosOffset, setAllVideosOffset] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const { data, isLoading, error, fetchMore } = useAllVideos()

  React.useEffect(() => {
    if (data) {
      setAllVideos(filterUndefinedAllVideos(data.allVideos as EventVideoObjectTypeConnection))
      data.allVideos && setHasMore(data.allVideos.pageInfo.hasNextPage)
    }
  }, [isLoading, data])

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setAllVideosOffset(prev => prev + PAGE_LIMIT)
    fetchMore(allVideosOffset)
      .then(({ data }) => {
        if (data.allVideos) {
          const records = filterUndefinedAllVideos(data.allVideos as EventVideoObjectTypeConnection)
          setHasMore(data.allVideos.pageInfo.hasNextPage)
          setAllVideos(prev => prev?.concat(records))
        }
      })
      .finally(() => setIsLoadingMore(false))
  }

  return (
    <Box marginBottom={40}>
      {(allVideos && allVideos.length === 0) || !allVideos ? (
        <Box marginTop={30}>
          <EmptyComponent isLoading={isLoading} error={error} videosLength={allVideos?.length} />
        </Box>
      ) : (
        React.Children.toArray(
          allVideos.map(record => {
            const isFinalCut = record.finalvideo ? true : false
            const localVideo = videos.find(r => r.id === record.id) as VideoRecording
            const wasabiUrl = record.file as string

            if (!isFinalCut && !localVideo) return

            return (
              <VideoItem
                isMine={!isFinalCut}
                uri={isFinalCut ? wasabiUrl : localVideo.uri}
                title={record.event.name}
                updatedDate={record?.created}
                thumbnail={isFinalCut ? (record.thumb as string) : localVideo.thumbnail.uri}
                sharedUri={isFinalCut ? wasabiUrl : localVideo.uri}
                sharedTitle={record.event.name}
                length={record.length}
                onDelete={() => removeRecord(localVideo)}
                isUploaded={isFinalCut ? undefined : localVideo.isUploaded}
              />
            )
          }),
        )
      )}

      {allVideos && hasMore && (
        <LoadMoreButton onPress={handleLoadMore} isLoading={isLoadingMore} />
      )}
    </Box>
  )
}

export default AllVideos
