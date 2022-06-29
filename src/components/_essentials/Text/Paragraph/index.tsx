import React from 'react'
import { StyledParagraph } from './styled'

interface Props {
  color?: string
  size?: number
  lineHeight?: number
  textAlign?: string
  allowFontScaling?: boolean
}

export const Paragraph: React.FC<Props> = ({
  children,
  color,
  size,
  lineHeight,
  textAlign,
  allowFontScaling = true,
}) => (
  <StyledParagraph
    color={color}
    size={size}
    lineHeight={lineHeight}
    allowFontScaling={allowFontScaling}
    textAlign={textAlign}
  >
    {children}
  </StyledParagraph>
)
