import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from 'styled-components'

export const ChevronIcon = () => {
  const theme = useTheme()

  return (
    <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
      <Path d="M7.86401 13.8137L1.50005 7.44976L7.86401 1.0858" stroke={theme.colors.bg3} />
    </Svg>
  )
}
