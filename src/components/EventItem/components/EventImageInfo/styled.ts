import styled from 'styled-components'
import { Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export const SubjectText = styled(Text)`
  font-family: inter900;
  margin-top: -9px;
  letter-spacing: -0.02px;
  font-size: 24px;
  color: ${props => props.theme.colors.bg3};
`

export const Wrapper = styled(LinearGradient)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0;
  padding: 20px;
  padding-bottom: 10px;
  flex-direction: column;
  justify-content: space-between;
`
