import React from 'react'
import Event from './_components/Event'
import { GridContainer } from './styled'
import { useTranslation } from 'react-i18next'
import { formatDate, LOCALIZE } from '@/utils/getDateLanguage'
import { parseISO } from 'date-fns'
import { EventObjectType, EventObjectTypeEdge } from '@/types'

interface Props {
  events: EventObjectTypeEdge[]
  onEventClick?: (venue: EventObjectType) => void
  eventWidth?: number
}

const EventList: React.FC<Props> = ({ events, onEventClick, eventWidth }: Props) => {
  const { t } = useTranslation()
  return (
    <>
      {events && (
        <GridContainer
          flexDirection={'row'}
          justify={events.length > 1 ? 'space-between' : 'space-around'}
          paddingHorizontal={15}>
          {React.Children.toArray(
            events.map(event => {
              const venue = event.node as EventObjectType
              return (
                <Event
                  location={venue.city}
                  subject={venue.organizer.name}
                  year={
                    venue.startTime &&
                    formatDate(parseISO(venue.startTime), t('dateFormats.shortMonthYear'), LOCALIZE)
                  }
                  imgUrl={venue.image as string}
                  onClick={() => onEventClick?.(venue)}
                  isPrivate={venue.private}
                  eventWidth={eventWidth}
                />
              )
            }),
          )}
        </GridContainer>
      )}
    </>
  )
}

export default EventList
