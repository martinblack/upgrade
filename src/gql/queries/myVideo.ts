import { gql } from '@apollo/client'
import { UserType } from '@/gql/fragments/userType'

export const MY_VIDEO_QUERY = gql`
  query myVideo($id: UUID!) {
    myVideo(id: $id) {
      created
      id
      owner {
        ...UserType
      }
      thumb
      length
      event {
        id
        name
      }
    }
  }
  ${UserType}
`
