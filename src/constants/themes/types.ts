import 'styled-components'
import { StatusBarStyle } from './defaultTheme'

declare module 'styled-components' {
  export interface DefaultTheme {
    statusBarStyle: StatusBarStyle
    colors: {
      primary: string
      secondary: string
      black: string
      white: string
      transparent: string
      disabled: string
      bg0: string
      bg1: string
      bg2: string
      bg3: string
      bg4: string
      bg5: string
      bg6: string
      bg7: string
      bg8: string
      eventsHeader: string
      status: { green: string; blue: string; yellow: string }
      text: {
        default: string
        primaryTitle: string
      }
      cameraBtn: { c1: string; c2: string; c3: string }
    }
    images: {
      profileBG: any
    }
  }
}
