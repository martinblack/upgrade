import { useQuery } from '@apollo/client'
import { PAGE_LIMIT } from '@/constants/fetching'
import { ALL_VIDEOS_QUERY } from '@/gql/queries/allVideos'
import { AllVideosQuery, AllVideosQueryVariables } from '@/types'

export const useAllVideos = (
  first?: number,
  event?: string,
  before?: string,
  after?: string,
  last?: number,
) => {
  const { data, loading, error, fetchMore, refetch, called } = useQuery<
    AllVideosQuery,
    AllVideosQueryVariables
  >(ALL_VIDEOS_QUERY, {
    variables: {
      offset: 0,
      before,
      after,
      first: first || PAGE_LIMIT,
      last,
      event,
    },
  })

  const onFetchMore = (offset: number) =>
    fetchMore({
      variables: {
        offset: offset + PAGE_LIMIT,
        first: PAGE_LIMIT,
      },
    })

  return {
    data,
    isLoading: loading,
    error,
    called,
    fetchMore: onFetchMore,
    refetch,
  }
}
