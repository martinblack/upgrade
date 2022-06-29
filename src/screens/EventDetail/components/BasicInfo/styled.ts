import styled from 'styled-components'
import { View } from 'react-native'

export const Wrapper = styled(View)`
  padding: 20px;
  flex-direction: row;
  border-color: ${props => props.theme.colors.disabled};
  /* border-top-width: 1px; */
  border-bottom-width: 1px;
  justify-content: space-between;
  align-items: center;
`
