import { View } from 'react-native'
import styled from 'styled-components'

export const StyledDivider = styled(View)`
  width: 100%;
  border-bottom-color: ${({ theme }) => theme.colors.bg4};
  border-bottom-width: 1px;
  display: flex;
  align-self: center;
`
