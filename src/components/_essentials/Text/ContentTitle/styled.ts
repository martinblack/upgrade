import { Text } from 'react-native'
import styled from 'styled-components'

export const Title = styled(Text)<{
  color?: string
  size?: number
  lineHeight?: number
  textAlign?: string
}>`
  font-family: inter700;
  font-size: ${({ size }) => (size ? size : 14)}px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 17)}px;
  color: ${({ color, theme }) => (color ? color : theme.colors.bg3)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'auto')};
`
