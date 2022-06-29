import { BlurView } from 'expo-blur'
import { Text } from 'react-native'
import styled from 'styled-components'

export const StyledBluredView = styled(BlurView)`
  position: absolute;
  z-index: 31;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

export const Message = styled(Text)`
  font-family: inter400;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.bg3};
`
