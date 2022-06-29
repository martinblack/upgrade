import { EventObjectTypeEdge, FeaturedEventsQuery, MyEventsQuery } from '@/types'

export const filterUndefinedEvents = (data: MyEventsQuery | FeaturedEventsQuery | undefined) => {
  const events =
    data?.featuredEvents && data?.featuredEvents?.edges
      ? (data.featuredEvents.edges.filter(e => e) as Array<EventObjectTypeEdge>)
      : []
  return events
}
