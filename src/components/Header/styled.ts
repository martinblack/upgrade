import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'

export const AddButton = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.status.blue};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`
