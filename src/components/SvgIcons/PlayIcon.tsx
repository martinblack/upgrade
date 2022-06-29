import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from 'styled-components'

export const PlayIcon = () => {
  const theme = useTheme()

  return (
    <Svg width="21" height="22" viewBox="0 0 21 22" fill="none">
      <Path d="M1 21L19 11L1 1V21Z" stroke={theme.colors.white} />
    </Svg>
  )
}
