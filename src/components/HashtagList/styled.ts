import styled from 'styled-components'
import { Text, View } from 'react-native'

export const HashtagText = styled(Text)`
  font-family: inter300;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${props => props.theme.colors.white};
`

export const HashtagContainer = styled(View)`
  background-color: ${props => props.theme.colors.black};
  border-radius: 3px;
  padding: 5px;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
`

export const Wrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`
