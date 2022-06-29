import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native'
import { getOutputUri } from '@/tasks/utils'

const COMPRESSING = true

export const CRF = 28

export const compressVideo = async (uri: string) => {
  const outputUri = getOutputUri(uri, COMPRESSING)

  return FFmpegKit.execute(
    `-y -i ${uri} -c:v libx264 -crf ${CRF} -vf scale=426:240 -preset ultrafast ${outputUri} -loglevel panic`,
  ).then(async session => {
    const returnCode = await session.getReturnCode()

    if (ReturnCode.isSuccess(returnCode)) return outputUri
    if (ReturnCode.isCancel(returnCode)) console.log('CANCEL FFmpegKit Compressing')

    // ERROR
    console.log(`ERROR COMPRESSING: `, FFmpegKitConfig.sessionStateToString(session.getState))
  })
}
