import { gql } from '@apollo/client'

export const CREATE_VIDEO_CHUNK_MUTATION = gql`
  mutation createVideoChunk(
    $backgroundUploaded: Boolean
    $end: Time!
    $file: String!
    $parent: UUID!
    $start: Time!
  ) {
    createVideoChunk(
      backgroundUploaded: $backgroundUploaded
      end: $end
      file: $file
      parent: $parent
      start: $start
    ) {
      videoChunk {
        file
      }
    }
  }
`
