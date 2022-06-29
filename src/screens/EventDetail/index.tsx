import { Box } from '../../components/_essentials/Box'
import React, { Fragment, useEffect } from 'react'
import { CustomScrollView } from './styled'
import ArtistSection from './components/ArtistSection'
import FinalCuts from './components/FinalCuts'
import MyClips from './components/MyClips'
import Header from './components/Header'
import BasicInfo from './components/BasicInfo'
import { useTheme } from 'styled-components'
import { RouteProp, useRoute } from '@react-navigation/core'
import { SharedStackParamList } from '../../navigation/types'
import { ROUTES } from '../../navigation/routes'
import { useIsFocused } from '@react-navigation/native'
import { useEvent } from '../../hooks/useEvent'
import { useZudStore } from '../../store'
import EventImage from '../../components/EventImage'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const EventDetail: React.FC = () => {
  const { colors } = useTheme()
  const isFocused = useIsFocused()
  const { top } = useSafeAreaInsets()

  const { params } = useRoute<RouteProp<{ params: SharedStackParamList[ROUTES.EVENT_DETAIL] }>>()
  const { data } = useEvent(params.eventId)
  const event = data?.event

  const setActiveId = useZudStore.getState().setActiveId

  useEffect(() => {
    setActiveId(isFocused ? params.eventId : null)

    return () => {
      setActiveId(null)
    }
  }, [isFocused])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={event?.name} previousParams={params?.previousRoute} />
      <CustomScrollView>
        <Box paddingTop={top}>
          <EventImage imageUrl={params.image} />
        </Box>
        <Box backgroundColor={colors.bg6}>
          <Box marginBottom={30}>
            {event && (
              <Fragment>
                <BasicInfo
                  location={{
                    city: event.city,
                    address: event.venue,
                  }}
                  date={event.startTime}
                  isPrivate={event.private}
                />
                <ArtistSection
                  subject={{
                    name: event.organizer.name,
                    image: event.organizer.avatar || '',
                  }}
                  title={event.name}
                  description={event.description as string}
                  hashtags={[event.slug]}
                />
              </Fragment>
            )}

            {event?.id && event.finalVideosCount !== 0 && <FinalCuts eventId={event.id} />}
            {event?.id && <MyClips eventId={event.id} />}
          </Box>
        </Box>
      </CustomScrollView>
    </SafeAreaView>
  )
}

export default EventDetail
