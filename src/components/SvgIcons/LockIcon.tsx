import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from 'styled-components'

export const LockIcon = () => {
  const theme = useTheme()

  return (
    <Svg width="16" height="21" viewBox="0 0 16 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 7.5H15.5V20.5H0.5V7.5Z"
        stroke={theme.colors.bg4}
      />
      <Path
        d="M9.5 13C9.5 12.1716 8.82843 11.5 8 11.5C7.17157 11.5 6.5 12.1716 6.5 13V15C6.5 15.8284 7.17157 16.5 8 16.5C8.82843 16.5 9.5 15.8284 9.5 15V13Z"
        stroke={theme.colors.bg4}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0.5C9.51878 0.5 10.8938 1.11561 11.8891 2.11091C12.8844 3.10622 13.5 4.48122 13.5 6V7.5H2.5V6C2.5 4.48122 3.11561 3.10622 4.11091 2.11091C5.10622 1.11561 6.48122 0.5 8 0.5Z"
        stroke={theme.colors.bg4}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.5C8.9665 2.5 9.8415 2.89175 10.4749 3.52513C11.1082 4.1585 11.5 5.0335 11.5 6V7.5H4.5V6C4.5 5.0335 4.89175 4.1585 5.52513 3.52513C6.1585 2.89175 7.0335 2.5 8 2.5Z"
        stroke={theme.colors.bg4}
      />
    </Svg>
  )
}
