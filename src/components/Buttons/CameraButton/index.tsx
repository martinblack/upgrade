import { CameraIcon } from '@/components/SvgIcons/CameraIcon'
import { Box } from '@/components/_essentials/Box'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

interface Props {
  onPress: () => void
}

export const CAMERA_BUTTON_WIDTH = 90

const CameraButton: React.FC<Props> = ({ onPress }: Props) => {
  const theme = useTheme()

  return (
    <Box top={-30}>
      <TouchableOpacity onPress={onPress}>
        <Box
          height={CAMERA_BUTTON_WIDTH}
          width={CAMERA_BUTTON_WIDTH}
          roundness={90}
          backgroundColor={theme.colors.primary}
          alignItems={'center'}
          justify={'center'}
          overflow={'hidden'}>
          <LinearGradient
            colors={[
              theme.colors.cameraBtn.c1,
              theme.colors.cameraBtn.c2,
              theme.colors.cameraBtn.c3,
            ]}
            style={{ width: '100%', height: '100%' }}>
            <Box alignItems={'center'} marginTop={22}>
              <CameraIcon />
            </Box>
          </LinearGradient>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}

export default CameraButton
