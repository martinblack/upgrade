import { useNavigation } from '@react-navigation/core'
import { CloseIcon } from '@/components/SvgIcons/CloseIcon'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useCameraSize } from '@/screens/Camera/hooks/useCameraSize'
import { LastVideoPreview } from '../LastVideoPreview'
import RecordButton from '../RecordButton'
import { Item, Wrapper } from './styled'
import { ROUTES } from '@/navigation/routes'

interface Props {
  isRecording: boolean
  isCloseBtnHidden: boolean
  onStart: () => void
  onStop: () => void
}

const ControlButtons = ({ isRecording, isCloseBtnHidden, onStart, onStop }: Props) => {
  const { isLandscape } = useCameraSize()
  const { navigate } = useNavigation()
  return (
    <Wrapper useBackground={!isRecording} isLandscape={isLandscape}>
      <Item isLandscape={isLandscape} positionValue={isLandscape ? 'flex-end' : 'flex-start'}>
        {!isRecording && <LastVideoPreview />}
      </Item>
      <Item isLandscape={isLandscape} positionValue="center">
        <RecordButton onPlay={onStart} onStop={onStop} isRecording={isRecording} />
      </Item>
      <Item isLandscape={isLandscape} positionValue={isLandscape ? 'flex-start' : 'flex-end'}>
        {!isRecording && (
          <TouchableOpacity
            onPress={() => navigate(ROUTES.ROOT)}
            style={{
              padding: 10,
            }}>
            {!isCloseBtnHidden && <CloseIcon />}
          </TouchableOpacity>
        )}
      </Item>
    </Wrapper>
  )
}

export default ControlButtons
