import styled from 'styled-components'
import { Text } from 'react-native'

export const Label = styled(Text)<{ labelColor: string }>`
  font-family: inter600;
  font-size: 15px;
  line-height: 18.15px;
  color: ${({ labelColor }) => labelColor};
  text-align: center;
`
