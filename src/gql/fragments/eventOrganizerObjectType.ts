import { gql } from '@apollo/client'
import { UserType } from './userType'

export const EventOrganizerObjectType = gql`
  fragment EventOrganizerObjectType on EventOrganizerObjectType {
    id
    name
    avatar
    users {
      ...UserType
    }
  }
  ${UserType}
`
