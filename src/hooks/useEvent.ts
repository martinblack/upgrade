import { useQuery } from '@apollo/client'
import { EVENT_QUERY } from '@/gql/queries/event'
import { EventQuery, EventQueryVariables } from '@/types'

export const useEvent = (id: string) => {
  const { data, loading, error } = useQuery<EventQuery, EventQueryVariables>(EVENT_QUERY, {
    variables: { id },
  })

  return { data, isLoading: loading, error }
}
