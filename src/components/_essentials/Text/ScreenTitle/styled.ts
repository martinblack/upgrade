import { Text } from 'react-native'
import styled from 'styled-components'

export const Title = styled(Text)<{
  color?: string
  size?: number
  lineHeight?: number
}>`
  font-size: ${({ size }) => (size ? size : 40)}px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 48.4)}px;
  color: ${({ color, theme }) => (color ? color : theme.colors.bg5)};
  font-family: inter300;
  letter-spacing: -0.02px;
`
