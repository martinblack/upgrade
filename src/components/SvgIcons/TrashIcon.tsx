import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from 'styled-components'

export const TrashIcon = () => {
  const theme = useTheme()

  return (
    <Svg width="19" height="20" viewBox="0 0 19 20" fill="none">
      <Path
        d="M17.8698 1L14.9425 17.7228C14.8776 18.0893 14.6857 18.4115 14.4142 18.6409C14.187 18.8329 13.9037 18.9596 13.5926 18.9919L13.4349 19H5.43488C5.062 19 4.72062 18.8649 4.45551 18.6409C4.22284 18.4443 4.04858 18.1795 3.96278 17.8776L3.92739 17.7238L1 1H17.8698ZM10.4349 3.61289L6.54777 7.5L10.0469 11H5.93488V16H10.9349V11H10.8209L14.322 7.5L10.4349 3.61289Z"
        stroke={theme.colors.white}
      />
    </Svg>
  )
}
