import styled from 'styled-components'
import { Text, TouchableOpacity, View } from 'react-native'

export const ButtonLabel = styled(Text)`
  font-family: inter400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.secondary};
`

export const Button = styled(TouchableOpacity)`
  position: absolute;
  bottom: 0px;
  height: 60px;
  width: 100%;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.bg6};
  align-items: center;
  justify-content: center;
  z-index: 20;
`

export const Container = styled(View)`
  background-color: ${({ theme }) => theme.colors.bg8};
  border-radius: 6px;
  width: 95%;
  height: 148px;
  position: absolute;
  bottom: 95px;
  align-self: center;
  align-items: center;
  z-index: 10;
`

export const Bubble = styled(TouchableOpacity)`
  width: 45px;
  height: 45px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.bg8};
  position: absolute;
  bottom: 80px;
  right: -3px;
  justify-content: center;
  z-index: 20;
`
