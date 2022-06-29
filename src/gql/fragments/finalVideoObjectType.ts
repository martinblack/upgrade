import { gql } from '@apollo/client'
import { EventObjectType } from './eventObjectType'
import { UserType } from './userType'

export const FinalVideoObjectType = gql`
  fragment FinalVideoObjectType on FinalVideoObjectType {
    created
    id
    owner {
      ...UserType
    }
    thumb
    file
    length
    event {
      ...EventObjectType
    }
  }
  ${UserType}
  ${EventObjectType}
`
