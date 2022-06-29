import { gql } from '@apollo/client'
import { UserType } from './userType'

export const VideoObjectType = gql`
  fragment VideoObjectType on VideoObjectType {
    created
    id
    owner {
      ...UserType
    }
    thumb
    file
    format
    length
    eventvideo {
      thumb
    }
  }
  ${UserType}
`
