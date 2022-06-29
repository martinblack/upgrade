import React, { memo, useCallback } from 'react'
import { ImageContainer } from './styled'
import { Box } from '@/components/_essentials/Box'
import EventImageInfo from './components/EventImageInfo'
import { TouchableWithoutFeedback } from 'react-native'
import EventInfo from './components/EventInfo'
import { useTheme } from 'styled-components'
import { EventObjectType } from '@/types'
import { useZudStore } from '@/store'
import { ROUTES } from '@/navigation/routes'
import { useNavigation } from '@react-navigation/core'
import EventImage from '@/components/EventImage'

interface Props {
  event: EventObjectType
}

const EventItem: React.FC<Props> = ({ event }: Props) => {
  const { navigate } = useNavigation()
  const theme = useTheme()
  const recordsLength = useZudStore(
    state => state.recordings.filter(item => item.eventId === event.id).length,
  )

  const onCardPress = useCallback(() => {
    navigate(ROUTES.ROOT, {
      screen: ROUTES.SHARED_STACK,
      params: {
        screen: ROUTES.EVENT_DETAIL,
        params: { eventId: event.id, image: event.image },
      },
    })
  }, [event.id, event.image])

  return (
    <TouchableWithoutFeedback onPress={() => onCardPress()}>
      <Box backgroundColor={theme.colors.black} roundness={24} overflow="hidden" marginBottom={20}>
        <ImageContainer>
          <EventImage imageUrl={event.image} sizeDividedBy={1.1} />

          <EventImageInfo
            subject={event.organizer.name}
            date={event.startTime}
            isPrivate={event.private}
          />
        </ImageContainer>
        <EventInfo
          title={event.name}
          location={event.city}
          clipsCount={recordsLength}
          isUploaded={true}
        />
      </Box>
    </TouchableWithoutFeedback>
  )
}

export default memo(EventItem, (prevProps, nextProps) => {
  return (
    prevProps.event.id === nextProps.event.id &&
    prevProps.event.image === nextProps.event.image &&
    prevProps.event.organizer.name === nextProps.event.organizer.name &&
    prevProps.event.startTime === nextProps.event.startTime &&
    prevProps.event.private === nextProps.event.private &&
    prevProps.event.name === nextProps.event.name &&
    prevProps.event.city === nextProps.event.city
  )
})
