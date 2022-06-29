import { ShareIcon } from '@/components/SvgIcons/ShareIcon'
import { Box } from '@/components/_essentials/Box'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const ActionButtons: React.FC = () => {
  return (
    <Box flexDirection="row">
      <TouchableOpacity onPress={() => alert('Not implemented')}>
        <Box paddingRight={15.5}>
          <ShareIcon />
        </Box>
      </TouchableOpacity>
      {/*!isDownloaded && (
        <TouchableOpacity onPress={() => alert("Not implemented")}>
          <Box paddingRight={15.5}>
            <DownloadIcon />
          </Box>
        </TouchableOpacity>
      )*/}
    </Box>
  )
}

export default ActionButtons
