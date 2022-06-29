import { useMutation } from '@apollo/client'
import { CREATE_VIDEO_CHUNK_MUTATION } from '@/gql/mutations/createVideoChunk'
import { CreateVideoChunkMutation, CreateVideoChunkMutationVariables } from '@/types'

export const useCreateVideoChunk = (end: string, file: string, parent: string, start: string) => {
  const [createVideoChunk, { loading, error }] = useMutation<
    CreateVideoChunkMutation,
    CreateVideoChunkMutationVariables
  >(CREATE_VIDEO_CHUNK_MUTATION, {
    variables: {
      end,
      file,
      parent,
      start,
    },
  })

  return { createVideoChunk, isLoading: loading, error }
}
