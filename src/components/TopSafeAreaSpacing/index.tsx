import React from 'react'
import { Box } from '@/components/_essentials/Box'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

interface Props {
  color?: string
}
const TopSafeAreaSpacing: React.FC<Props> = ({ color }: Props) => (
  <SafeAreaInsetsContext.Consumer>
    {insets => <Box backgroundColor={color} paddingTop={insets?.top ?? 0} />}
  </SafeAreaInsetsContext.Consumer>
)

export default TopSafeAreaSpacing
