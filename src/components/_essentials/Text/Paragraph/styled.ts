import { Text } from 'react-native'
import styled from 'styled-components'

export const StyledParagraph = styled(Text)<{
  color?: string
  size?: number
  lineHeight?: number
  textAlign?: string
}>`
  font-size: ${({ size }) => (size ? size : 14)}px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 20)}px;
  color: ${({ color, theme }) => (color ? color : theme.colors.bg3)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'auto')};
  font-family: inter400;
`
