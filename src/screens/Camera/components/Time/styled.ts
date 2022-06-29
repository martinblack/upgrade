import { View, Text } from 'react-native'
import styled from 'styled-components'

export const Wrapper = styled(View)<{ isLandscape: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-top: ${({ isLandscape }) => (isLandscape ? 10 : 10)}px;
`

export const RedMark = styled(View)`
  width: 10px;
  height: 10px;
  margin-right: 7px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
`

export const TimeContainer = styled(Text)`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  padding: 4px;
  color: #ffffff;
`
