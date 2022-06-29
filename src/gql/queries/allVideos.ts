import { gql } from '@apollo/client'
import { EventVideoObjectType } from '@/gql/fragments/eventVideoObjectType'
import { PageInfo } from '@/gql/fragments/pageInfo'

export const ALL_VIDEOS_QUERY = gql`
  query allVideos(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $event: UUID
  ) {
    allVideos(
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
          ...EventVideoObjectType
        }
      }
    }
  }
  ${EventVideoObjectType}
  ${PageInfo}
`
