import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const Wrapper = styled(TouchableOpacity)`
  width: 94px;
  height: 94px;
  border: 3px solid #ffffff;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  flex-direction: row;
`

export const Inner = styled(View)`
  border-radius: 60px;
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const Rect = styled(View)`
  width: 34px;
  height: 34px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 3px;
`
