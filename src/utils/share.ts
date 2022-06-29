import { Share } from 'react-native'
import * as Sharing from 'expo-sharing'

export const shareUri = async (message: string) => {
  try {
    await Share.share({
      message: message,
    })
  } catch (error) {
    ;(error: { message: string }) => console.log(error?.message)
  }
}

export const shareVideo = async (uri: string, shareMessage?: string) => {
  await Sharing.shareAsync(uri, {
    mimeType: 'video/mp4',
    dialogTitle: shareMessage,
    UTI: 'data/mpeg',
  })
}
