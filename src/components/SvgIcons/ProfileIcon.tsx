import React from 'react'
import Svg, { Path, G, Mask } from 'react-native-svg'

export const ProfileIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <Mask id="mask0_663_41" maskUnits={'userSpaceOnUse' as any} x="0" y="0" width="22" height="22">
      <Path
        d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_663_41)">
      <Path
        d="M11 21.5C16.799 21.5 21.5 16.799 21.5 11C21.5 5.20101 16.799 0.5 11 0.5C5.20101 0.5 0.5 5.20101 0.5 11C0.5 16.799 5.20101 21.5 11 21.5Z"
        stroke="white"
      />
      <Path
        d="M11 10.5C12.933 10.5 14.5 8.933 14.5 7C14.5 5.067 12.933 3.5 11 3.5C9.067 3.5 7.5 5.067 7.5 7C7.5 8.933 9.067 10.5 11 10.5Z"
        stroke="white"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 12.5C13.6904 12.5 14.3154 12.7798 14.7678 13.2322C15.2202 13.6846 15.5 14.3096 15.5 15V26.5H6.5V15C6.5 14.3096 6.77982 13.6846 7.23223 13.2322C7.68464 12.7798 8.30964 12.5 9 12.5H13Z"
        stroke="white"
      />
    </G>
  </Svg>
)
