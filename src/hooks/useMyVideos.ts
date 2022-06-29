import { useQuery } from '@apollo/client'
import { PAGE_LIMIT } from '@/constants/fetching'
import { MY_VIDEOS_QUERY } from '@/gql/queries/myVideos'
import { MyVideosQuery, MyVideosQueryVariables } from '@/types'

export const useMyVideos = (event?: string, last?: number, before?: string, after?: string) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    MyVideosQuery,
    MyVideosQueryVariables
  >(MY_VIDEOS_QUERY, {
    variables: {
      offset: 0,
      before,
      after,
      first: PAGE_LIMIT,
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

  return { data, isLoading: loading, error, fetchMore: onFetchMore, refetch }
}
