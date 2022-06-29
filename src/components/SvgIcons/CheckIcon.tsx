import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from 'styled-components'

export const CheckIcon = () => {
  const theme = useTheme()

  return (
    <Svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <Path
        d="M15.5 1.41L5.5 11.41L0 5.91L1.41 4.5L5.5 8.58L14.09 0L15.5 1.41Z"
        fill={theme.colors.bg1}
      />
    </Svg>
  )
}
