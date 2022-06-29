import { Camera } from 'expo-camera'
import { Dimensions, Platform } from 'react-native'

const width = Dimensions.get('window').width

const getCodec = () => {
  if (Platform.OS !== 'ios') return undefined

  const majorVersionIOS = parseInt(Platform.Version, 10)
  const videoCodec = Camera.Constants.VideoCodec

  if (majorVersionIOS >= 11) {
    return width >= 800 ? videoCodec.HEVC : videoCodec.H264
  }
  return videoCodec.JPEG
}

export const cameraConfig = {
  quality: '1080p',
  codec: getCodec(),
}
