import { useQuery } from '@apollo/client'
import { ME_QUERY } from '@/gql/queries/me'
import { UserType } from '@/types'

export const useCurrentUser = () => {
  const { data, loading, error } = useQuery<UserType>(ME_QUERY)

  return { data, isLoading: loading, error }
}
