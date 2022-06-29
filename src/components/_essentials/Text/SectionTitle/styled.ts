import { Text } from 'react-native'
import styled from 'styled-components'

export const Title = styled(Text)<{
  color?: string
  size?: number
  lineHeight?: number
}>`
  font-size: ${({ size }) => (size ? size : 10)}px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 12.1)}px;
  text-transform: uppercase;
  color: ${({ color, theme }) => (color ? color : theme.colors.bg5)};
  font-family: inter400;
  letter-spacing: 0.15px;
`
