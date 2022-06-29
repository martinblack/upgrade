import { gql } from '@apollo/client'
import { UserType } from './userType'
import { UserVideoObjectType } from './userVideoObjectType'

export const VideoPreviewObjectType = gql`
  fragment VideoPreviewObjectType on VideoPreviewObjectType {
    created
    id
    owner {
      ...UserType
    }
    thumb
    file
    format
    length
    parent {
      ...UserVideoObjectType
    }
  }
  ${UserType}
  ${UserVideoObjectType}
`
