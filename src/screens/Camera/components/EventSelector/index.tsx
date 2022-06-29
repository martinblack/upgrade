import EventList from '@/components/EventList'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl, ScrollView, View } from 'react-native'
import { StyledBluredView } from './styled'
import { Box } from '@/components/_essentials/Box'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import TopSafeAreaSpacing from '@/components/TopSafeAreaSpacing'
import { useMyEvents } from '@/hooks/useMyEvents'
import { filterUndefinedEvents } from '@/utils/filterUndefinedEvents'
import { EventObjectType } from '@/types'
import NotLoadedContent from '@/components/NotLoadedContent'
import CancelButton from '@/components/Buttons/CancelButton'

interface Props {
  onEventSelect: (venue: EventObjectType) => void
  onClose: () => void
  isLandscape?: boolean
}

const EventSelector = ({ onEventSelect, onClose, isLandscape }: Props) => {
  const { t } = useTranslation()
  const { data, loading: isLoading, error, refetch } = useMyEvents()
  const events = filterUndefinedEvents(data)

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    refetch({ offset: 0 }).finally(() => setRefreshing(false))
  }, [])

  return (
    <StyledBluredView intensity={110} tint="dark">
      <View
        style={{
          width: '100%',
          maxWidth: isLandscape ? '90%' : undefined,
          height: '95%',
        }}>
        <TopSafeAreaSpacing />
        <Box marginTop={10} marginBottom={10} paddingHorizontal={20}>
          <Box flexDirection="row" justify="space-between" alignItems="center">
            <Paragraph size={15} lineHeight={18.2}>
              {t('screens.camera.selectEvent')}
            </Paragraph>
            <CancelButton onPress={onClose} />
          </Box>
        </Box>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {events.length === 0 && (isLoading || error) && (
            <Box height={100} justify={'center'}>
              <NotLoadedContent isLoading={isLoading} error={error} />
            </Box>
          )}
          <EventList
            events={events}
            onEventClick={onEventSelect}
            eventWidth={isLandscape ? 160 : undefined}
          />
        </ScrollView>
      </View>
    </StyledBluredView>
  )
}

export default EventSelector
