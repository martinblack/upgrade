import { Box } from '@/components/_essentials/Box'
import React, { ReactNode } from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface Props {
  title: string
  onPress: () => void
  icon?: ReactNode
}

const AuthButton: React.FC<Props> = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        justify="center"
        alignItems={'center'}
        backgroundColor={'white'}
        roundness={6}
        fullWidth
        height={50}>
        <Box flexDirection={'row'}>
          <Box marginRight={8} justify={'center'}>
            {icon}
          </Box>
          <Text style={{ fontSize: 18, fontWeight: '600' }} allowFontScaling={false}>
            {title}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

export default AuthButton
