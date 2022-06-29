import { useQuery } from '@apollo/client'
import { MY_EVENTS_QUERY } from '@/gql/queries/myEvents'
import { MyEventsQuery, MyEventsQueryVariables } from '@/types'

export const useMyEvents = (
  offset?: number,
  before?: string,
  after?: string,
  first?: number,
  last?: number,
  name?: string,
  slug?: string,
  isPrivate?: boolean,
) => {
  return useQuery<MyEventsQuery, MyEventsQueryVariables>(MY_EVENTS_QUERY, {
    variables: {
      offset,
      before,
      after,
      first,
      last,
      name,
      slug,
      private: isPrivate,
    },
  })
}
