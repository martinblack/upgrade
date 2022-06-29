import { ShareIcon } from '@/components/SvgIcons/ShareIcon'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { shareUri, shareVideo } from '@/utils/share'

interface Props {
  sharedUri: string
  sharedTitle?: string
  isMine?: boolean
}

const ShareButton: React.FC<Props> = ({ sharedUri, sharedTitle, isMine }) => {
  return (
    <TouchableOpacity
      onPress={() => (isMine ? shareVideo(sharedUri, sharedTitle) : shareUri(sharedUri))}>
      <ShareIcon />
    </TouchableOpacity>
  )
}

export default ShareButton
