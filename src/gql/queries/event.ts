import { gql } from '@apollo/client'
import { EventObjectType } from '@/gql/fragments/eventObjectType'
import { EventOrganizerObjectType } from '@/gql/fragments/eventOrganizerObjectType'

export const EVENT_QUERY = gql`
  query event($id: UUID!) {
    event(id: $id) {
      created
      id
      name
      slug
      description
      organizer {
        ...EventOrganizerObjectType
      }
      private
      startTime
      endTime
      parent {
        ...EventObjectType
      }
      image
      venue
      stage
      street
      city
      zip
      country
      FinalVideosCount
      finalVideosCount
    }
  }
  ${EventObjectType}
  ${EventOrganizerObjectType}
`
