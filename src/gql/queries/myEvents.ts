import { gql } from '@apollo/client'
import { EventObjectType } from '@/gql/fragments/eventObjectType'
import { PageInfo } from '@/gql/fragments/pageInfo'

export const MY_EVENTS_QUERY = gql`
  query myEvents(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $name: String
    $slug: String
    $private: Boolean
  ) {
    featuredEvents(
      offset: $offset
      before: $before
      after: $after
      first: $first
      last: $last
      name: $name
      slug: $slug
      private: $private
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          ...EventObjectType
        }
      }
    }
  }
  ${PageInfo}
  ${EventObjectType}
`
