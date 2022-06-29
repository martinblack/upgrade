import React from 'react'
import { Box } from '@/components/_essentials/Box'
import VideoItem from '@/components/VideoItem'
import { ImageBackground, RefreshControl, ScrollView } from 'react-native'
import homeBackground from '../../assets/images/homeBackground.png'
import { useTranslation } from 'react-i18next'
import Logo from '@/components/Logo'
import { SectionTitle } from '@/components/_essentials/Text/SectionTitle'
import EventList from '@/components/EventList'
import TopSafeAreaSpacing from '@/components/TopSafeAreaSpacing'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/core'
import { useFeaturedEvents } from '@/hooks/useFeaturedEvents'
import { filterUndefinedEvents } from '@/utils/filterUndefinedEvents'
import NotLoadedContent from '@/components/NotLoadedContent'
import { useAllVideos } from '@/hooks/useAllVideos'
import { filterUndefinedAllVideos } from '@/utils/filterUndefinedVideos'
import { EventObjectTypeEdge, EventVideoObjectType, EventVideoObjectTypeConnection } from '@/types'
import { useZudStore, VideoRecording } from '@/store'
import SplashManager from '../../components/SplashManager'
import { ROUTES } from '@/navigation/routes'
import Layout from '@/constants/Layout'

const FEATURED_EVENTS_COUNT = 4
const VIDEOS_COUNT = 6

const TabHome: React.FC = () => {
  // TODO:
  const records = useZudStore(state => state.getRecordings().filter(r => r.id))
  const removeRecord = useZudStore.getState().removeRecord

  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { colors } = useTheme()

  const [latestClips, setLatestClips] = React.useState<EventVideoObjectType[]>()
  const [featuredEvents, setFeaturedEvents] = React.useState<EventObjectTypeEdge[]>()

  const {
    data,
    loading: isLoading,
    error,
    called: calledEvents,
    refetch,
  } = useFeaturedEvents(FEATURED_EVENTS_COUNT)
  const {
    data: videosData,
    isLoading: videosIsLoading,
    error: videosError,
    called: calledVideos,
  } = useAllVideos(VIDEOS_COUNT)

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    refetch({ offset: 0 }).finally(() => setRefreshing(false))
  }, [])

  const shouldShowSplash = calledEvents && calledVideos && !videosIsLoading && !isLoading

  React.useEffect(() => {
    if (isLoading) return
    if (data) setFeaturedEvents(filterUndefinedEvents(data))
  }, [isLoading, data])

  React.useEffect(() => {
    if (videosIsLoading) return
    if (videosData && videosData.allVideos) {
      setLatestClips(
        filterUndefinedAllVideos(videosData.allVideos as EventVideoObjectTypeConnection),
      )
    }
  }, [videosIsLoading, videosData])

  return (
    <Box
      position={'absolute'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      fullHeight
      fullWidth
      backgroundColor={colors.black}>
      <SplashManager shouldShowSplash={shouldShowSplash} />
      <ImageBackground
        source={homeBackground}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: 'center', paddingTop: 5 }}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <TopSafeAreaSpacing />
          <Logo />
          <Box marginTop={30}>
            <Box justify="center" alignItems="center" paddingBottom={20}>
              <SectionTitle>{t('screens.home.featuredEvents')}</SectionTitle>
            </Box>
            <EventList
              events={featuredEvents || []}
              onEventClick={item =>
                navigate(ROUTES.ROOT, {
                  screen: ROUTES.SHARED_STACK,
                  params: {
                    screen: ROUTES.EVENT_DETAIL,
                    params: {
                      eventId: item.id,
                      image: item.image,
                      noAnimation: true,
                      previousRoute: 'home',
                    },
                  },
                })
              }
            />
            {!featuredEvents && (isLoading || error) && (
              <Box height={Layout.window.width - 15} justify="center">
                <NotLoadedContent isLoading={isLoading} error={error} />
              </Box>
            )}
          </Box>

          <Box marginTop={10} marginBottom={30}>
            {(videosIsLoading || videosError) && !latestClips && (
              <Box marginTop={60}>
                <NotLoadedContent
                  isLoading={videosIsLoading}
                  error={videosError?.message !== error?.message ? videosError : undefined}
                />
              </Box>
            )}
            {latestClips && (
              <Box justify={'center'} alignItems={'center'} paddingBottom={15}>
                <SectionTitle>{t('screens.home.latestClips')}</SectionTitle>
              </Box>
            )}
            {latestClips &&
              React.Children.toArray(
                latestClips.map(record => {
                  const isFinalCut = !!record.finalvideo
                  const localVideo = records.find(r => r.id === record.id) as VideoRecording
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
              )}
          </Box>
        </ScrollView>
      </ImageBackground>
    </Box>
  )
}

export default TabHome
