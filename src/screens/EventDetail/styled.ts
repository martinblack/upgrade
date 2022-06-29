import styled from 'styled-components'
import { Text, ScrollView } from 'react-native'

export const MembersText = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.colors.disabled};
  margin-left: 10px;
`

export const UnfollowText = styled(Text)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.colors.status.blue};
`

export const CustomScrollView = styled(ScrollView)`
  background-color: ${props => props.theme.colors.bg6};
`
