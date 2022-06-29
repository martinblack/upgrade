import { DefaultTheme } from 'styled-components'

export enum StatusBarStyle {
  darkContent = 'dark-content',
  lightContent = 'light-content',
}

export const DEFAULT_THEME: DefaultTheme = {
  statusBarStyle: StatusBarStyle.lightContent,
  colors: {
    primary: '#FF3868',
    secondary: '#3491FF',

    black: '#000000',
    white: 'white',

    transparent: 'rgba(0,0,0,0)',
    disabled: '#666666',

    bg0: '#000000',
    bg1: '#222222',
    bg2: '#E5E5E5',
    bg3: '#FFFFFF',
    bg4: '#666666',
    bg5: '#CCCCCC',
    bg6: '#333333',
    bg7: '#EFEFEF',
    bg8: '#444444',

    eventsHeader: 'rgba(251, 188, 5, 0.2)',

    status: {
      green: '#34A853',
      blue: '#3491FF',
      yellow: '#FBBC05',
    },

    text: {
      default: 'white',
      primaryTitle: '#CCCCCC',
    },

    cameraBtn: {
      c1: '#ff3fcf',
      c2: '#ff3c9b',
      c3: '#ff3974',
    },
  },
  images: {
    profileBG: require('../../assets/images/profile-bg.png'),
  },
}
