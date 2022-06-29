import { gql } from '@apollo/client'
import { EventOrganizerObjectType } from './eventOrganizerObjectType'

export const EventObjectType = gql`
  fragment EventObjectType on EventObjectType {
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
    image
    venue
    stage
    street
    city
    zip
    FinalVideosCount
    finalVideosCount
  }
  ${EventOrganizerObjectType}
`
