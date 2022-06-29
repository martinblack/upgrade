import React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
  color?: string
}
export const VideoIcon: React.FC<Props> = ({ color = 'white' }: Props) => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path d="M1 11L10 6L1 1V11Z" stroke={color} />
  </Svg>
)
