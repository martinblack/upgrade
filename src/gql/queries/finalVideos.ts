import { gql } from '@apollo/client'
import { FinalVideoObjectType } from '@/gql/fragments/finalVideoObjectType'
import { PageInfo } from '@/gql/fragments/pageInfo'

export const FINAL_VIDEOS_QUERY = gql`
  query finalVideos(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $event: UUID
  ) {
    finalVideos(
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
          ...FinalVideoObjectType
        }
      }
    }
  }
  ${PageInfo}
  ${FinalVideoObjectType}
`
