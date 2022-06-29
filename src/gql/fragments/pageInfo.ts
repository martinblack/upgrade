import { gql } from '@apollo/client'

export const PageInfo = gql`
  fragment PageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`
