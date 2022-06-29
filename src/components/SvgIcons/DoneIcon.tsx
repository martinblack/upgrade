import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from 'styled-components'

export const DoneIcon = () => {
  const theme = useTheme()

  return (
    <Svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      <Path d="M1 5.94971L5.94975 10.8995L15.8995 0.94968" stroke={theme.colors.status.green} />
    </Svg>
  )
}
