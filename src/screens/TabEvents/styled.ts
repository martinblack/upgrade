import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
import styled from 'styled-components'

export const Wrapper = styled(View)`
  height: 100%;
  background-color: #333333;
`

export const AbsoluteGradient = styled(LinearGradient)`
  position: absolute;
  top: 0px;
  width: 100%;
`
