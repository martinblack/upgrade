import { useQuery } from '@apollo/client'
import { FEATURED_EVENTS_QUERY } from '@/gql/queries/featuredEvents'
import { FeaturedEventsQuery, FeaturedEventsQueryVariables } from '@/types'

export const useFeaturedEvents = (
  first?: number,
  before?: string,
  after?: string,
  last?: number,
  name?: string,
  slug?: string,
  isPrivate?: boolean,
) => {
  return useQuery<FeaturedEventsQuery, FeaturedEventsQueryVariables>(FEATURED_EVENTS_QUERY, {
    variables: {
      offset: 0,
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
