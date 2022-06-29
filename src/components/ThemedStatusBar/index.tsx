import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

export const ThemedStatusBar = () => {
  const theme = useTheme()

  return (
    <StatusBar
      translucent
      barStyle={theme.statusBarStyle}
      backgroundColor={theme.colors.transparent}
    />
  )
}
