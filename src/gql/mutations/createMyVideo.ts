import { gql } from '@apollo/client'

export const CREATE_MY_VIDEO_MUTATION = gql`
  mutation createMyVideo(
    $creationTime: DateTime!
    $event: String!
    $platform: String
    $videoAttrs: VideoAttributesInput!
  ) {
    createMyVideo(
      creationTime: $creationTime
      event: $event
      platform: $platform
      videoAttrs: $videoAttrs
    ) {
      userVideo {
        id
      }
    }
  }
`
