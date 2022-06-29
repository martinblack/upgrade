import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { LinearGradient } from 'expo-linear-gradient'

interface EventCardProps {
  width?: number
}
export const EventCard = styled(TouchableOpacity)<EventCardProps>`
  border-radius: 24px;
  width: ${({ width }) => (width ? width + 'px' : '48%')};
  aspect-ratio: 1;
  margin-bottom: 4%;
  overflow: hidden;
`

export const Wrapper = styled(LinearGradient)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0;
  padding: 18px;
  padding-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
`

export const Subject = styled(Text)`
  font-family: inter900;
  margin-top: -9px;
  letter-spacing: -0.02px;
  font-size: 20px;
  color: ${props => props.theme.colors.bg3};
`
