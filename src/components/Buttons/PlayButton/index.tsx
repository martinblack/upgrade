import { PlayIcon } from '@/components/SvgIcons/PlayIcon'
import { Box } from '@/components/_essentials/Box'
import React from 'react'
import { OvalBtnWrapper } from './styled'

interface Props {
  onPress: () => void
}

const PlayButton: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <OvalBtnWrapper onPress={onPress}>
      <Box paddingLeft={6}>
        <PlayIcon />
      </Box>
    </OvalBtnWrapper>
  )
}

export default PlayButton
