import { gql } from '@apollo/client'
import { UserType } from './userType'

export const UserVideoObjectType = gql`
  fragment UserVideoObjectType on UserVideoObjectType {
    created
    id
    owner {
      ...UserType
    }
    thumb
    file
    length
    format
    event {
      name
    }
    creationTime
    preview {
      thumb
    }
  }
  ${UserType}
`
