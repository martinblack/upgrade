import { useQuery } from '@apollo/client'
import { FINAL_VIDEOS_QUERY } from '@/gql/queries/finalVideos'
import { FinalVideosQuery, FinalVideosQueryVariables } from '@/types'

export const useFinalVideos = (
  event?: string,
  offset?: number,
  before?: string,
  after?: string,
  first?: number,
  last?: number,
) => {
  const { data, loading, error } = useQuery<FinalVideosQuery, FinalVideosQueryVariables>(
    FINAL_VIDEOS_QUERY,
    {
      variables: {
        offset,
        before,
        after,
        first,
        last,
        event,
      },
    },
  )

  return { data, isLoading: loading, error }
}
