import * as React from 'react'
import { FlatList, ListRenderItemInfo, RefreshControl, SafeAreaView } from 'react-native'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Header from '@/components/Header'
import EventItem from '@/components/EventItem'
import { Box } from '@/components/_essentials/Box'
import { useMyEvents } from '@/hooks/useMyEvents'
import { TabEventsHeaders } from '@/constants/headers'
import { EventObjectType, EventObjectTypeEdge } from '@/types'
import Loading from '@/components/Loading'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import ErrorMessage from '@/components/ErrorMessage'
import Layout from '@/constants/Layout'

const TabEvents: React.FC = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { top } = useSafeAreaInsets()

  const { data, loading: isLoading, error, refetch } = useMyEvents()
  const events = data?.featuredEvents?.edges as Array<EventObjectTypeEdge>

  const [refreshing, setRefreshing] = React.useState(false)

  const keyExtractor = React.useCallback(
    (item: EventObjectTypeEdge, index: number) => item.node?.id ?? `${index}`,
    [],
  )

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    refetch({ offset: 0 }).finally(() => setRefreshing(false))
  }, [])

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<EventObjectTypeEdge>) => (
      <Box paddingHorizontal={20} marginBottom={events && index === events.length - 1 ? 30 : 0}>
        <EventItem event={item.node as EventObjectType} />
      </Box>
    ),
    [],
  )

  const listEmptyComponent = (
    <Box marginTop={50} alignItems="center">
      {!error && !isLoading && <ContentTitle>{t('noEvents')}</ContentTitle>}
      {error && !isLoading && <ErrorMessage error={error} />}
    </Box>
  )

  return (
    <React.Fragment>
      <SafeAreaView
        style={{ flex: 1, marginTop: Layout.isIos ? -top : 0, backgroundColor: colors.bg6 }}>
        <Header
          options={Object.values(TabEventsHeaders)}
          colors={[colors.eventsHeader, colors.transparent]}
        />
        {!isLoading && (
          <FlatList<EventObjectTypeEdge>
            keyExtractor={keyExtractor}
            data={events}
            renderItem={renderItem}
            ListEmptyComponent={listEmptyComponent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
        {isLoading && (
          <Box flex={1} justify="center">
            <Loading />
          </Box>
        )}
      </SafeAreaView>
    </React.Fragment>
  )
}

export default TabEvents
