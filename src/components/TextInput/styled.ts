import { TextInput, Text } from 'react-native'
import styled from 'styled-components'

export const StyledInput = styled(TextInput)`
  height: 60px;
  padding: 18px 20px 20px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.bg3};
  font-size: 14px;
  line-height: 16.9px;
  font-family: inter400;
  color: ${({ theme }) => theme.colors.bg0};
`

export const ErrorMessage = styled(Text)`
  font-size: 15px;
  line-height: 18px;
  font-family: inter300;
  color: ${({ theme }) => theme.colors.white};
`
