import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const CameraIcon = () => (
  <Svg width="40" height="38" viewBox="0 0 40 38" fill="none">
    <Path d="M22 6V8H2V36H38V12H40V38H0V6H22Z" fill="white" />
    <Path
      d="M20 31C24.9706 31 29 26.9706 29 22C29 17.0294 24.9706 13 20 13C15.0294 13 11 17.0294 11 22C11 26.9706 15.0294 31 20 31Z"
      stroke="white"
      strokeWidth="2"
    />
    <Path fillRule="evenodd" clipRule="evenodd" d="M32 0H34V14H32V0Z" fill="white" />
    <Path fillRule="evenodd" clipRule="evenodd" d="M26 6H40V8H26V6Z" fill="white" />
  </Svg>
)
