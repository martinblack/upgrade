import { client } from '@/gql/apollo'
import { CREATE_VIDEO_PREVIEW_MUTATION } from '@/gql/mutations/createVideoPreview'
import { createReference } from '@/tasks/utils'
import { CRF } from '@/utils/compressVideo'
import { getAssetExtension } from '@/utils/getAssetExtension'
import { UploadItem } from '@/store'

export const mutateCreatePreview = async (currentVideo: UploadItem, isCompressedDone?: boolean) => {
  const videoId = currentVideo.id
  await client.mutate({
    mutation: CREATE_VIDEO_PREVIEW_MUTATION,
    variables: {
      file: createReference(
        currentVideo.slug,
        videoId,
        currentVideo.uri,
        isCompressedDone || currentVideo.isCompressedDone,
        currentVideo.currentCompressedChunk,
      ),
      parent: videoId,
      videoAttrs: {
        length: currentVideo.length,
        frameRate: CRF,
        format: getAssetExtension(currentVideo.uri),
      },
    },
  })
}
