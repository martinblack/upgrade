import { Box } from '@/components/_essentials/Box'
import { Text, Image, View } from 'react-native'
import styled from 'styled-components'

export const VideoThumbnail = styled(Image)`
  width: 100%;
  height: 100%;
`

export const TagText = styled(Text)<{
  font: string
  size: number
  height: number
}>`
  font-size: ${({ size }) => size}px;
  line-height: ${({ height }) => height}px;
  font-family: ${({ font }) => font};
  color: ${({ theme }) => theme.colors.bg3};
  text-transform: uppercase;
`

export const Wrapper = styled(View)`
  aspect-ratio: 1.6;
  height: 100%;
`

export const ActionWrapper = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const VideoTag = styled(Box)<{
  height: number
  backgroundColor: string
}>`
  height: ${({ height }) => height}px;
  border-radius: 3px;
  position: absolute;
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
`
