import React, { useEffect, useState } from 'react'
import { Box } from '@/components/_essentials/Box'
import { SectionTitle } from '@/components/_essentials/Text/SectionTitle'
import VideoItem from '@/components/VideoItem'
import { useTranslation } from 'react-i18next'
import { useMyVideos } from '@/hooks/useMyVideos'
import { filterUndefinedMyVideos } from '@/utils/filterUndefinedVideos'
import { UserVideoObjectType, UserVideoObjectTypeConnection } from '@/types'
import NotLoadedContent from '@/components/NotLoadedContent'
import LoadMoreButton from '@/components/Buttons/LoadMoreButton'
import { PAGE_LIMIT } from '@/constants/fetching'
import { useZudStore } from '@/store'

interface Props {
  eventId: string
}

const MyClips: React.FC<Props> = ({ eventId }: Props) => {
  const { t } = useTranslation()
  const removeRecord = useZudStore.getState().removeRecord

  // TODO: Also should be fixed. Use state from store not a getter?
  const records = useZudStore(state =>
    state.getRecordings().filter(item => item.eventId === eventId && item.id),
  )

  const [videos, setVideos] = useState<UserVideoObjectType[]>()

  const [offset, setOffset] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const { data, isLoading, error, fetchMore } = useMyVideos(eventId)

  useEffect(() => {
    if (isLoading) return
    if (data) {
      setVideos(filterUndefinedMyVideos(data?.myVideos as UserVideoObjectTypeConnection))
      data.myVideos && setHasMore(data.myVideos.pageInfo.hasNextPage)
    }
  }, [isLoading, data])

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setOffset(prev => prev + PAGE_LIMIT)
    fetchMore(offset)
      .then(({ data }) => {
        if (data.myVideos) {
          const records = filterUndefinedMyVideos(data.myVideos as UserVideoObjectTypeConnection)
          setHasMore(data.myVideos.pageInfo.hasNextPage)
          setVideos(prev => prev?.concat(records))
        }
      })
      .finally(() => setIsLoadingMore(false))
  }

  return (
    <Box>
      {!videos && (isLoading || error) && <NotLoadedContent isLoading={isLoading} error={error} />}
      {videos && videos?.length !== 0 && (
        <Box justify={'center'} alignItems={'center'} paddingBottom={20}>
          <SectionTitle>{t('screens.events.myClips')}</SectionTitle>
        </Box>
      )}
      {videos &&
        React.Children.toArray(
          videos.map(record => {
            const localVideo = records.find(video => video.id === record.id)
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
        )}

      {hasMore && videos && <LoadMoreButton onPress={handleLoadMore} isLoading={isLoadingMore} />}
    </Box>
  )
}

export default MyClips
