import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from 'styled-components'

export const CancelIcon = () => {
  const theme = useTheme()

  return (
    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5563 0L16.2634 0.707031L8.83899 8.13184L16.2634 15.5562L15.5563 16.2637L8.13202 8.83887L0.707092 16.2637L0 15.5562L7.42499 8.13184L0 0.707031L0.707092 0L8.13202 7.4248L15.5563 0Z"
        fill={theme.colors.white}
      />
    </Svg>
  )
}
