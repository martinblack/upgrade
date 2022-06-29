import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

export const CloseIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="20" fill="black" fill-opacity="0.3" />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.5563 12L28.2634 12.707L20.839 20.1318L28.2634 27.5562L27.5563 28.2637L20.132 20.8389L12.7071 28.2637L12 27.5562L19.425 20.1318L12 12.707L12.7071 12L20.132 19.4248L27.5563 12Z"
      fill="white"
    />
  </Svg>
)
