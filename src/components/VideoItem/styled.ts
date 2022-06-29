import { Text, Image, View } from 'react-native'
import styled from 'styled-components'

export const VideoThumbnail = styled(Image)`
  width: 100%;
  height: 100%;
`

export const VideoLength = styled(Text)`
  font-size: 15px;
  line-height: 18px;
  font-family: inter300;
  color: ${({ theme }) => theme.colors.bg3};
`

export const SideTag = styled(View)<{ isMine?: boolean }>`
  position: absolute;
  left: 0px;
  top: 35px;
  width: 3px;
  height: 50px;
  background-color: ${({ isMine, theme }) =>
    isMine ? theme.colors.secondary : theme.colors.status.green};
  border-left-width: 0px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`
