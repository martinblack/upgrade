import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export const NavigationTouchable = styled(TouchableOpacity)`
  padding: 6px;
  flex-direction: row;
  align-items: center;
`

export const GradientWrapper = styled(LinearGradient)`
  z-index: 10;
  padding-bottom: 15px;
`
