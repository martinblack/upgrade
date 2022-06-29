import React from 'react'
import { TextProps } from 'react-native'
import { Title } from './styled'

interface Props extends TextProps {
  color?: string
  size?: number
  lineHeight?: number
  textAlign?: string
}

export const ContentTitle: React.FC<Props> = ({ children, color, size, lineHeight, textAlign }) => (
  <Title color={color} size={size} lineHeight={lineHeight} textAlign={textAlign}>
    {children}
  </Title>
)
