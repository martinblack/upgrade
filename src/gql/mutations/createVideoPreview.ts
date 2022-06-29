import { gql } from '@apollo/client'
import { UserType } from '@/gql/fragments/userType'

export const CREATE_VIDEO_PREVIEW_MUTATION = gql`
  mutation createVideoPreview($file: String, $parent: UUID!, $videoAttrs: VideoAttributesInput!) {
    createVideoPreview(file: $file, parent: $parent, videoAttrs: $videoAttrs) {
      videoPreview {
        id
        parent {
          id
        }
      }
    }
  }
  ${UserType}
`
