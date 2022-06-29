import { Text, View } from 'react-native'
import styled from 'styled-components'
import { hexToRGBA } from '@/utils/hexToRGBA'

export const VideoPlayer = styled(View)`
  background-color: yellow;
  aspect-ratio: 1.6;
  height: 100%;
`

export const Wrapper = styled(View)`
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${({ theme }) => {
    const alphaBlack = hexToRGBA(theme.colors.black)
    return alphaBlack(0.4)
  }};
  flex-direction: row;
`

export const InfoContainer = styled(View)`
  height: 100%;
  width: 100%;
  padding-bottom: 9px;
  padding-top: 16px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: flex-end;
  flex: 1;
  justify-content: space-between;
`

export const CreatorsCountText = styled(Text)`
  font-family: inter400;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${props => props.theme.colors.white};
  margin-bottom: 10px;
`

export const DateText = styled(Text)`
  font-family: inter300;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${props => props.theme.colors.disabled};
`
