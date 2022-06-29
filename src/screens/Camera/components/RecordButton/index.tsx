import React from 'react'
import { Inner, Rect, Wrapper } from './styled'

interface Props {
  onPlay: () => void
  onStop: () => void
  isRecording: boolean
}

const RecordButton = ({ onPlay, onStop, isRecording }: Props) => {
  return (
    <Wrapper onPress={isRecording ? onStop : onPlay}>{isRecording ? <Rect /> : <Inner />}</Wrapper>
  )
}

export default RecordButton
