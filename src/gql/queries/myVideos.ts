import { gql } from '@apollo/client'
import { PageInfo } from '@/gql/fragments/pageInfo'
import { UserVideoObjectType } from '@/gql/fragments/userVideoObjectType'

export const MY_VIDEOS_QUERY = gql`
  query myVideos(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $event: UUID
  ) {
    myVideos(
      offset: $offset
      before: $before
      after: $after
      first: $first
      last: $last
      event: $event
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          ...UserVideoObjectType
        }
      }
    }
  }
  ${PageInfo}
  ${UserVideoObjectType}
`
