import { gql } from '@apollo/client'
import { UserType } from './userType'

export const EventVideoObjectType = gql`
  fragment EventVideoObjectType on EventVideoObjectType {
    created
    id
    owner {
      ...UserType
    }
    thumb
    file
    format
    length
    event {
      id
      name
    }
    uservideo {
      thumb
    }
    finalvideo {
      thumb
    }
  }
  ${UserType}
`
