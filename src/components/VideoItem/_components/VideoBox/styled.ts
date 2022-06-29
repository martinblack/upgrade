import styled from 'styled-components'
import { Text } from 'react-native'

export const UploadedDate = styled(Text)`
  color: ${({ theme }) => theme.colors.bg4};
  font-size: 14px;
  line-height: 17px;
  font-family: inter300;
`

export const Label = styled(Text)<{ isDisabled?: boolean }>`
  font-family: inter600;
  font-size: 14px;
  line-height: 16.94px;
  color: ${({ theme, isDisabled }) => (isDisabled ? theme.colors.bg4 : theme.colors.secondary)};
`
