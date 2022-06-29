import styled, { css } from 'styled-components'
import { View, Text } from 'react-native'

export const Container = styled(View)<{
  asBlackBox?: boolean
  isLandscape: boolean
}>`
  display: flex;
  flex-direction: ${({ isLandscape }) => (isLandscape ? 'row' : 'row-reverse')};
  justify-content: ${({ isLandscape }) => (isLandscape ? 'flex-start' : 'space-between')};
  padding: 10px;
  align-items: center;
  z-index: 32;
  ${({ asBlackBox }) =>
    asBlackBox &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
    `}
`

export const Place = styled(Text)`
  font-family: inter300;
  font-size: 15px;
  line-height: 18.2px;
  color: white;
  max-width: 100px;
`

export const Title = styled(View)<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: row;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`
