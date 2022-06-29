import React from 'react'
import { Title } from './styled'

interface Props {
  color?: string
  size?: number
  lineHeight?: number
}

export const SectionTitle: React.FC<Props> = ({ children, color, size, lineHeight }) => (
  <Title color={color} size={size} lineHeight={lineHeight}>
    {children}
  </Title>
)
