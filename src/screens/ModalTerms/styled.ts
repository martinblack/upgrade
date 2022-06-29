import styled from 'styled-components'
import { ScrollView, Text } from 'react-native'

export const Title = styled(Text)`
  font-family: inter700;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.colors.text.default};
  margin-bottom: 20px;
`

export const BodyText = styled(Text)<{ isLink?: boolean }>`
  font-family: inter400;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.colors.text.primaryTitle};
  margin-bottom: 30px;
  text-decoration-line: ${({ isLink }) => (isLink ? 'underline' : 'none')};
`

export const ScrollViewWrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
`
